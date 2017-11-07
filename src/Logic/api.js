import config from './config.js';
import firebase from 'firebase';
import 'firebase/firestore';

const api = {
  getUser: () => {
    return 'Returning user';
  },
  init: () => {
    return firebase.initializeApp(config);
  },
  createUserEmail: (name ,email, password) => {
    return new Promise( (resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res.uid);
        firebase.firestore().collection('users').doc(res.uid).set({
          uid: res.uid,
          email: email,
          name: name,
          registration: Date.now()
        })
        .then(() => {
          resolve('User added');
        })
        .catch((error) => {
          reject(error);
        });
      })
      .catch(function(error) {
        console.error(error.code, error.message);
        reject(error);
      });
    });
  },
  logout: () => {
    return firebase.auth().signOut();
  }
}

export default api;