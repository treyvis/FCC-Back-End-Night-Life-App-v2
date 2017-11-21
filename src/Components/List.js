import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Card, Input, Icon, Button } from 'antd';
import api from '../Logic/api.js';
const Search = Input.Search;
const { Sider, Content } = Layout;

class List extends Component {
  render() {
    console.log('Restaurants',this.props.restaurants.length);

    const restaurantCards = this.props.restaurants.map((restaurant, index) => {
      console.log(restaurant);
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
              <h3>
                <Icon type='home' style={{marginRight: '7px'}}/>
                {restaurant.location.display_address[0]}
              </h3>
              <h3>
                <Icon type='home' style={{marginRight: '7px',visibility: 'hidden'}}/>
                {restaurant.location.display_address[1]}
              </h3>
              <h3>
                <Icon type='phone' style={{marginRight: '7px'}} />
                {restaurant.display_phone}
              </h3>
              <h3>
                <Icon type='shop' style={{marginRight: '7px'}} />
                {restaurant.price}
              </h3>
              <h3>
                <Icon type='smile' style={{marginRight: '7px'}} />
                {restaurant.rating}
              </h3>
              <h3>
                <Icon type='team' style={{marginRight: '7px'}}/>
                {restaurant.going ? restaurant.going.length : 0} going tonight{restaurant.userGoing ? ' (including you)' : ''}!
                <br/>
                {(() => {
                  if (restaurant.userGoing) {
                    return <Button type="danger" onClick={() => { this.props.notGoingToRestaurant(restaurant.id, index) }}>Not Going!</Button>;
                  } else {
                    return <Button type="primary" onClick={() => { this.props.goingSelected(restaurant.id, index)}}>Going!</Button>;
                  }
                })()}
              </h3>
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
            value={this.props.search}
            onSearch={value => {this.props.onSearch(value)}}
            onChange={(e) => {this.props.onSearchChange(e.target.value);}}
          />
        </Card>
        {restaurantCards}
      </div>
    );
  }
}

List.propTypes = {
  onSearch: PropTypes.func.isRequired,
  restaurants: PropTypes.array.isRequired
}

export default List;