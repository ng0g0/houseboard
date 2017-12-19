const pgp = require('pg-promise')(/*options*/);
const db = require('../connection/postgres');

var QRE = pgp.errors.QueryResultError;
var qrec = pgp.errors.queryResultErrorCode;

exports.viewProfile = function (req, res, next) {
  console.log(req.params);	
  const userId = req.params.userId;
  let finUserSql = "select usrid,username, password, firstname, lastname from rbm_user where usrid = $1 ";
	var obj;
	db.one(finUserSql, [userId])
	.then(user=> {
		if (req.user.username !== user.username) { 
			return res.status(401).json({ error: 'You are not authorized to view this user profile.' }); 
		} else {
			obj = {
				uid: user.usrid,
				username: user.username,
				password: user.password,
				firstName: user.firstname,
				lastName: user.lastname
			};
			console.log('View Profile');
			console.log(obj);
			return res.status(200).json({ user: obj });
		}
	})
	.catch(error=> {
	   if (error instanceof QRE && error.code === qrec.noData) {
			res.status(400).json({ error: 'No user could be found for this ID.' });
			return next(error);
		} else {
			return next(error);
		}
	});
};