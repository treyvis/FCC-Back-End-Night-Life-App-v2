import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon, Input} from 'antd';
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
            Night Life App</Link> 
        </Menu.Item>
        <Menu.Item >
          <Search placeholder="Search here!" style={{width: 300}} />
        </Menu.Item>
        <Menu.Item key="login">
          <Link to='/login'><Icon type="login" />Login</Link>
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