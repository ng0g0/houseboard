var promise = require('bluebird');
var session  = require('express-session');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://elink:elink123@192.168.56.101/rbm';

var db = pgp(connectionString);

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
	    .then(products => {
           return res.status(200)
            .json({"total": total, "blocks": products});
                })
                .catch(next);
    })
    .catch(next);
}

function addBlock(req, res, next) {
    db.none('INSERT INTO rbm_objects (objtype, objmaster, objactive)' +
      'VALUES( 1, 0, 1)')
    .then(function () {
      res.status(200)
       .json({
          message: 'Inserted Block'
        });
    })
    .catch(next);
}

module.exports = {

  getObject: getObject,
  addBlock: addBlock

};