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

exports.blockList = function (req, res, next) {
  const userId = req.user.uid;
  //console.log(req.user);
  var obj;
   
/*   
    let listSql = "SELECT x.objid,x.objmaster,x.actionX, array_to_json(x.objdetail) as details , x.typename FROM ( "+
    "  WITH RECURSIVE conblock(objid, objmaster, objtype, objdetail) AS ( "+
    "  SELECT ro.objid, ro.objmaster, ro.objtype , ro.objdetail "+
    "  FROM rbm_objects ro  "+
    "  WHERE ro.objmaster =0 and ro.objtype in (1,2)  and ro.objactive =1 "+
    "  UNION ALL  "+
    "  SELECT m.objid, m.objmaster, m.objtype, m.objdetail FROM rbm_objects m    "+
    "  JOIN conblock ON conblock.objid = m.objmaster "+
    "  WHERE m.objtype in (1,2) and m.objactive =1 )  "+
    "  SELECT cb.objid,cb.objmaster,rot.typename,  "+
    "  case when objtypeid = 1 then "+
    "  (select string_agg(rotX.typename, ',')||',INFOBLOCK,DELETE' actionX from rbm_object_type rotX where rotX.objtypemaster = rot.objtypeid) "+
    "  else 'INFO,DELETE' end as actionX, "+
    "  cb.objdetail "+
    "  FROM conblock cb, rbm_object_type rot, rbm_user u  "+
    "  where cb.objtype = rot.objtypeid  "+
    "  and ( (u.userobjects @> array_append(ARRAY[]::bigint[],cb.objid)) or u.usrrole = 1) "+
    "  and u.usrid = $1 ) x "+
    "  order by 1 ";
*/   
    let listSql = "SELECT x.objid,x.objmaster,x.actionX, x.objdetail as details , x.typename FROM (  "+
        " WITH RECURSIVE conblock(objid, objmaster, objtype, objdetail) AS (  "+  
        "  SELECT ro.objid, ro.objmaster, ro.objtype , ro.objdetail  "+  
        "  FROM rbm_objects ro  "+  
        "  WHERE ro.objmaster =0 and ro.objtype in (1,2)  and ro.objactive =1  "+  
        "  UNION ALL  "+   
        "  SELECT m.objid, m.objmaster, m.objtype, m.objdetail  "+
        "  FROM rbm_objects m  "+     
        "  JOIN conblock ON conblock.objid = m.objmaster  "+  
        "  WHERE m.objtype in (1,2) and m.objactive =1 )  "+  
        "  SELECT cb.objid,cb.objmaster,rot.typename,  "+
        "  case when objtypeid = 1 then  "+  
        "  (select string_agg(rotX.typename, ',')||',INFOBLOCK,DELETE' actionX from rbm_object_type rotX where rotX.objtypemaster = rot.objtypeid) "+
        "  else 'INFO,DELETE' end as actionX  "+
        "  ,'{'|| string_agg(  "+
        "  case when (t.dettype = rotd.objtypedetid) then '\"'||rotd.objtypedetname||'\":\"'||t.detname||'\"' else '\" \"'  end, ',') ||'}'  as objdetail  "+   
        "  FROM conblock cb, rbm_object_type rot, rbm_user u , UNNEST(cb.objdetail) as t(detname,dettype), rbm_obj_type_det rotd  "+    
        "  where cb.objtype = rot.objtypeid  "+   
        "  and ( (u.userobjects @> array_append(ARRAY[]::bigint[],cb.objid)) or u.usrrole = 1)  "+  
        "  and u.usrid = $1  "+
        "  and t.dettype = rotd.objtypedetid  "+
        "  group by cb.objid ,cb.objmaster,rot.typename,objtypeid ) x   order by 1  ";


//    console.log('after SQL');
   db.many(listSql, [userId])
	.then(blocks=> {
		obj = getNestedChildren(blocks,'0');
        console.log(obj);
		return res.status(200).json({ block: obj, message: '', error: '' });
		})
	.catch(error=> {
		console.log(error);
	   if (error instanceof QRE && error.code === qrec.noData) {
			res.status(200).json({ block: obj, message: 'NO_DATE_FOUND', error: error });
			return next(error);
		} else {
			return next(error);
		}
	});
  
};

