import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';

import setAuthToken from '../../utils/setAuthToken';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: ''
    }
  }

  componentWillMount() {
    if (!localStorage.getItem('jwtToken')) {
      this.props.history.push('/login');
    }
  }

  componentDidMount() {
    const token = localStorage.jwtToken;
    const decoded = jwt_decode(token);

    this.setState({
      userName: decoded.name
    })
  }

  onLogoutClick(e) {
    e.preventDefault();

    localStorage.clear();
    setAuthToken(false);

    this.props.history.push('/login')
  }

  render() {
    const { userName } = this.state;

    return (
      <div>
        <div className="dashboard pt-5">
          <div className="conatainer">
            <div className="row">
              <div className="row-1">
                <h1 className="display-4">Dashboard</h1>
                <a
                  href="/login"
                  onClick={this.onLogoutClick.bind(this)}
                  className="nav-link logout">
                  Log out
                </a>
              </div>
              <div className="user-greet">
                <p className="lead text-muted">
                  Welcome {userName}!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard;