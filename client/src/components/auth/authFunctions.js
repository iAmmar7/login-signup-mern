import axios from 'axios';

import setAuthToken from '../../utils/setAuthToken';

export const signup = newUser => {
  return axios
    .post('/api/users/signup', {
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      password2: newUser.password2
    })
    .then(res => {
      console.log("User is Registered");
    })
    .catch(err => {
      return err.response
    })
}

export const login = user => {
  return axios
    .post('/api/users/login', {
      email: user.email,
      password: user.password
    })
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);

      return res.data
    })
    .catch(err => {
      console.log("Axios login error: " + err)

      if (err.response) {
        return err.response
      }
    })
}