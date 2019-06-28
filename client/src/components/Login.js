import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';              // Define below

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {},
      loggedIn: false
    }
  }

  componentDidMount() {
    if (localStorage.getItem('jwtToken')) {
      this.props.history.push('/dashboard');
    }
  }

  // componentDidUpdate() {
  //   if (localStorage.getItem('jwtToken')) {
  //     this.props.history.push('/dashboard');
  //   }
  // }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault();

    this.setState({ loggedIn: true });

    const loginUser = {
      email: this.state.email,
      password: this.state.password,
    }

    axios.post('/api/users/login', loginUser)
      .then(res => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        localStorage.setItem('user', JSON.stringify(decoded));
        // this.props.history.push('/dashboard');
        this.forceUpdate();
      })
      .catch(err => {
        if (err.response !== null) {
          this.setState({ errors: err.response.data })
        }
      });

    // if (localStorage.jwtToken) {
    //   this.props.history.push('/dashboard');
    // }
  }

  render() {
    const { errors, loggedIn } = this.state;

    console.log("token", localStorage.getItem('jwtToken'));
    console.log(loggedIn);
    if (localStorage.getItem('jwtToken')) {
      this.props.history.push('/dashboard');
    }

    return (
      <div className="register pt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Login</h1>
              <p className="lead text-center">Sign in to your account here!</p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      'is-invalid': errors.email
                    })}
                    placeholder="Your Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      'is-invalid': errors.password
                    })}
                    placeholder="Your Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <button className="btn btn-info btn-block mt-4">
                  <i className={classnames("fa fa-spinner fa-spin icon", {
                    'icon-hide': !loggedIn
                  })}>
                  </i>
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div >
    )
  }
}

export default Login;