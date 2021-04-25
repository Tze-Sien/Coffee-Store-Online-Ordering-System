import axios from 'axios';
import {getCookie} from '../components/Utilities/Cookies';

export const viewCategories = () => {
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': getCookie('token'),
    },
  };
  return axios
    .get(`${process.env.REACT_APP_API_ROUTE}/category/`, headers)
    .then(response => {
      return {
        success: true,
        data: response.data,
      };
    })
    .catch(function (error) {
      return {
        success: false,
        err: error.response,
      };
    });
};

export const addCategory = data => {
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': getCookie('token'),
    },
  };

  return axios
    .post(`${process.env.REACT_APP_API_ROUTE}/category/`, data, headers)
    .then(result => {
      return {success: true, result: result.data};
    })
    .catch(error => {
      return {
        success: false,
        error: error.response,
      };
    });
};

export const deleteCategory = catId => {
  const configs = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': getCookie('token'),
    },
  };

  return axios
    .delete(`${process.env.REACT_APP_API_ROUTE}/category/${catId}`, configs)
    .then(response => {
      return {
        success: true,
        data: response.data,
      };
    })
    .catch(function (error) {
      return {
        success: false,
        error: error.response,
      };
    });
};
