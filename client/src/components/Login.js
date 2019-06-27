import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault();

    const loginUser = {
      email: this.state.email,
      password: this.state.password,
    }

    axios.post('/api/users/login', loginUser)
      // .then(res => this.props.history.push('./login'))
      .catch(err => this.setState({ errors: err.response.data }))
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="register pt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your account here!</p>
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
                <button className="btn btn-info btn-block mt-4" data-style="zoom-in">
                  {/* {loading && <i className="fa fa-refresh fa-spin"></i>} */}
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