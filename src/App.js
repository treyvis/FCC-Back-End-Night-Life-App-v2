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
    search: 'Salt Lake City',
    restaurants: []
  }

  componentWillMount() {
    api.init();
    api.getRestaurants('Salt Lake City').then( res => {
      console.log(res);
      this.setState({restaurants: res.data});
    }).catch(err => {
      console.log(err);
    });
  }

  onSearch = (search) => {

  }

  render() {
    console.log('Render called');
    return (
      <BrowserRouter>
        <div className="App">
          <Nav search={this.state.search}  />
          <Switch>
            <Route path='/login' component={ Login } />
            <Route path='/signup' component={ Signup } />
            <Route exact path='/' render={(props) => {
               return (<List {...props} restaurants={this.state.restaurants} />);
            }} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
