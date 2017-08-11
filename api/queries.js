var pgp = require('pg-promise')(/*options*/);
//var connectionString = 'postgres://elink:elink123@192.168.56.101/rbm';
var connectionString ='postgres://knrugsojjjwgbg:e8ac10b24496df70d2ff6084b5efed77d08ef9937ef462444ea3fe54cde46116@ec2-46-137-97-169.eu-west-1.compute.amazonaws.com:5432/d43db70pd2vpgb';

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

module.exports = {

  getObject: getObject,
  addBlock: addBlock

};