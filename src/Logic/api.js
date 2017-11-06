import config from './config.js';
import firebase from 'firebase';

const api = {
  getUser: () => {
    return 'Returning user';
  },
  init: () => {
    return firebase.initializeApp(config);
  }
}

export default api;