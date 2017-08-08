"use strict";

let express = require('express'),
    compression = require('compression'),
    app = express();
//    session  = require('express-session');
	
var db = require('./api/queries');

app.set('port', process.env.PORT || 80);
app.use(compression());
//app.use(session({
//    secret: '2C44-4D44-WppQ38S',
//    resave: true,
//    saveUninitialized: true
//}));

//var auth = function(req, res, next) {
//  if (req.session && req.session.user === "amy" && req.session.admin)
//    return next();
//  else
//    return res.sendStatus(401);
//}


app.use('/', express.static(__dirname + '/www'));

// Adding CORS support
app.all('*', function (req, res, next) {
    // Set CORS headers: allow all origins, methods, and headers: you may want to lock this down in a production environment
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));

    if (req.method === 'OPTIONS') {
        // CORS Preflight
        res.send();
    } else {
        next();
    }
});

app.get('/api/block/:id', db.getObject);
//app.get('/login', function (req, res) {
//  if (!req.query.username || !req.query.password) {
//    res.send('login failed');    
    
//  } else if(req.query.username === "amy" || req.query.password === "amyspassword") {
//    req.session.user = "amy";
//    req.session.userid = 0;
//    req.session.admin = true;
//    res.redirect('/');
//  }
//});

// Logout endpoint
//app.get('/logout', function (req, res) {
//  req.session.destroy();
//  res.send("logout success!");
//});

app.route('/api/blocks')
  .get(function (req, res) {
    res.send('Get a random book');
  })
  .post(db.addBlock)
  .put( function (req, res) {
    res.send('Update the book');
  });

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});