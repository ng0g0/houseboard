//import { CLIENT_ROOT_URL } from '../../client/src/actions';

const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('../../config/main');



var pgp = require('pg-promise')(/*options*/);
var async = require('async');
const bcrypt = require('bcrypt-nodejs');

//var db = pgp(config.connectionString);
const db = require('../connection/postgres');
var QRE = pgp.errors.QueryResultError;
var qrec = pgp.errors.queryResultErrorCode;


// Generate JWT
// TO-DO Add issuer and audience
function generateToken(user) {
  return jwt.sign(user, config.secret, {
    expiresIn: 604800 // in seconds
  });
};

exports.findUser = function(userName, callback) {
	let finUserSql = "select usrid,username, password, firstname, lastname from rbm_user where username = $1 ";
	var obj;
	
	db.one(finUserSql, [userName])
		.then(user=> {
		obj = {
			uid: user.usrid,
			username: user.username,
			password: user.password,
			firstName: user.firstname,
			lastName: user.lastname
		};
		callback(null, obj);
	})
	.catch(error=> {
		//console.log(error);
	   if (error instanceof QRE && error.code === qrec.noData) {
			callback(null, null);
						
		} else {
			callback(error, null);
		}
	});
}

exports.comparePassword = function(pass, hash, callback) {
  //console.log('comparePassword');
  bcrypt.compare(pass, hash, (err, isMatch) => {
    if (err) { 
		//console.log('Error in comparePassword');
		//console.log(err);
		return callback(err); 
	}
	//console.log(isMatch);
    callback(null, isMatch);
  });
}; 
  

exports.login = function (req, res, next) {
  //console.log(req); 	
  const userInfo  = { 
    uid: req.user.uid,
	username: req.user.username,
	firstName: req.user.firstName,
	lastName: req.user.lastName,
	email: req.user.username
  };
  //console.log('login');
  console.log(userInfo);
  //console.log('-----');
  res.status(200).json({
    token: `JWT ${generateToken(userInfo)}`,
    user: userInfo
  });
};

exports.register = function (req, res, next) {

	const email = req.body.email;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const password = req.body.password;
	let hashPassword = '123';
	const SALT_FACTOR = 5;
	//console.log('register');
	// Return error if no email provided
	if (!email) {
		return res.status(422).send({ error: 'You must enter an email address.' });
	}

	// Return error if full name not provided
	if (!firstName || !lastName) {
		return res.status(422).send({ error: 'You must enter your full name.' });
	}

	// Return error if no password provided
	if (!password) {
		return res.status(422).send({ error: 'You must enter a password.' });
	}
	//console.log('Validation ok');
	bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
		if (err) return next(err);
		bcrypt.hash(password, salt, null, (err, hash) => {
		if (err) return next(err);
		hashPassword = hash;
		//console.log('Validating password');
		let registerSql = "INSERT INTO rbm_user (username, password, firstname, lastname) VALUES( $1, $2, $3, $4) RETURNING usrid";
		db.one(registerSql, [email, hashPassword, firstName, lastName] )
		.then((user) => {
			obj = {
				uid: user.usrid,
				username: email,
				firstName: firstName,
				lastName: lastName
				};
			console.log(obj);	
			res.status(201).json({
				token: `JWT ${generateToken(obj)}`,
				user: obj
			});	
		})
		.catch(error=> {
			if (error.code === "23505") {
				return res.status(422).send({ error: 'That email address is already in use.' });	
			} else {
				//console.log(error);
				return res.status(500).send({ error: error });
			}
		});
		});
	});
};

exports.forgotPassword = function (req, res, next) {
  const email = req.body.email;
	//console.log('forgotPassword');
	//console.log(email);
	let findSql = "select count(username) as cnt from rbm_user where username = $1 ";
	db.one(findSql, [email])
	.then(user=> {
		//console.log(user);
		if (user.cnt === '0' ) {
			res.status(422).json({ error: 'Your request could not be processed as entered. Please try again.' });
			return next(err);
		}	
	})
	.catch(error=> {
		//console.log(error);
		res.status(422).json({ error: error });
		return next(err);
	});

      // Generate a token with Crypto
    crypto.randomBytes(48, (err, buffer) => {
      const resetToken = buffer.toString('hex');
      if (err) { return next(err); }
		let forgotSQL = "update rbm_user  set  " +
			" resetPasswordToken = $1, resetPasswordExpires = NOW() + interval '1 hour' "  + 
			" where username = $2";
		db.none(forgotSQL, [resetToken,email])
		.then( () => {
			const message = {
				subject: 'Reset Password',
				text: `${'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
					'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
					' '}${CLIENT_ROOT_URL}/reset-password/${resetToken}\n\n` +
					`If you did not request this, please ignore this email and your password will remain unchanged.\n`
			};

          // Otherwise, send user email via Mailgun
        //mailgun.sendEmail(existingUser.email, message);
			console.log(message.text);
			return res.status(200).json({ message: 'Please check your email for the link to reset your password.' });
		})
		.catch(error=> {
			//console.log(error);
			return next(err);
        });


      });
};

//= =======================================
// Reset Password Route
//= =======================================

exports.verifyToken = function (req, res, next) {
	const SALT_FACTOR = 5;
	let hashPassword = '123';
	const Token = req.params.token;
    let findTokenSql = "select username "+
	                   " FROM rbm_user where resetPasswordToken = $1 "+
					   " AND  resetPasswordExpires > NOW() ";
	db.one(findTokenSql, [Token])
		.then(user=> {
			const newPassword = req.body.password;
            const userName = user.username;
			bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
				if (err) return next(err);
				bcrypt.hash(newPassword, salt, null, (err, hash) => {
					if (err) return next(err);
					hashPassword = hash;
					//console.log('Validating password');
					let updatePassSQL = "update rbm_user  set  " +
						" password = $1, resetPasswordToken = NULL ,"+
						" resetPasswordExpires = NULL "  + 
						" where username = $2";
					db.none(updatePassSQL, [hashPassword,userName])
					.then( () => {
					  const message = {
						subject: 'Password Changed',
						text: 'You are receiving this email because you changed your password. \n\n' +
							  'If you did not request this change, please contact us immediately.'
						};
						console.log(message.text);
						// Otherwise, send user email confirmation of password change via Mailgun
						//mailgun.sendEmail(resetUser.email, message);
						return res.status(200).json({ message: 'Password changed successfully. Please login with your new password.' });  
					})
					.catch(error=> {
						return next(err);
					});
				});
			});		
		})
		.catch(error=> {
		   if (error instanceof QRE && error.code === qrec.noData) {
			   res.status(422).json({ error: 'Your token has expired. Please attempt to reset your password again.' });
			} else {
				return next(err);
			}
		});	
};