exports.blockInfo = function (req, res, next) {
   console.log(req.params);
   const blockId = req.params.blockId;
    var obj;
    
    let blockInfoSql = " select  '{'|| string_agg(  "+
        " case when (det.dettype = rotd.objtypedetid) then '\"'||rotd.objtypedetname||'\":\"'||det.detname||'\"' "+ 
        " else '\" \"'  end, ',') ||'}' as details "+
        " from (select t.* from rbm_objects  det, UNNEST(objdetail) as t(detname,dettype) "+ 
        " where objid =$1) det, rbm_obj_type_det rotd "+ 
        " where det.dettype = rotd.objtypedetid ";

    db.one(blockInfoSql, [blockId])
	.then(blocks=> {
        console.log(blocks);
          var details = JSON.parse(blocks.details); 
          var address = details.ADDRESS.split("|")
        obj = {
            objid: blockId,
            name: details.NAME || '',
            city: address[2],
            country: address[0],
            distict: address[3],
            postCode: address[1],
            street: address[4],
            number: details.NUMBER
        };
        console.log(obj);
		return res.status(200).json({ block: obj, message: '', error: '' });
		})
	.catch(error=> {
		console.log(error);
	   if (error instanceof QRE && error.code === qrec.noData) {
			res.status(200).json({ block: obj, message: 'NO_DATE_FOUND', error: error });
			return next(error);
		} else {
			return next(error);
		}
	});
   
}

exports.blockDelete = function (req, res, next) {
    var obj;
//    console.log(req.params);
//    console.log(req.body.type);
    const blockId = req.params.blockId;
    const msg = (req.body.type === 'ENTRANCE') ? 'Entrance deleted successfully' : 'Block deleted successfully';
    
    let deleteSql = "update rbm_objects set objactive =0 where objid =$1";
    db.none(deleteSql, [blockId])
    .then(blocks=> {
        return res.status(200).json({ block: obj, message: msg });
    })
    .catch(error=> {
		console.log(error);
	   if (error instanceof QRE && error.code === qrec.noData) {
			res.status(200).json({ block: obj, message: 'NO_DATE_FOUND', error: error });
			return next(error);
		} else {
			return next(error);
		}
	});
    
    
}

exports.blockAdd = function (req, res, next) {
//    console.log(req.body);
    const userId = req.user.uid;
    var objid = req.body.objid;
    var obj;
    var details = [];

    if (req.body.city || req.body.country || req.body.distict || req.body.postCode || req.body.street) {
        let value = (req.body.country) ? `${req.body.country}|` : '|';
        value += (req.body.postCode) ? `${req.body.postCode}|` : '|';
        value += (req.body.city) ? `${req.body.city}|` : '|';
        value += (req.body.distict) ? `${req.body.distict}|` : '|';
        value += (req.body.street) ? `${req.body.street}` : '';
        details.push({type: 3, val: value})    
    }
    
    
    if (req.body.number) {
        let value = (req.body.number) ? `${req.body.number}` : '';
        details.push({type: 4, val: value})    
    }
    
    if (req.body.name) {
        details.push({type: 8, val: req.body.name})    
    }
//    console.log(details);
//    console.log(req.body.objid);
    
    if (!objid) {
//        console.log('INSERT');
        const queries = [];
        db.tx(t => { // automatic BEGIN
                let addBlockSql = "insert into rbm_objects(objtype,objmaster, objactive) values((select objtypeid from rbm_object_type where typename = 'BLOCK'),0,1) RETURNING objid";
                queries.push(t.one(addBlockSql)
                    .then(data => {
                        details.forEach((det) => {
                            let addDetaild = "update rbm_objects set objdetail = array_append(objdetail, CAST(ROW($2,$3) as objdetils)) where objid = $1";
                            //let addDetaild = "insert into rbm_obj_details(objid,objtypedetid,value) values($1,$2, $3)";
                            queries.push(t.none(addDetaild, [data.objid, det.val, det.type]));
                            let addtoUser = " update rbm_user set userobjects = array_append(userobjects::bigint[], CAST($1 AS BIGINT)) where usrid = $2";
                            queries.push(t.none(addtoUser, [data.objid, userId]));
                        });
                    })
                );
                return t.batch(queries);
            })
        .then(data => {
            return res.status(200).json({ block: obj, message: 'New Block items was added successfully' });
        })
        .catch(error => {
            return res.status(200).json({ block: obj, error: error});
        });
    } else {
//        console.log('UPDATE');
        const queries = [];
        db.tx(t => { // automatic BEGIN
            var rec = 0;
            details.forEach((det) => {
                rec ++;
                let addDetaild = "update rbm_objects set objdetail = array_append(case when $4=1 then  null else objdetail end, CAST(ROW($3,$2) as objdetils)) where objid = $1";
                //let addDetaild = "update rbm_obj_details set value =$3 where objid =$1 and objtypedetid =$2";
                queries.push(t.none(addDetaild, [objid, det.type, det.val, rec]));
            });
            return t.batch(queries);
        })
        .then(data => {
            return res.status(200).json({ block: obj, message: 'Block items was updated successfully'});
        })
        .catch(error => {
            return res.status(200).json({ block: obj, error: error});
        });
    }    
};


