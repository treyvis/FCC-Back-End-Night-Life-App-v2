import config from './config.js';
import firebase from 'firebase';

const api = {
  getUser: () => {
    return 'Returning user';
  },
  init: () => {
    return firebase.initializeApp(config);
  },
  createUserEmail: (name ,email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
      console.log(res);
    })
    .catch(function(error) {
      console.error(error.code, error.message);
    });
  }
}

export default api;