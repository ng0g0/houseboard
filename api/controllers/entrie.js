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
/*
exports.listEntry = function (req, res, next) {
  const userId = 0;//req.params.userId;
  var obj;

	
	let listSql = "SELECT x.objid,x.value,x.objtypedetname,x.objmaster, x.typename, x.actionX FROM ( "+
    "  WITH RECURSIVE conblock(objid, objmaster, objtype) AS ( "+
    "  SELECT ro.objid, ro.objmaster, ro.objtype "+
    "  FROM rbm_objects ro  "+
    " WHERE ro.objmaster =$1 and ro.objtype in (1,2)  "+
    "  UNION ALL "+
    "  SELECT m.objid, m.objmaster, m.objtype FROM rbm_objects m   "+
    "  JOIN conblock ON conblock.objid = m.objmaster "+
    "  WHERE m.objtype in (1,2) ) "+
    "  SELECT cb.objid, rod.value, rotd.objtypedetname,cb.objmaster,rot.typename, "+
    "  case when objtypeid = 1 then "+
    "  (select string_agg(rotX.typename, ',')||',INFOLAYER,DELETE' actionX from rbm_object_type rotX "+
	"  where rotX.objtypemaster = rot.objtypeid  and objactive = 1 ) "+
    "  else 'INFOLINK,DELETE' end "+
    "   as actionX "+
    "  FROM conblock cb, rbm_obj_details rod, rbm_obj_type_det rotd, rbm_object_type rot "+
    "  WHERE	rod.objid = cb.objid  "+
    "  and cb.objtype = rot.objtypeid "+
    "  and rod.objtypedetid = rotd.objtypedetid) x ";
	
    
    let listSql = "SELECT x.objid,x.objmaster,x.actionX,x.details FROM (  "+
    "  WITH RECURSIVE conblock(objid, objmaster, objtype) AS (  "+
    "  SELECT ro.objid, ro.objmaster, ro.objtype  "+
    "  FROM rbm_objects ro   "+
    "  WHERE ro.objmaster =$1 and ro.objtype in (1,2)   "+
    "  UNION ALL  "+
    "  SELECT m.objid, m.objmaster, m.objtype FROM rbm_objects m    "+
    "  JOIN conblock ON conblock.objid = m.objmaster  "+
    "  WHERE m.objtype in (1,2) )  "+
    "  SELECT cb.objid,cb.objmaster,  "+
    "  case when objtypeid = 1 then  "+
    "  (select string_agg(rotX.typename, ',')||',INFOBLOCK,DELETE' actionX from rbm_object_type rotX where rotX.objtypemaster = rot.objtypeid) "+
    "  else 'INFO,DELETE' end as actionX, "+
    "  (select  '{'|| string_agg( case when (det.objtypedetid = rotd.objtypedetid) then '\"'||rotd.objtypedetname||'\":\"'||det.value||'\"' else '\" \"'  end, ',') ||'}'  "+
    "  from rbm_obj_details  det , rbm_obj_type_det rotd  where objid =cb.objid and det.objtypedetid = rotd.objtypedetid) as details "+ 
    "  FROM conblock cb, rbm_object_type rot "+ 
    "  where cb.objtype = rot.objtypeid ) x "; 
    
    

   db.many(listSql, [userId])
	.then(entry=> {
		obj = getNestedChildren(entry,'0');
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
	  
  //}).catch(error=> {
//		console.log(error);
//	   if (error instanceof QRE && error.code === qrec.noData) {
//			res.status(200).json({ entry: obj, message: 'NO_DATE_FOUND', error: error });
//			return next(error);
//		} else {
//			return next(error);
//		}
//	});
  
  
};*/

