import axios from 'axios';
import {getCookie} from '../components/Utilities/Cookies';

export const addToCart = data => {
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': getCookie('token'),
    },
  };

  return axios
    .post(`${process.env.REACT_APP_API_ROUTE}/carts/`, data, headers)
    .then(result => {
      return result.data;
    })
    .catch(error => {
      return {
        success: false,
        error,
      };
    });
};

export const getCart = () => {
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': getCookie('token'),
    },
  };

  return axios
    .get(`${process.env.REACT_APP_API_ROUTE}/carts/`, headers)
    .then(response => {
      return {
        success: true,
        data: response.data,
      };
    })
    .catch(function (error) {
      return {
        success: false,
      };
    });
};

export const deleteCart = data => {
  const configs = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': getCookie('token'),
    },
    data: {data},
  };

  return axios
    .delete(`${process.env.REACT_APP_API_ROUTE}/carts/`, configs)
    .then(response => {
      return {
        success: true,
        data: response.data,
      };
    })
    .catch(function (error) {
      return {
        success: false,
      };
    });
};

export const editCart = (itemId, quantity) => {
  const header = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': getCookie('token'),
    },
  };

  return axios
    .put(`${process.env.REACT_APP_API_ROUTE}/carts/`, {itemId, quantity}, header)
    .then(response => {
      return {
        success: true,
        data: response.data,
      };
    })
    .catch(function (error) {
      return {
        success: false,
      };
    });
};

export const makePayment = data => {
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': getCookie('token'),
    },
  };

  return axios
    .post(`${process.env.REACT_APP_API_ROUTE}/orders`, data, headers)
    .then(result => {
      return {success: true, data: result.data};
    })
    .catch(error => {
      return {
        success: false,
        error,
      };
    });
};
