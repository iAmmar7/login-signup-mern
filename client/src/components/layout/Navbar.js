import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';

import setAuthToken from '../../utils/setAuthToken';

class Navbar extends Component {

  onLogoutClick(e) {
    e.preventDefault();

    localStorage.clear();
    setAuthToken(false);

    this.props.history.push('/login')
  }

  render() {
    let isAuthenticated = false;

    if (localStorage.getItem('jwtToken')) {
      isAuthenticated = true;
    }

    const authLinks = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink
              to="/dashboard"
              className="nav-link"
              activeClassName="active">
              Dashboard
            </NavLink>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a
              href="/login"
              onClick={this.onLogoutClick.bind(this)}
              className="nav-link">
              Logout
            </a>
          </li>
        </ul>
      </div>
    );

    const guestLinks = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink to="/signup" className="nav-link" activeClassName="active">Sign Up</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/login" className="nav-link" activeClassName="active">Login</NavLink>
          </li>
        </ul>
      </div>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <Link className="navbar-brand" to="/">SignUp/Login</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {isAuthenticated ? authLinks : guestLinks}
      </nav>
    )
  }
}

export default withRouter(Navbar);