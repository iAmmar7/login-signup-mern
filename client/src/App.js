import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from './components/Landing';
import Signup from './components/Signup';
import Login from './components/Login';

import './sass/index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={Landing} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
      </div>
    </BrowserRouter>
  );
}

export default App;
