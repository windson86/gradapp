/* eslint-disable react/jsx-no-comment-textnodes */

import React from 'react';
import axios from 'axios';
//import {connect} from 'react-redux'
//import updateKorisnike from './store/actions/updateKorisnike';

import './App.css';

class App extends React.Component {


  state = {
    ime: '',
    prezime: '',
    email: '',
    korisnici:[]
  };

  componentDidMount = () => {
    this.getKorisnike();
  };


  getKorisnike = () => {
    axios.get('/api')
      .then((response) => {
        const data = response.data;
        this.setState({ korisnici: data });
        console.log('Data has been received!!');
      })
      .catch(() => {
        alert('Error retrieving data!!!');
      });
  }
  deleteKorisnik = (dolaz)=>{
        const OBJ = {_id:dolaz}
        console.log("šta sad da radim",dolaz)
        axios({
          url: '/api/deleteOne',
          method: 'POST',
          data: OBJ
        })
        .then(() => {
          console.log('brisanje',dolaz);
  
        })
        .catch(() => {
          console.log('greška servera');
        });
        window.location.reload();
    };
      
  

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };


  submit = (event) => {
    event.preventDefault(); 

    const payload = {
      ime: this.state.ime,
      prezime: this.state.prezime,
      email:this.state.email
    };

    

    axios({
      url: '/api/save',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('Data has been sent to the server',payload);

        this.resetUserInputs();
        this.getKorisnike();
      })
      .catch(() => {
        console.log('greška servera');
      });;
  };

  resetUserInputs = () => {
    this.setState({
      ime: '',
      prezime: '',
      email:''
    });
  };

  prikaziKorisnike = (korisnici) => {

    if (!korisnici.length) return null;


    return korisnici.map((korisnik, index) => (
      <tr  key={korisnik._id}>

             
             <td >{korisnik.prezime}</td>
             <td >{korisnik.ime}</td>
             <td >{korisnik.email}</td>
             <td> <button  onClick={()=>this.deleteKorisnik(korisnik._id)}>x</button></td>
           
      </tr>
    ));
  };

  render() {

    console.log('State: ', this.state);

    //JSX
    return(
      <div className="app">
        <h2>KOMPARE TEST</h2>
        <form onSubmit={this.submit}>
          <div className="form-input">
            <input 
              type="text"
              name="ime"
              placeholder="Ime"
              value={this.state.ime}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <input 
              type="text"
              name="prezime"
              placeholder="Prezime"
              value={this.state.prezime}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <input 
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
         

          <button>Submit</button>
        </form>

        <div>
        {!this.state.isLoading && (
           <div>
           <h1 id='title'>Trenutačni korisnici</h1>
           <table id='korisnici'>
             <tbody>
               {this.prikaziKorisnike(this.state.korisnici)}
             </tbody>
           </table>
         
        </div>

        )}
      </div>
      </div>
    );
  }
}


export default App;
