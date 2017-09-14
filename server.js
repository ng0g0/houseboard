"use strict";

let express = require('express'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
	/*session = require('express-session'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	
	async = require('async'),
	crypto = require('crypto'),
	nodemailer = require('nodemailer'),
	cookieParser = require('cookie-parser'),*/
    app = express();

var router = express.Router();
var db = require('./api/queries');


app.set('port', process.env.PORT || 80);
app.use(compression());

app.use('/', express.static(__dirname + '/www'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(cookieParser());
//app.use(session({ secret: 'session secret key' }));

app.use(function(req, res, next) {
 res.setHeader("Access-Control-Allow-Origin", "*");
 res.setHeader("Access-Control-Allow-Credentials", "true");
 res.setHeader("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
 res.setHeader("Access-Control-Allow-Headers", 
               "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
             );
  res.setHeader("Cache-Control", "no-cache");
 next();
});    

app.use('/api', router);

router.get('/', function(req, res) {
 res.json({ message: 'API Initialized!'});
});

router.route('/block')
  .post(db.addBlock);
router.route('/block/:id')
  .get(db.getObject);
  
router.route('/user/login')
  .get(db.login);
router.route('/user/signup')
  .post(db.signup);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});