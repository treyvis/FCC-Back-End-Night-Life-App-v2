import React, { Component } from 'react';
import 'antd/dist/antd.css'
import { Menu, Icon, Card, Col} from 'antd';
import { Layout } from 'antd';
import burger from './img/burger.jpg';
const { Sider, Content } = Layout;

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
        <Card title='Burger 13' extra={<a href="#">More</a>} style={{ 
          maxWidth: 800, 
          width: '100%', 
          margin: '10px auto',
          }}>
          <Layout>
            <Sider>
              <div className="custom-image">
                <img alt="example" width="100%" src={burger} />
              </div>
            </Sider>
            <Content style={{padding: 10}}>
              <h2>American Grub with a Contempoary Twist</h2>
            </Content>
          </Layout>
        </Card>
        <Card title='Burger 13' extra={<a href="#">More</a>} style={{ 
          maxWidth: 800, 
          width: '100%', 
          margin: '10px auto',
          }}>
          <Layout>
            <Sider>
              <div className="custom-image">
                <img alt="example" width="100%" src={burger} />
              </div>
            </Sider>
            <Content style={{padding: 10}}>
              <h2>American Grub with a Contempoary Twist</h2>
            </Content>
          </Layout>
        </Card>
        <Card title='Burger 13' extra={<a href="#">More</a>} style={{ 
          maxWidth: 800, 
          width: '100%', 
          margin: '10px auto',
          }}>
          <Layout>
            <Sider>
              <div className="custom-image">
                <img alt="example" width="100%" src={burger} />
              </div>
            </Sider>
            <Content style={{padding: 10}}>
              <h2>American Grub with a Contempoary Twist</h2>
            </Content>
          </Layout>
        </Card>
      </div>
    );
  }
}

export default App;
