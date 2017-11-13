import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Card, Input } from 'antd';
const Search = Input.Search;
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
        <Card style={{ 
          maxWidth: 800, 
          width: '100%', 
          margin: '10px auto',
          }}>
          <h1>Search for restaurants in your city:</h1>
          <Search
            defaultValue={this.props.search}
            onSearch={value => {this.props.onSearch(value)}}
          />
        </Card>
        {restaurantCards}
      </div>
    );
  }
}

List.propTypes = {
  search: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  restaurants: PropTypes.array.isRequired
}

export default List;