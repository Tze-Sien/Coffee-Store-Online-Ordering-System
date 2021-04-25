import Cookie from 'js-cookie';

export const setCookie = (key, value) => {
  Cookie.set(key, value, {
    expires: 5,
  });
};

export const getCookie = key => {
  return Cookie.get(key);
};

export const removeCookie = key => {
  Cookie.remove(key, {
    expires: 1,
  });
};
