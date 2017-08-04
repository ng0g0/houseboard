var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://elink:elink123@192.168.56.101/rbm';

var db = pgp(connectionString);

function getSinglePuppy(req, res, next) {
	
  var pupID = parseInt(req.params.id);
 
  let countSql = "SELECT COUNT(*) from RBM_OBJECTS o where  o.objmaster = $1";
  var sql = "select o.objid,o.OBJTYPE,o.objmaster,ot.typename, otd.OBJTYPEDETNAME, od.value , otd.OBJTYPEDETTYPE " +
	    " from RBM_OBJECTS o, RBM_OBJ_DETAILS od,	RBM_OBJECT_TYPE ot,	RBM_OBJ_TYPE_DET otd " +
	    " where o.OBJID = od.OBJID and o.OBJTYPE = ot.OBJTYPEID and od.OBJTYPEDETID =otd.OBJTYPEDETID " +
	    " and o.objmaster = $1";
  db.one(countSql, pupID)
    .then(result => {
      let total = parseInt(result.count);		
	  db.one(sql, pupID)
	    .then(products => {
           return res.status(200)
					.json({"total": total, "products": products});
                })
                .catch(next);
        })
        .catch(next);
}

module.exports = {

  getSinglePuppy: getSinglePuppy

};