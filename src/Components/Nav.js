import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon, Input} from 'antd';
import api from '../Logic/api.js';
const Search = Input.Search;

class Nav extends Component {
  state = {
    current: 'home',
    email: ''
  }

  componentWillMount() {
    api.getUser().then(res => {
      console.log(res);
      this.setState({email: res.email});
    }).catch(err => {
      console.log(err);
    })
  }

  logout = () => {
    console.log('logout called');
    console.log(api.logout().then(() => {
      this.setState({email: ''});
      window.location = '/login';
    }));
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
        {(() => {
          if (this.state.email) {
            return (
              <Menu.Item key="logout">
                <div onClick={this.logout}><Icon type="logout" />Logout</div>
              </Menu.Item>
            );
          } else {
            return(
              <Menu.Item key="login">
                <Link to='/login'><Icon type="login" />Login</Link>
              </Menu.Item>
            );
          }
        })()}
        {(() => {
          if (this.state.email) {
            return (
              <Menu.Item key="loggedInUser">
                <Icon type="user" />{this.state.email}
              </Menu.Item>
            );
          } else {
            return(
              <Menu.Item key="signup"><Link to='/signup'>
                <Icon type="user" />Sign Up</Link>
              </Menu.Item>
            );
          }
        })()}
      </Menu>
    );
  }
}

export default Nav;