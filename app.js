require('dotenv').config()

const express = require('express')
const https = require('https')
const app = express()
const port = 3001

const unsplashAPIURL = 'api.unsplash.com';

app.get('/search', function (req, res) {
  
  https.get(`https://${unsplashAPIURL}/search/photos?page=${req.query.page}&query=${req.query.search}`,
    {headers: {
      'Content-Type': 'application/json',
      Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
    }
  }, function (response) {
    let searchData = '';
    response.on('data', (chunk) => {
      searchData += chunk;
    });
    response.on('end', () => {
      res.json(JSON.parse(searchData));
    });
  })
})

app.listen(port, () => {
  console.log(`Server running on ${port}`)
})