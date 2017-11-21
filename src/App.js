import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'antd/dist/antd.css'
import Nav from './Components/Nav.js';
import List from './Components/List.js';
import Signup from './Components/Signup.js';
import Login from './Components/Login.js';
import api from './Logic/api.js';

class App extends Component {

  state = {
    current: 'home',
    search: '',
    restaurants: []
  }

  componentWillMount() {

    api.init();

  }

  goingSelected = (restaurantId, restaurantIndex) => {
    api.goingToRestaurant(restaurantId).then( res => {
      let restaurants = this.state.restaurants;
      restaurants[restaurantIndex].going = res;
      restaurants[restaurantIndex].userGoing = true;
      this.setState({restaurants});
    }).catch( err => {
      console.error(err);
    })
  }

  notGoingToRestaurant = (restaurantId, restaurantIndex) => {
    api.notGoingToRestaurant(restaurantId).then( res => {
      let restaurants = this.state.restaurants;
      restaurants[restaurantIndex].going = res;
      restaurants[restaurantIndex].userGoing = false;
      this.setState({restaurants});
    });
  }

  componentDidMount() {
    api.loadSearch().then( res => {
      this.setState({
        restaurants: res.data,
        search: res.search
      });
    }).catch(err => {
      console.log(err);
    });
  }

  onSearch = (search) => {
    if (search) {
      api.onSearch(search).then( res => {
        this.setState({
          search: res.search,
          restaurants: res.data
        });
      }).catch( err => {
        console.log(err);
      });
    }
  }

  onSearchChange = (search) => {
    this.setState({search});
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Nav />
          <Switch>
            <Route path='/login' component={ Login } />
            <Route path='/signup' component={ Signup } />
            <Route exact path='/' render={(props) => {
              return (
                <List {...props} 
                  restaurants={this.state.restaurants} 
                  search={this.state.search} 
                  onSearch={this.onSearch}
                  onSearchChange={this.onSearchChange}
                  goingSelected={this.goingSelected} 
                  notGoingToRestaurant={this.notGoingToRestaurant}/>
              );
            }} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
