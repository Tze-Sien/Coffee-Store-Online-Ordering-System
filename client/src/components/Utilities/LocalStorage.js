// localstorage
export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = key => {
  return localStorage.getItem(key);
};

export const removeLocalStorage = key => {
  localStorage.removeItem(key);
};
