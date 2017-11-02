import React, { Component } from 'react';
import 'antd/dist/antd.css'
import { Menu, Icon } from 'antd';
const MenuItemGroup = Menu.ItemGroup;

class App extends Component {

  state = {
    current: 'home',
  }

  render() {
    return (
      <div className="App">
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal">
          <Menu.Item key="home" style={{fontSize: 24}}>
            <Icon type="like" />Night Life App | Salt Lake City
          </Menu.Item>
          <Menu.Item key="search">
            <Icon type="search" />Search
          </Menu.Item>
          <Menu.Item key="login">
            <Icon type="login" />Login
          </Menu.Item>
          <Menu.Item key="logout">
            <Icon type="logout" />Search
          </Menu.Item>
          <Menu.Item key="signup">
            <Icon type="user" />Sign Up
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default App;
