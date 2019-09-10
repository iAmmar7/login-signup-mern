import React, { Component } from 'react';

import classnames from 'classnames';

import { login } from './authFunctions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: 'ammar@gmail.com',
      password: '123456',
      errors: {},
      loading: false
    }

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    if (localStorage.getItem('jwtToken')) {
      this.props.history.push('/dashboard');
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    this.setState({ loading: true })

    const loginUser = {
      email: this.state.email,
      password: this.state.password,
    }

    login(loginUser).then(res => {
      if (res.success) {
        this.props.history.push('/dashboard')
      }
      if (res.data) {
        this.setState({ errors: res.data, loading: false });
      }
    })
  }

  render() {
    const { errors, loading } = this.state;

    let button;
    if (loading) {
      button = (
        <button className="btn btn-block mt-4 disabled" data-style="zoom-in">
          Loading...
        </button>
      )
    } else {
      button = (
        <button className="btn btn-block mt-4" data-style="zoom-in">
          Login
        </button>
      )
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
                  <label className="text-white">Email Address</label>
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
                  <label className="text-white">Password</label>
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
                {button}
              </form>
            </div>
          </div>
        </div>
      </div >
    )
  }
}

export default Login;