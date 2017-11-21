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
      firebase.auth().createUserWithEmailAndPassword(email, password).then( res => {
        firebase.firestore().collection('users').doc(res.uid).set({
          uid: res.uid,
          email: email,
          name: name,
          registration: Date.now()
        })
        .then(() => {
          resolve('User added');
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
      })
      .catch(function(err) {
        console.error(err);
        reject(err);
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
            firebase.firestore().collection('restaurants').doc(res.data.data[restaurant].id).get().then((doc) => {

                callsMade++;
                if (doc.exists) {
                  goingRestaurants[restaurant].going = doc.data().going;
                  if (user.uid && goingRestaurants[restaurant].going.indexOf(user.uid) !== -1) {
                    goingRestaurants[restaurant].userGoing = true;
                  }
                }
                if (callsMade === callsToMake) {
                  resolve(res.data);
                }
            });
          }
        }).catch(err => {
          console.error(err);
          reject(err);
        });
      }).catch(err => {
        console.error(err);
        reject(err);
      })
    });



  },

  onSearch: function(search) {
    if (search) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          firebase.firestore().collection('users').doc(user.uid).update({search: search}).then(res => {
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
              const userSearch = doc.data()['search'] ? doc.data()['search'] : 'Salt Lake City';
              axios.get('http://localhost:3001/api/' + userSearch).then( res => {
                const callsToMake = res.data.data.length;
                let goingRestaurants = res.data.data;
                let callsMade = 0;
                for(const restaurant in res.data.data) {
                  firebase.firestore().collection('restaurants').doc(res.data.data[restaurant].id).get().then((doc) => {
                      callsMade++;
                      if (doc.exists) {
                        goingRestaurants[restaurant].going = doc.data().going;
                        if (goingRestaurants[restaurant].going.indexOf(user.uid) !== -1) {
                          goingRestaurants[restaurant].userGoing = true;
                        }
                      }
                      if (callsMade === callsToMake) {
                        resolve(res.data);
                      }
                  });
                }
              }).catch( err => {
                console.error(err);
                reject(err);
              });
            } else {
              reject('User not in database');
            }
          });
        } else {
          resolve({
            data: [],
            search: ''
          });
        }
      });
    });
  },
  goingToRestaurant: (restaurantId) => {
    return new Promise ((resolve, reject) => {
      this.a.getUser().then(user => {
        if (user.uid) {
          firebase.firestore().collection('restaurants').doc(restaurantId).get().then((doc) => {
            if(doc.exists) {
              let restaurantData = doc.data();
              restaurantData.going.push(user.uid);
              firebase.firestore().collection('restaurants').doc(restaurantId).set(restaurantData).then(res => {
                resolve(restaurantData.going);
              }).catch(err => {
                console.error(err);
              });

            } else {
              firebase.firestore().collection('restaurants').doc(restaurantId).set({
                going: [user.uid]
              }).then((res) => {
                resolve([user.uid]);
              }).catch(err => {
                console.error(err);
                reject(err);
              });
            }
          });
        } else {
          window.location = '/login';
        }
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    })
  },
  notGoingToRestaurant: function(restaurantId) {

    return new Promise((resolve, reject) => {
      this.getUser().then(user => {
        //fetch going array
        firebase.firestore().collection('restaurants').doc(restaurantId).get().then(doc => {
          if (doc.exists) {
            let going = doc.data().going;
            let userIndex = going.indexOf(user.uid);
            if (userIndex !== -1) {
              going.splice(userIndex, 1);
              firebase.firestore().collection('restaurants').doc(restaurantId).set({
                going: going
              }).then(res => {
                resolve(going);
              }).catch(err => {
                console.error(err);
                reject(err);
              }); 
            }
          }
        }).catch(err => {
          console.error(err);
          reject(err);
        });
      }).catch(err => {
        console.error(err);
        reject(err);
      })
    });
  }
}

export default api;