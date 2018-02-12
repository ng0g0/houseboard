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
        let viewSql = "SELECT x.objid,x.objmaster, x.actionX, x.details,x.typename FROM ( "+ 
 		"  WITH RECURSIVE conblock(objid, objmaster, objtype) AS (  "+
 		"  SELECT ro.objid, ro.objmaster, ro.objtype   "+
 		"  FROM rbm_objects ro    "+
 		"  WHERE ro.objid = $1 and ro.objtype in (2,3,4,7,8,9)   and ro.objactive =1   "+
 		"  UNION ALL   "+
 		"  SELECT m.objid, m.objmaster, m.objtype FROM rbm_objects m     "+
 		"  JOIN conblock ON conblock.objid = m.objmaster   "+
 		"  WHERE m.objtype in (2,3,4,7,8,9) and m.objactive =1 )   "+
 		"  SELECT cb.objid,cb.objmaster,rot.typename,   "+
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

exports.entryAdd = function (req, res, next) {
    console.log(req.body);
    var objid = req.body.objid;
    var obj;
    var details = [];
  
    if (req.body.number) {
        let value = (req.body.number) ? `${req.body.number}` : '';
        details.push({type: 4, val: value})    
    }
    
    if (req.body.name) {
        details.push({type: 8, val: req.body.name})    
    }
    console.log(details);
    
    console.log(req.body.objid);
    
    //if (!objid) {
        console.log('INSERT');
        const queries = [];
        db.tx(t => { // automatic BEGIN
                let addBlockSql = "insert into rbm_objects(objtype,objmaster, objactive) values((select objtypeid from rbm_object_type where typename = 'ENTRANCE'),$1,1) RETURNING objid";
                queries.push(t.one(addBlockSql,[objid])
                    .then(data => {
                        details.forEach((det) => {
                            let addDetaild = "insert into rbm_obj_details(objid,objtypedetid,value) values($1,$2, $3)";
                            queries.push(t.none(addDetaild, [data.objid, det.type, det.val]));
                        });
                    })
                );
                return t.batch(queries);
            })
        .then(data => {
            return res.status(200).json({ block: obj, message: 'New Entrance was added successfully' });
        })
        .catch(error => {
            return res.status(200).json({ block: obj, error: error});
        });
    //} else {
    //    console.log('UPDATE');
    //    const queries = [];
    //    db.tx(t => { // automatic BEGIN
    //        details.forEach((det) => {
    //            let addDetaild = "update rbm_obj_details set value =$3 where objid =$1 and objtypedetid =$2";
    //            queries.push(t.none(addDetaild, [objid, det.type, det.val]));
    //        });
    //        return t.batch(queries);
    //    })
    //    .then(data => {
    //        return res.status(200).json({ block: obj, message: 'Block items was updated successfully'});
    //    })
    //    .catch(error => {
    //        return res.status(200).json({ block: obj, error: error});
    //    });
    //}    
};



