import React, { Component } from 'react';
import burger from '../img/burger.jpg';
import { Layout, Card } from 'antd';
const { Sider, Content } = Layout;

class List extends Component {
  render() {
    console.log('Restaurants',this.props.restaurants.length);

    const restaurantCards = this.props.restaurants.map(restaurant => {
      return (
        <Card title={restaurant.name} key={restaurant.id} extra={<a href={restaurant.url} target='_blank'>See in Yelp</a>} style={{ 
          maxWidth: 800, 
          width: '100%', 
          margin: '10px auto',
          }}>
          <Layout>
            <Sider >
              <div className="custom-image" style={{
                background: 'url(' + restaurant.image_url +') center / cover no-repeat',
                width: '100%',
                height: '200px'
              }}></div>
            </Sider>
            <Content style={{padding: 10}}>
              <h3>{restaurant.location.display_address[0]}</h3>
              <h3>{restaurant.location.display_address[1]}</h3>
              <h3>{restaurant.display_phone}</h3>
              <br/>
              <h3>{restaurant.price}</h3>
              <br/>
              <h3>{restaurant.rating}</h3>
            </Content>
          </Layout>
        </Card>
      );
    });

    return (
      <div>
        {restaurantCards}
      </div>
    );
  }
}

export default List;