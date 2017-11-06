const express = require('express');
const app = express();
const axios = require('axios');
const config = require('./config.js');
const yelp = axios.create({headers: {'Authorization':'Bearer ' + config.yelpToken}});

app.get('/api/:location', (req,res) => {
  console.log('API pinged with', req.params.location);
  yelp.get('https://api.yelp.com/v3/businesses/search?term=food&limit=2&location=' + req.params.location)
  .then(data => {
    res.json(data.data.businesses);
  }).catch(err => {
  console.error(err);
  })
});

const port = 3001;

app.listen(port, () => {
  console.log('Listening on', port);
});