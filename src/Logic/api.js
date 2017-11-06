import config from './config.js';

const api = {
  getUser: () => {
    return 'Returning user';
  },
  init: () => {
   return config;
  }
}

export default api;