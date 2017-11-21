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
          resolve({
            data: [],
            search: ''
          });
        }
      });
    });
  },
  goingToRestaurant: (restaurantId) => {
    //check if user is logged in -> if no, then redirect to login
    return new Promise ((resolve, reject) => {
      this.a.getUser().then(user => {
        if (user.uid) {
          console.log(user.uid);
          console.log(restaurantId);
          firebase.firestore().collection('restaurants').doc(restaurantId).get().then((doc) => {
            if(doc.exists) {
              console.log(doc.data());

              let restaurantData = doc.data();
              restaurantData.going.push(user.uid);
              console.log(restaurantData);
              firebase.firestore().collection('restaurants').doc(restaurantId).set(restaurantData).then(res => {
                console.log('user added to going');
                console.log(res);
                resolve(restaurantData.going);
              }).catch(err => {
                console.log(err);
              });

            } else {
              console.log('doc does not exist');
              firebase.firestore().collection('restaurants').doc(restaurantId).set({
                going: [user.uid]
              }).then((res) => {
                console.log('User added going');
                console.log(res);
                resolve([user.uid]);
  
                //Reload with new data
              }).catch(err => {
                console.log(err);
                reject(err);
              });
            }
          });
        } else {
          console.log('Going: user not logged in');
          window.location = '/login';
        }
      }).catch(err => {
        console.log(err);
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
                console.log(res);
                console.log(going);
                resolve(going);
              }).catch(err => {
                console.log(err);
                reject(err);
              }); 
            }
          }
        }).catch(err => {
          console.log(err);
          reject(err);
        });
      }).catch(err => {
        console.log(err);
        reject(err);
      })
    });
  }
}

export default api;