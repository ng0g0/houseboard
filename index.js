
const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
//  logger = require('morgan'),
  router = require('./router'),
  config = require('./config/main');

  
  
let server;  
if (process.env.NODE_ENV != config.test_env) {
  server = app.listen(config.port);
  console.log(`Your server is running on port ${config.port}.`);
} else{
  server = app.listen(config.test_port);
}

// Serve static files from the React app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(logger('dev')); // Log requests to API using morgan

// Put all API endpoints under '/api'

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});    


router(app);

// necessary for testing
module.exports = server;


/*
router.get('/', function(req, res) {
  console.log(req);
 //res.json({ message: 'API Initialized!'});
});

router.route('/block')
  .post(db.addBlock);
router.route('/block/:id')
  .get(db.getObject);
  
router.route('user/:token')
  .get(function(req,res) {
    var token = req.params.token;
    console.log(token);
  });

router.route('/user/forgot')
  .post(function(req,res) {
    var userName = req.body.userName;
    crypto.randomBytes(20, function(err, buf) {
      var token = buf.toString('hex');
      db.forgotPassword(userName, token, function(err, res1) {
        if (res1.status === 'OK') {
          console.log(token);	
          console.log('http://' + req.headers.host + '/api//user/forgot/' + token);
          res.json({ login: userName, status: 'OK', message: 'Sent Token' });
        } else {
          res.json({ login: userName, status: 'NOK', message: 'USER_INVALID' });
        }
      });
    });
  });   

router.route('/user/changepass')
   .post(function(req,res) {
    console.log(req.body); 
    var userName = req.body.userName; 
    var passWord = req.body.passWord;
    var token = req.body.token; 
    var SALT_FACTOR = 5;
    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
      if (err) res.send(err);
      bcrypt.hash(passWord, salt, null, function(err, hash) {
	if (err) res.send(err);
        db.updatePassword(userName, hash, token, function(err, resq) {
          if (resq.status === 'OK') {
            res.json({ login: resq.username, status: 'OK', message: 'PASSWORD_CHANGED' });
          } else {
            res.json({ login: userName, status: 'NOK', message: resq.message });
          }
        })
        ;
      });
    });
});  
   
  
router.route('/user/login')
  .post(function(req,res) {
	console.log('-- LOGIN ---');
    var userName = req.body.params.userName;
    var passWord = req.body.params.passWord;
	
    db.findUser(userName, function(err, res1) {
	  console.log(passWord);
	  console.log(res1.password);
      if (res1.status === 'OK') {
		bcrypt.compare(passWord, res1.password, function(err, passOk) {
		console.log(passOk);	  
		if (passOk == true) {
			console.log('OK');
			res.json({ login: res1.username, status: 'OK', message: 'Logged' });
		} else {
			console.log('NOK');
			res.json({ login: res1.username, status: 'NOK', message: 'USER_INVALID' });
		}
		});
      } else {
        res.json({ login: userName, status: 'NOK', message: res1.message });
      }
	 
    });
});

*/
//router.route('/user/signup')
//  .post(function(req, res) {
    //var SALT_FACTOR = 5;
    //var userName = req.body.userName;
    //var passWord = req.body.passWord;
    //var firstName = req.body.firstName;
    //var lastName = req.body.lastName;
	//bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    //  if (err) res.send(err);
	//  //crypto.randomBytes(6, function(err, buf) {
	//  //	var passWord = buf.toString('hex');
	//  //	console.log(passWord);
	//	bcrypt.hash(passWord, salt, null, function(err, hash) {
	//	if (err) res.send(err);
    //              db.signup(userName, hash, firstName,lastName, function(err, resq) {
                   /* var smtpTransport = nodemailer.createTransport({
                      service:"gmail",
                      host: "smtp.gmail.com",
                      auth: { 
                          user:"hristov.gv@gmail.com",
                          pass:"data98soft"
                      }
                    });
                    var mailOptions = {
                          to: userName,
                          from: 'passwordreset@demo.com',
                          subject: 'RPM User created',
                          text: 'You are receiving this because you (or someone else) have signup with your email.\n\n' +
//				  'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
//				  'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                             'Your password is ' + passWord+ '\n\n' +	
                            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                    };
                      smtpTransport.sendMail(mailOptions, function(err) {
                      if  (err) {
                        console.log(err);
                      }else {*/
        //              res.json({ login: resq.username, status: resq.status, message: resq.message });
                      //}
                    //});
        //          });
	//    //	});
	//  });
    //});
//});


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
//app.get('*', (req, res) => {
  //res.sendFile(path.join(__dirname+'/client/www/index.html'));
//  res.sendFile(path.join(__dirname+'/www/index.html'));
//});

//app.listen(app.get('port'), function () {
    //console.log('Express server listening on port ' + app.get('port'));
//});

//const port = process.env.PORT || 5000;
//app.listen(port);

//console.log(`Password generator listening on ${port}`);
