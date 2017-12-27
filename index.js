const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
//  logger = require('morgan'),
  router = require('./router'),
  config = require('./config/main');
  
//process.env.NODE_ENV = 'production';
  
  
let server;  
console.log(`Your ENV:"${process.env.npm_package_run}".`);
//process.env
//if (process.env.NODE_ENV != config.test_env) {
  server = app.listen(config.api_port);
//  console.log(`Your server is running on port ${config.api_port}.`);
//} else{
//  server = app.listen(config.test_api_port);
  console.log(`Your server is ${process.env.npm_package_run} and running on port ${config.api_port}.`);
//}



// Serve static files from the React app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(logger('dev')); // Log requests to API using morgan

// Put all API endpoints under '/api'

app.use((req, res, next) => {
   var clinet_address = config.app_url + ':' + config.client_port;	
  // console.log(`Your ENV:"${clinet_address}".`);
  //res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Origin', clinet_address);
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});   


router(app);

//app.get('*', function(req, res) {
//  res.sendFile(path.join( __dirname, '/client/src/index.html'));
//});

// necessary for testing
module.exports = server;

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
//app.get('*', (req, res) => {
  //res.sendFile(path.join(__dirname+'/client/www/index.html'));
//  res.sendFile(path.join(__dirname+'/www/index.html'));
//});
