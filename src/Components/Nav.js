import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon, Card, Col, Input} from 'antd';
const Search = Input.Search;

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
          <Link to='/'>
          <Icon type="like" /> 
            Night Life App | Salt Lake City</Link> 
        </Menu.Item>
        <Menu.Item >
          <Search placeholder="Search here!" style={{width: 300}} />
        </Menu.Item>
        <Menu.Item key="login">
          <Icon type="login" />Login
        </Menu.Item>
        <Menu.Item key="logout">
          <Icon type="logout" />Logout
        </Menu.Item>
        <Menu.Item key="signup"><Link to='/signup'>
          <Icon type="user" />Sign Up</Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default Nav;