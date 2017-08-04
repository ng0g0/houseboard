'use strict';

// Bluebird is the best promise library available today,
// and is the one recommended here:
const promise = require('bluebird');


// pg-promise initialization options:
const initOptions = {
	promiseLib: promise
};

// Load and initialize pg-promise:
const pgp = require('pg-promise')(initOptions);

//"postgres://elink:elink123@192.168.56.101/rbm"
// Database connection parameters:
const config = {
    host: '192.168.56.101',
    port: 5432,
    database: 'rbm',
    user: 'elink',
	password: 'elink123'
};



// Create the database instance:
const db = pgp(config);

function findObjects(values) {
	let sql = "select o.objid,o.OBJTYPE,o.objmaster,ot.typename, otd.OBJTYPEDETNAME, od.value , otd.OBJTYPEDETTYPE " +
	    " from RBM_OBJECTS o, RBM_OBJ_DETAILS od,	RBM_OBJECT_TYPE ot,	RBM_OBJ_TYPE_DET otd " +
	    " where o.OBJID = od.OBJID and o.OBJTYPE = ot.OBJTYPEID and od.OBJTYPEDETID =otd.OBJTYPEDETID " +
	    " and o.objmaster = ${objId}";
  return this.db.any(sql, { objId: +values.userId});
}

		

module.exports = db;