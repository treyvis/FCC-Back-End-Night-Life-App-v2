import React, { Component } from 'react';
import 'antd/dist/antd.css'
import { Layout } from 'antd';
import burger from './img/burger.jpg';
import Nav from './Components/Nav.js';
import List from './Components/List.js';
const { Sider, Content } = Layout;

class App extends Component {

  state = {
    current: 'home',
  }

  render() {
    return (
      <div className="App">
        <Nav />
        <List />
      </div>
    );
  }
}

export default App;
