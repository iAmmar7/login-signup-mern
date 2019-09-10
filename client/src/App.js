import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';

import './sass/index.css';
// import "./App.css";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    localStorage.clear();
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div>
            <Switch>
              <Route exact path="/" component={Landing} />

              <Route exact path="/signup" component={Signup} />
              <Route exact path="/login" component={Login} />

              <PrivateRoute exact path="/dashboard" component={Dashboard} />

              <Route path="*" component={() => <p className="text-white">404 Not Found</p>} />
            </Switch>
          </div>
        </div>
      </Router >
    );
  }
}

export default App;
