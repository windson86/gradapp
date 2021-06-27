import React from 'react';
import { connect } from "react-redux";
import { getData,addKorisnika,deleteKorisnikaID} from "./actions/index";
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        korisnik: {
            ime: '',
            prezime: '',
            email: '',
            
        },
      korisnici:[],
      isLoading: true 
    };

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
}
 
componentDidMount = () => {
    this.props.getUsers();
    this.setState({isLoading:false})
    
  };

deleteKorisnik = (dolaz)=>{
         
     
        this.props.obrisiKorisnika(dolaz);
        window.location.reload();
    };
      
handleChange(event) {
      const { name, value } = event.target;
      const { korisnik } = this.state;
      this.setState({
          korisnik: {
              ...korisnik,
              [name]: value
          }
      });
}
 submit = (event) => {
    event.preventDefault(); 
    this.props.dodajKorisnika(this.state.korisnik);
    window.location.reload();
    };
    
resetUserInputs = () => {
    
      this.setState({
        korisnik: {
            ime:"",
            prezime:"",
            email:""
            
        }
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
    
    console.log(this.state.korisnik)

    
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
               {this.prikaziKorisnike(this.props.dolazniKorisnici)}
             </tbody>
           </table>
         
        </div>

        )}
      </div>
      </div>
    );
  }
}
function mapState(state) {
  const { dolazniKorisnici } = state;
  return { dolazniKorisnici };
}
const actionCreators = {
  getUsers:getData,
  dodajKorisnika:addKorisnika,
  obrisiKorisnika:deleteKorisnikaID
};
const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };


