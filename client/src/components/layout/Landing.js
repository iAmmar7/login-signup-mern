import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {

  componentDidMount() {
    if (localStorage.getItem('jwtToken')) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="img-div">
        </div>
        <div className="text-div">
          <h2>Shape your future and the future of FILM. Join now.</h2>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore atque odit molestias rem, mollitia ratione!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus aut quos ullam ea quas, aperiam enim eos quaerat sapiente quasi, asperiores delectus sit facere, dolorum eum repudiandae itaque iste quisquam.
          Porro maiores.
          </p>
          <div className="btn-div">
            <Link className="login" to="/login">Login</Link>
            <Link className="signup" to="/signup">Signup</Link>
          </div>
        </div>
      </div >
    )
  }
}

export default Landing;