import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {getCookie} from '../components/Utilities/Cookies';

export const signup = data => {
  return axios
    .post(`${process.env.REACT_APP_API_ROUTE}/users/signup`, data)
    .then(response => {
      return {
        success: true,
        message: response.data.message,
        user: response.data.user,
      };
    })
    .catch(function (error) {
      return {
        success: false,
      };
    });
};

export const signin = data => {
  return axios
    .post(`${process.env.REACT_APP_API_ROUTE}/users/signin`, data)
    .then(response => {
      return {
        success: true,
        token: response.data,
        user: jwtDecode(response.data),
      };
    })
    .catch(function (error) {
      return {
        success: false,
      };
    });
};

export const isAuth = () => {
  const cookie = getCookie('token');
  try {
    if (cookie) {
      return jwtDecode(cookie);
    }
  } catch (e) {
    return false;
  }
};

export const isAdmin = () => {
  const cookie = getCookie('token');
  try {
    if (cookie) {
      let decoded = jwtDecode(cookie);
      if (decoded) {
        return decoded.user.isAdmin;
      } else {
        return false;
      }
    }
  } catch (e) {
    return false;
  }
};
