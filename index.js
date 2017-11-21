const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const path = require('path');
const axios = require('axios');
//const config = require('./src/server/config.js');
const yelpToken = process.env.YELP_TOKEN;
console.log(yelpToken);
const yelp = axios.create({headers: {'Authorization':'Bearer ' + yelpToken}});

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

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(PORT, () => {
  console.log('Listening on', PORT);
});