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

  getRestaurants: function(search) {

    return new Promise ((resolve, reject) => {
      this.getUser().then(user => {
        axios.get('http://localhost:3001/api/' + search).then(res => {
          const callsToMake = res.data.data.length;
          let goingRestaurants = res.data.data;
          let callsMade = 0;
          for(const restaurant in res.data.data) {
            console.log(res.data.data[restaurant].id);
            firebase.firestore().collection('restaurants').doc(res.data.data[restaurant].id).get().then((doc) => {
                      
                callsMade++;
                if (doc.exists) {
                  console.log(doc.data());
                  goingRestaurants[restaurant].going = doc.data().going;
                  if (user.uid && goingRestaurants[restaurant].going.indexOf(user.uid) !== -1) {
                    goingRestaurants[restaurant].userGoing = true;
                    console.log('user going');
                  }
                }
                console.log('callsMade', callsMade);
                if (callsMade === callsToMake) {
                  console.log('Calls complete');
                  console.log(goingRestaurants);
                  resolve(res.data);
                }
            });
          }
        }).catch(err => {
          reject(err);
        });
      }).catch(err => {
        reject(err);
      })
    });



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
      firebase.auth().onAuthStateChanged(user => { //refactor this to use getUser
        if (user) {
          firebase.firestore().collection('users').doc(user.uid).get().then(doc => {
            if (doc.exists) {

              axios.get('http://localhost:3001/api/' + doc.data()['search']).then( res => {
                const callsToMake = res.data.data.length;
                let goingRestaurants = res.data.data;
                let callsMade = 0;
                for(const restaurant in res.data.data) {
                  console.log(res.data.data[restaurant].id);
                  firebase.firestore().collection('restaurants').doc(res.data.data[restaurant].id).get().then((doc) => {
                      
                      callsMade++;
                      if (doc.exists) {
                        console.log(doc.data());
                        goingRestaurants[restaurant].going = doc.data().going;
                        if (goingRestaurants[restaurant].going.indexOf(user.uid) !== -1) {
                          goingRestaurants[restaurant].userGoing = true;
                          console.log('user going');
                        }
                      }
                      console.log('callsMade', callsMade);
                      if (callsMade === callsToMake) {
                        console.log('Calls complete');
                        console.log(goingRestaurants);
                        resolve(res.data);
                      }
                  });
                }
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