exports.viewEntry = function (req, res, next) {
  console.log(req.params);	
  const blockid = req.params.entryId;
  var obj;	
  let objSql = "SELECT objmaster,objid from rbm_objects where objid = $1";
  	db.one(objSql, [blockid])
	.then(object=> {
		console.log(object);	
		console.log(object.objmaster);
		/*
		let viewSql = "SELECT x.objid,x.value,x.objtypedetname,x.objmaster, x.typename, x.actionX FROM (  "+
 		" WITH RECURSIVE conblock(objid, objmaster, objtype) AS (  "+
 		" SELECT ro.objid, ro.objmaster, ro.objtype   "+
 		" FROM rbm_objects ro    "+
 		" WHERE ro.objid = $1 and ro.objtype in (2,3,4,7,8,9)    "+
 		" UNION ALL   "+
 		" SELECT m.objid, m.objmaster, m.objtype FROM rbm_objects m     "+
 		" JOIN conblock ON conblock.objid = m.objmaster   "+
 		" WHERE m.objtype in (2,3,4,7,8,9) )   "+
 		" SELECT cb.objid, rod.value, rotd.objtypedetname,cb.objmaster,rot.typename,  "+
 		" (select string_agg(rotX.typename, ',') actionX "+
		" from rbm_object_type rotX where rotX.objtypemaster = rot.objtypeid  and objactive = 1) || "+
		"  ',INFOLAYER,DELETE' as actionX "+
  		" FROM conblock cb, rbm_obj_details rod, rbm_obj_type_det rotd, rbm_object_type rot "+
 		" WHERE	rod.objid = cb.objid    "+
 		" and cb.objtype = rot.objtypeid  "+
 		" and rod.objtypedetid = rotd.objtypedetid ) x  ";
        */
        let viewSql = "SELECT x.objid,x.objmaster, x.actionX, x.details FROM ( "+ 
 		"  WITH RECURSIVE conblock(objid, objmaster, objtype) AS (  "+
 		"  SELECT ro.objid, ro.objmaster, ro.objtype   "+
 		"  FROM rbm_objects ro    "+
 		"  WHERE ro.objid = $1 and ro.objtype in (2,3,4,7,8,9)    "+
 		"  UNION ALL   "+
 		"  SELECT m.objid, m.objmaster, m.objtype FROM rbm_objects m     "+
 		"  JOIN conblock ON conblock.objid = m.objmaster   "+
 		"  WHERE m.objtype in (2,3,4,7,8,9) )   "+
 		"  SELECT cb.objid,cb.objmaster,   "+
 		"  (select string_agg(rotX.typename, ',') actionX from rbm_object_type rotX where rotX.objtypemaster = rot.objtypeid and objactive = 1) ||  "+
 		"  case when objtypeid = 2 then ',INFO,DELETE' when objtypeid = 3 then ',FLOORINFO,DELETE' when objtypeid = 4 then ',APINFO,DELETE'  "+
 		"  else ',INFO,DELETE' end  as actionX ,  "+
 		"  (select  '{'|| string_agg( case when (det.objtypedetid = rotd.objtypedetid) then '\"'||rotd.objtypedetname||'\":\"'||det.value||'\"' else '\" \"'  end, ',') ||'}'  "+
 		"  from rbm_obj_details  det , rbm_obj_type_det rotd  where objid =cb.objid and det.objtypedetid = rotd.objtypedetid) as details  "+
 		"   FROM conblock cb, rbm_object_type rot  "+
 		"  WHERE	cb.objtype = rot.objtypeid ) x   ";

		db.many(viewSql, [object.objid])
		.then(entry=> {
			console.log(entry)
			obj = getNestedChildren(entry,object.objmaster);
			
			return res.status(200).json({ entry: obj });
		})
		.catch(error=> {
		   if (error instanceof QRE && error.code === qrec.noData) {
				res.status(200).json({ entry: obj, message: 'NO_DATE_FOUND' });
				return next(error);
			} else {
				return next(error);
			}
		});
	})
	.catch(error=> {
	   if (error instanceof QRE && error.code === qrec.noData) {
			res.status(200).json({ entry: obj, message: 'NO_DATE_FOUND' });
			return next(error);
		} else {
			return next(error);
		}
	});
  
  
};


