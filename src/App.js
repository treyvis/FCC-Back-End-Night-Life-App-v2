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
  }

  componentWillMount() {
    api.init();
    api.getRestaurants('Salt Lake City');
  }

  render() {
    console.log(api.getUser());
    return (
      <BrowserRouter>
        <div className="App">
          <Nav />
          <Switch>
            <Route path='/login' component={ Login } />
            <Route path='/signup' component={ Signup } />
            <Route exact path='/' component={ List } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
