// Importing Passport, strategies, and config
const passport = require('passport'),
  //User = require('../models/user'),
  config = require('./main'),
  JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt,
  LocalStrategy = require('passport-local');

const AuthenticationController = require('../api/controllers/authentication');  
// Setting username field to email rather than username
const localOptions = {
  usernameField: 'email'
};

// Setting up local login strategy
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
	//console.log(email);
	AuthenticationController.findUser(email, (err, user) => {
	//console.log('localLogin');	
    if (err) { return done(err); }
    if (!user) { return done(null, false, { error: 'Your login details could not be verified. Please try again.' }); }
	const hashpass = user.password;
	//console.log(hashpass);	
    AuthenticationController.comparePassword(password, hashpass, (err, isMatch) => {
      if (err) { 
		//console.log('Error localLogin');
		return done(err); 
		}
      if (!isMatch) { return done(null, false, { error: 'Your login details could not be verified. Please try again.' }); }
	  //console.log(user);
      return done(null, user);
    });
  });
});

// Setting JWT strategy options
const jwtOptions = {
  // Telling Passport to check authorization headers for JWT
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  // Telling Passport where to find the secret
  secretOrKey: config.secret

  // TO-DO: Add issuer and audience checks
};

// Setting up JWT login strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
	//console.log(payload);
	AuthenticationController.findUser(payload.email, (err, user) => {
    if (err) { return done(err, false); }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);
