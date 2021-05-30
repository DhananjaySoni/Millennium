const ID_TOKEN_KEY = "id_token";
const LAST_ONLINE_TIME = "last_online_time";
// const log = require('electron-log');

// token
export const getToken = () => {
  return window.localStorage.getItem(ID_TOKEN_KEY);
};

export const saveToken = token => {
  // log.info("called JWT_SERVICE save_token : " + token);
  window.localStorage.setItem(ID_TOKEN_KEY, token);
};

export const destroyToken = () => {
  // log.info("called JWT_SERVICE distroy_token");
  window.localStorage.removeItem(ID_TOKEN_KEY);
};

// online time
export const getLastOnlineTime = () => {
  return window.localStorage.getItem(LAST_ONLINE_TIME);
};

export const saveLastOnlineTime = last_online_time => {
  window.localStorage.setItem(LAST_ONLINE_TIME, last_online_time);
};

export const destroyLastOnlineTime = () => {
  window.localStorage.removeItem(LAST_ONLINE_TIME);
};

export default { getToken, saveToken, destroyToken, 
                 getLastOnlineTime, saveLastOnlineTime, destroyLastOnlineTime };
