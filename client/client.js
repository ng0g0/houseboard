
const express = require('express'),
      app = express(),
	 path = require('path'),
	 config = require('../config/main');
 
let server;  


server = app.listen(config.client_port, error => (
  error
    ? console.error(error)
    : console.info(`Visit ${config.app_url}:${config.client_port}/ in your browser.`)
));

 
//const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

