const express = require('express');
const app = express();
const axios = require('axios');

const config = require('./config.js');

console.log(config);

const yelp = axios.create({headers: {'Authorization':'Bearer ' + config.yelpToken}});

yelp.get('https://api.yelp.com/v3/businesses/search?term=food&location=Las Vegas&limit=2&offset=2')
  .then(res => {
    console.log(res.data.businesses);
  }).catch(err => {
    console.error(error);
  });