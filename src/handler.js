const path = require('path');
const fs = require('fs');
const request = require('request');
const url = require('url');
const querystring = require('querystring');
const env = require('dotenv').config();

// A function to the home endpoint
const handlerHome = (request, response) => {
  const filePath = path.join(__dirname, '..', 'public', 'index.html');
  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(500, {'Content-Type' : 'text/html'});
      response.end('<h1> Sorry, There is an Error </h1>');
    } else {
      response.writeHead(200, {'Content-Type' : 'text/html'});
      response.end(file);
    }
  });
};

const handlerPublic = (request, response, url) => {
  const extention = url.split('.')[1];
  const extentionTypes = {
    html: 'text/html',
    js: 'application/javascript',
    css: 'text/css'
  };
  const filePath = path.join(__dirname, '..', url);
  fs.readFile(filePath, (error, file) => {
    if (error) {
      console.log(error);
      response.writeHead(404, {'Content-Type' : 'text/html'});
      response.end('<h1> Sorry.. Can\'t Find This File !! </h1>');
    } else {
      response.writeHead(200, {'Content-Type' : extentionTypes[extention] });
      response.end(file);
    }
  });
};

const handlerPicture = (req, res) => {
  const myApi = `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`;
  // console.log('api-key is: ', api_key);
  request(myApi, (err, response, body) => {
    const parsedBody = JSON.parse(body);
    const mediaImage = true;
    if (parsedBody.media_type === 'image') {
      mediaImage == true;
    } else {
      mediaImage == false;
    }
    if (err) {
      response.writeHead(404, {'Content-Type' : 'text/html'});
      response.end('Sorry, There is an Error');
    } else {
      res.writeHead(200, {'Content-Type' : 'text/html'});
      res.end(JSON.stringify(`${parsedBody.title}&${parsedBody.url}&${mediaImage}&${parsedBody.explanation}`));
    }
  })

};


module.exports = {
  handlerHome,
  handlerPublic,
  handlerPicture
};
