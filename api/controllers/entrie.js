const pgp = require('pg-promise')(/*options*/);
const db = require('../connection/postgres');

var QRE = pgp.errors.QueryResultError;
var qrec = pgp.errors.queryResultErrorCode;


function getNestedChildren(arr, parent) {
    var out = []
    for(var i in arr) {
        if(arr[i].objmaster == parent) {
            var items = getNestedChildren(arr, arr[i].objid)

            if(items.length) {
                arr[i].items = items
            }
            out.push(arr[i])
        }
    }
    return out
}

exports.listEntry = function (req, res, next) {
  const userId = 0;//req.params.userId;
  var obj;
  
  let listSql = "SELECT x.objid,x.value,x.objtypedetname,x.objmaster FROM  (" +
    " WITH RECURSIVE conblock(objid, objmaster) AS ( "+
	"SELECT ro.objid, ro.objmaster "+
    "FROM rbm_objects ro "+ 
	"WHERE ro.objmaster = $1 and ro.objtype in (1,2)  "+
    "UNION ALL "+
    "SELECT m.objid, m.objmaster FROM rbm_objects m   "+
    "JOIN conblock ON conblock.objid = m.objmaster "+
    "WHERE m.objtype in (1,2) ) "+
   "SELECT cb.objid, rod.value, rotd.objtypedetname,cb.objmaster "+
   "FROM conblock cb, rbm_obj_details rod, rbm_obj_type_det rotd "+
   "WHERE	rod.objid = cb.objid  and rod.objtypedetid = rotd.objtypedetid) x";
   
	db.many(listSql, [userId])
	.then(entry=> {
		//console.log(entry)
		obj = getNestedChildren(entry,'0');
		//console.log(obj);
		return res.status(200).json({ entry: obj, message: '', error: '' });
		})
	.catch(error=> {
		console.log(error);
	   if (error instanceof QRE && error.code === qrec.noData) {
			res.status(200).json({ entry: obj, message: 'NO_DATE_FOUND', error: error });
			return next(error);
		} else {
			return next(error);
		}
	});
};

exports.viewEntry = function (req, res, next) {
  console.log(req.params);	
  const entryId = req.params.entryId;
  //let finUserSql = "select usrid,username as email, password, firstname, lastname from rbm_user where usrid = $1 ";
  	var obj;
	//db.one(finUserSql, [userId])
	//.then(user=> {
	//	if (req.user.email !== user.email) { 
	//		return res.status(401).json({ error: 'You are not authorized to view this user profile.' }); 
	//	} else {
	//		obj = {
	//			uid: user.usrid,
	//			email: user.email,
	//			password: null,
	//			firstName: user.firstname,
	//			lastName: user.lastname
	//		};
	//		return res.status(200).json({ user: obj });
	//	}
	//})
	//.catch(error=> {
	//   if (error instanceof QRE && error.code === qrec.noData) {
			res.status(200).json({ entry: obj, message: 'NO_DATE_FOUND' });
	//		return next(error);
	//	} else {
	//		return next(error);
	//	}
	//});
};


