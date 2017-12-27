var express = require("express");
    bodyParser = require("body-parser"),
    router = require('./router'),
    config = require('./config/main');
//var mongodb = require("mongodb");
///var ObjectID = mongodb.ObjectID;

//var CONTACTS_COLLECTION = "contacts";

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//process.env.NODE_ENV = 'production';

  // Initialize the app.
  var server = app.listen(config.api_port, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
//});

// CONTACTS API ROUTES BELOW
/*
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
*/
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}


/*

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
//app.get('*', (req, res) => {
  //res.sendFile(path.join(__dirname+'/client/www/index.html'));
//  res.sendFile(path.join(__dirname+'/www/index.html'));
//});
*/

router(app);

//module.exports = server;
