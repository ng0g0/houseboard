"use strict";

let db = require('./pghelper');

//let escape = s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
//values.push(escape(search));


let findObjects = (req, res, next) => {
	let id = req.query.id;
	let countSql = "SELECT COUNT(*) from RBM_OBJECTS o where  o.objmaster = $1";

	let sql = "select o.objid,o.OBJTYPE,o.objmaster,ot.typename, otd.OBJTYPEDETNAME, od.value , otd.OBJTYPEDETTYPE " +
	    " from RBM_OBJECTS o, RBM_OBJ_DETAILS od,	RBM_OBJECT_TYPE ot,	RBM_OBJ_TYPE_DET otd " +
	    " where o.OBJID = od.OBJID and o.OBJTYPE = ot.OBJTYPEID and od.OBJTYPEDETID =otd.OBJTYPEDETID " +
	    " and o.objmaster = $1";

    db.query(countSql, [id])
        .then(result => {
            let total = parseInt(result[0].count);
            db.query(sql, [id])
                .then(products => {
                    return res.json({"total": total, "products": products});
                })
                .catch(next);
        })
        .catch(next);
};

let findObjectMaster = (req, res, next) => {
	let id = req.params.id;
	let countSql = "SELECT COUNT(*) from RBM_OBJECTS o where  o.objmaster = $1";

	let sql = "select o.objid,o.OBJTYPE,o.objmaster,ot.typename, otd.OBJTYPEDETNAME, od.value , otd.OBJTYPEDETTYPE " +
	    " from RBM_OBJECTS o, RBM_OBJ_DETAILS od,	RBM_OBJECT_TYPE ot,	RBM_OBJ_TYPE_DET otd " +
	    " where o.OBJID = od.OBJID and o.OBJTYPE = ot.OBJTYPEID and od.OBJTYPEDETID =otd.OBJTYPEDETID " +
	    " and o.objmaster = $1";

    db.query(countSql, [id])
        .then(result => {
            let total = parseInt(result[0].count);
            db.query(sql, [id])
                .then(products => {
                    return res.json({"total": total, "products": products});
                })
                .catch(next);
        })
        .catch(next);
};

exports.findObjectMaster = findObjectMaster;
exports.findObjects = findObjects;