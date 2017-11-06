import React, { Component } from 'react';
import burger from '../img/burger.jpg';
import { Layout, Card } from 'antd';
const { Sider, Content } = Layout;

class List extends Component {
  render() {
    return (
      <div>
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

export default List;