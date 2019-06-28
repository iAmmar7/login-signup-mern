import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import Landing from './components/Landing';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

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

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={Landing} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Switch>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
