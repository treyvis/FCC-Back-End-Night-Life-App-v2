const express = require('express');
const app = express();

const path = require('path');
const axios = require('axios');
const config = require('./src/server/config.js');
const yelp = axios.create({headers: {'Authorization':'Bearer ' + config.yelpToken}});

app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/:location', (req,res) => {
  console.log('API pinged with', req.params.location);
  yelp.get('https://api.yelp.com/v3/businesses/search?term=food&limit=30&location=' + req.params.location)
  .then(data => {
    res.json({
      data: data.data.businesses,
      search: req.params.location
    });
  }).catch(err => {
  console.error(err);
  })
});

const port = 3000;

app.listen(port, () => {
  console.log('Listening on', port);
});