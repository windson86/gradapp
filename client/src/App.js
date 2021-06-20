
import React from 'react';
import axios from 'axios';


import './App.css';

class App extends React.Component {

  state = {
    naslov: '',
    tekst: '',
    posts: []
  };

  componentDidMount = () => {
    this.getBlogPost();
  };


  getBlogPost = () => {
    axios.get('/api')
      .then((response) => {
        const data = response.data;
        this.setState({ posts: data });
        console.log('Data has been received!!');
      })
      .catch(() => {
        alert('Error retrieving data!!!');
      });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };


  submit = (event) => {
    event.preventDefault();

    const payload = {
      naslov: this.state.naslov,
      tekst: this.state.tekst
    };

    

    axios({
      url: '/api/save',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('Data has been sent to the server',payload);

        this.resetUserInputs();
        this.getBlogPost();
      })
      .catch(() => {
        console.log('Internal server error');
      });;
  };

  resetUserInputs = () => {
    this.setState({
      naslov: '',
      tekst: ''
    });
  };

  displayBlogPost = (posts) => {

    if (!posts.length) return null;


    return posts.map((post, index) => (
      <div key={index} className="blog-post__display">
        <h3>{post.naslov}</h3>
        <p>{post.tekst}</p>
      </div>
    ));
  };

  render() {

    console.log('State: ', this.state);

    //JSX
    return(
      <div className="app">
        <h2>Welcome to the best app ever</h2>
        <form onSubmit={this.submit}>
          <div className="form-input">
            <input 
              type="text"
              name="naslov"
              placeholder="Naslov"
              value={this.state.naslov}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <textarea
              placeholder="tekst"
              name="tekst"
              cols="30"
              rows="10"
              value={this.state.tekst}
              onChange={this.handleChange}
            >
              
            </textarea>
          </div>

          <button>Submit</button>
        </form>

        <div className="blog-">
          {this.displayBlogPost(this.state.posts)}
        </div>
      </div>
    );
  }
}


export default App;
