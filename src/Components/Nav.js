import React, { Component } from 'react';
import { Menu, Icon, Card, Col} from 'antd';

class Nav extends Component {
  state = {
    current: 'home'
  }

  render() {
    return(
      <Menu
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
    );
  }
}

export default Nav;