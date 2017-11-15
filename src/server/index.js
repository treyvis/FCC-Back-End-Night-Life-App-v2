const express = require('express');
const app = express();
const axios = require('axios');
const config = require('./config.js');
const yelp = axios.create({headers: {'Authorization':'Bearer ' + config.yelpToken}});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/:location', (req,res) => {
  console.log('API pinged with', req.params.location);
  yelp.get('https://api.yelp.com/v3/businesses/search?term=food&limit=5&location=' + req.params.location)
  .then(data => {
    res.json({
      data: data.data.businesses,
      search: req.params.location
    });
  }).catch(err => {
  console.error(err);
  })
});

const port = 3001;

app.listen(port, () => {
  console.log('Listening on', port);
});