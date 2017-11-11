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
            <Sider style={{height: '200px',width: '200px', overflow: 'hidden'}}>
              <div className="custom-image" style={{
                background: 'url(https://s3-media1.fl.yelpcdn.com/bphoto/jmEG0-ADjgmRDYulOIXusg/o.jpg) center / cover no-repeat',
                width: '300px',
                height: '200px'
              }}></div>
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
          <Layout >
            <Sider style={{height: '200px',width: '200px', overflow: 'hidden'}}>
              <div className="custom-image" style={{
                background: 'url(https://s3-media2.fl.yelpcdn.com/bphoto/AjNvDqZPZH8GoUe9GNLIAQ/o.jpg) center / cover no-repeat',
                width: '200px',
                height: '200px'
              }}></div>
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