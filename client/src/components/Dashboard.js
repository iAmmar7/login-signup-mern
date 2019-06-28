import React, { Component } from 'react';
import setAuthToken from '../utils/setAuthToken';

class Dashboard extends Component {
  componentDidMount() {
    if (!localStorage.jwtToken) {
      this.props.history.push('/login')
    }
  }

  logoutUser = () => {
    localStorage.clear();
    setAuthToken(false);

    this.props.history.push('/login');
  }

  render() {
    const localStorageUser = localStorage.getItem('user');
    return (
      <div>
        <div className="dashboard pt-5">
          <div className="conatainer">
            <div className="row">
              <div className="row-1">
                <h1 className="display-4">Dashboard</h1>
                <button className="logout" onClick={this.logoutUser}>
                  Log Out
                </button>
              </div>
              <div className="user-greet">
                <p className="lead text-muted">
                  Welcome {JSON.parse(localStorageUser).name}!
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