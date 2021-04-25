import axios from 'axios';
import {getCookie} from '../components/Utilities/Cookies';

export const viewItems = () => {
  return axios
    .get(`${process.env.REACT_APP_API_ROUTE}/items`)
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

export const deleteItem = itemId => {
  const configs = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': getCookie('token'),
    },
  };

  return axios
    .delete(`${process.env.REACT_APP_API_ROUTE}/items/${itemId}`, configs)
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

export const addItem = data => {
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': getCookie('token'),
    },
  };

  return axios
    .post(`${process.env.REACT_APP_API_ROUTE}/items/`, data, headers)
    .then(result => {
      return {success: true, result: result.data};
    })
    .catch(error => {
      return {
        success: false,
        err: error.response,
      };
    });
};

export const searchItem = () => {};

export const editItem = (id, data) => {
  const header = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': getCookie('token'),
    },
  };

  return axios
    .put(`${process.env.REACT_APP_API_ROUTE}/items/${id}`, data, header)
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
