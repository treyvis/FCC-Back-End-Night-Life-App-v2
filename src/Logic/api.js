import config from './config.js';
import firebase from 'firebase';
import axios from 'axios';
import 'firebase/firestore';

const api = {

  init: () => {
    return firebase.initializeApp(config);
  },

  createUserEmail: (name ,email, password) => {
    return new Promise((resolve, reject) => {
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

  loginUserEmail: (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },

  logout: () => {
    return firebase.auth().signOut();
  },

  getUser: () => {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          firebase.firestore().collection('users').doc(user.uid).get().then(doc => {
            if (doc.exists) {
              resolve(doc.data());
            } else {
              reject('User not found in users collection');
            }
          }).catch(err => {
            reject(err);
          });
        } else {
          resolve('No user logged in');
        }
      })
    });
  },

  getRestaurants: (search) => {
    return axios.get('http://localhost:3001/api/' + search);
  },

  onSearch: function(search) {
    if (search) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          firebase.firestore().collection('users').doc(user.uid).update({search: search}).then(res => {
            console.log('Search saved');
            console.log(res);
          })
        } else {
          console.log('No user logged in');
        }
      });

      return this.getRestaurants(search);
    }
  },

  loadSearch: function() {
    return new Promise ((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          firebase.firestore().collection('users').doc(user.uid).get().then(doc => {
            if (doc.exists) {
              console.log(doc.data()['search']);
              this.getRestaurants(doc.data()['search']).then( res => {
                resolve(res.data);
              }).catch( err => {
                reject(err);
              });
            } else {
              reject('User not in database');
            }
          });
        } else {
          resolve([]);
        }
      });
    });
  }
}

export default api;