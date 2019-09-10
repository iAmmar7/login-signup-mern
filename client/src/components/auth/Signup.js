import React, { Component } from 'react';
import classnames from 'classnames';

import { signup } from './authFunctions';


class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
      loading: false
    }
  }

  componentDidMount() {
    if (localStorage.getItem('jwtToken')) {
      this.props.history.push('/dashboard');
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault();

    this.setState({ loading: true })

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    }

    signup(newUser).then(res => {
      if (res) {
        this.setState({ errors: res.data, loading: false })
      } else {
        this.props.history.push("/login")
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
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your account here!</p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label className="text-white">Name</label>
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      'is-invalid': errors.name
                    })}
                    placeholder="Your Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
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
                <div className="form-group">
                  <label className="text-white">Password Confirmation</label>
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      'is-invalid': errors.password2
                    })}
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback">{errors.password2}</div>
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

export default Signup;