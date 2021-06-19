import React from 'react'
import axios from 'axios'

class App extends React.Component {

  state={
      naslov:"",
      tekst:"",
      posts:[]

  }
  componentDidMount=()=>{
    this.getBlogData();
  }

  

  getBlogData =()=>{
    axios.get('/api')
    .then((response)=>{
      const data=response.data;
      this.setState({posts:data})
      console.log("podaci primljeni",this.state.posts)
    })
    .catch(()=>{
        alert("error")
    });
  }

  submit = (event) =>{
    event.preventDefault();
    const payload = {
      naslov:this.state.naslov,
      tekst:this.state.tekst
    }

    axios({
      url:'http://localhost:8080/api/save',
      method:'POST',
      data:payload
    })
    .then(()=>{
      console.log("poslano")
    })
    .catch(()=>{
      console.log("greška servera")
    })
    

  }

  handlePromjenu = (event) =>{
      const target= event.target;
      const name = target.name;
      const value = target.value;

      this.setState({
        [name]:value
      });
  };

render() {
  
  return(
    <div>
      <h2>heroku</h2>
      <form onSubmit={this.submit}>
        <div className="form-input">
          <input
          type="text"
          name="naslov"
          placeholder="naslov"
          value={this.state.naslov}
          onChange={this.handlePromjenu}
        />
        <div className="form-input">
          <textarea name="tekst" placeholder="tekst" cols="30" rows="10" value={this.state.tekst} onChange={this.handlePromjenu}></textarea>
        </div>
        <button>potvrdi</button>
        </div>
      </form>
    </div>
  )
}

}
export default App;