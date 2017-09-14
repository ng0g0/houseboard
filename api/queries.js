var pgp = require('pg-promise')(/*options*/);
var connectionString = 'postgres://elink:elink123@192.168.56.101/rbm';
//var connectionString ='postgres://ieytasililfytd:f1e10d16e96b3132608fb0acb54b73f4b5d976a48ecb0f713bab02f96a121e1f@ec2-54-75-234-89.eu-west-1.compute.amazonaws.com:5432/dbd1mme7jftkqh';

var db = pgp(connectionString);
var QRE = pgp.errors.QueryResultError;
var qrec = pgp.errors.queryResultErrorCode;


function getObject(req, res, next) {
  var pupID = parseInt(req.params.id);
  let countSql = "SELECT COUNT(*) from RBM_OBJECTS o where  o.objmaster = $1";
  var sql = "select o.objid,o.OBJTYPE,o.objmaster,ot.typename " +
            "  from RBM_OBJECTS o, RBM_OBJECT_TYPE ot " +
            " where o.OBJTYPE = ot.OBJTYPEID " +
	    " and o.objmaster = $1";
    
  db.one(countSql, pupID)
    .then(result => {
      let total = parseInt(result.count);		
	  db.any(sql, pupID)
	    .then(blocks => {
           return res.status(200)
            .json({total: total, blocks: blocks, message: 'Blocks Retrieved'});
                })
            .catch(next);
    })
    .catch(next);
}

function addBlock(req, res, next) {
    db.none('INSERT INTO rbm_objects (objtype, objmaster, objactive)' +
      'VALUES( 1, 0, 1)')
    .then(() => {
        res.status(200)
       .json({
          message: 'Inserted Block'
        });
    })
    .catch(next);
}


function login(req, res, next) {
  var userName = req.query.userName;
  var passWord = req.query.passWord;
  let loginSql = "select count(username) as cnt from rbm_user " +
      " where username = $1 " +
      " and password = $2 ";
  db.one(loginSql, [userName, passWord])
    .then(user=> {
       if (user.cnt === '1') {
         return res.status(200)
        .json({ login: userName, status: 'OK' , message: 'User Found'});
       } else {
         return res.status(200)
        .json({ login: userName, status: 'NOK' , message: 'Wrong User or Password'});
       }
    })
    .catch(error=> {
       if (error instanceof QRE && error.code === qrec.noData) {
          return res.status(200)
        .json({ login: null , message: 'No data Found'});
        } else {
          return res.status(200)
        .json({ login: null , message: error.code});
        }
    });
}

function signup(req, res, next) {
  var userName = req.body.userName;
  var passWord = req.body.passWord;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  
  let signupSql = "INSERT INTO rbm_user (username, password, firstname, lastname)" +
      "VALUES( $1, $2, $3, $4)";
  db.none(signupSql, [userName, passWord, firstName, lastName] )
    .then(() => {
        res.status(200)
       .json({ login: userName, status: 'OK', message: 'Inserted User' });
    })
    .catch(error=> {
      console.log(error);
       if (error instanceof QRE && error.code === qrec.noData) {
          return res.status(200)
        .json({ status: 'NOK', message: 'No data Found'});
        } else if (error.code === "23505") {
          return res.status(200)
        .json({ login: null , status: 'NOK' , message: 'User alrady exists'});
        } else {
          return res.status(200)
        .json({ status: 'NOK', message: error.code});
        }
    });
}


module.exports = {

  getObject: getObject,
  addBlock: addBlock ,
  signup: signup,
  login: login

};