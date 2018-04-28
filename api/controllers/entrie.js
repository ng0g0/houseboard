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
        /*let viewSql = "SELECT x.objid,x.objmaster, x.actionX, x.details,x.typename FROM ( "+ 
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
 		"  case when objtypeid = 2 then ',INFOENTRY,DELETE' when objtypeid = 3 then ',FLOORINFO,DELETE' when objtypeid = 4 then ',APINFO,DELETE'  "+
 		"  else ',INFO,DELETE' end  as actionX ,  "+
 		"  (select  '{'|| string_agg( case when (det.objtypedetid = rotd.objtypedetid) then '\"'||rotd.objtypedetname||'\":\"'||det.value||'\"' else '\" \"'  end, ',') ||'}'  "+
 		"  from rbm_obj_details  det , rbm_obj_type_det rotd  where objid =cb.objid and det.objtypedetid = rotd.objtypedetid) as details  "+
 		"   FROM conblock cb, rbm_object_type rot  "+
 		"  WHERE	cb.objtype = rot.objtypeid ) x   ";
        */
        
        let viewSql = "SELECT x.objid,x.objmaster, x.actionX, x.objdetail as details, x.typename FROM ( "+
        "  WITH RECURSIVE conblock(objid, objmaster, objtype, objdetail) AS (  "+ 
        "  SELECT ro.objid, ro.objmaster, ro.objtype, ro.objdetail  "+  
        "  FROM rbm_objects ro  "+  
        "  WHERE ro.objid = $1 and ro.objtype in (2,3,4,7,8,9)   and ro.objactive =1  "+  
        "  UNION ALL    "+
        "  SELECT m.objid, m.objmaster, m.objtype, m.objdetail "+
        "  FROM rbm_objects m JOIN conblock ON conblock.objid = m.objmaster  "+  
        "  WHERE m.objtype in (2,3,4,7,8,9) and m.objactive =1 )  "+  
        "  SELECT cb.objid,cb.objmaster,rot.typename,  "+  
        "  (select string_agg(rotX.typename, ',') actionX from rbm_object_type rotX where rotX.objtypemaster = rot.objtypeid and objactive = 1) || "+  
        "  case when objtypeid = 2 then ',INFOENTRY,DELETE' when objtypeid = 3 then ',FLOORINFO,DELETE' when objtypeid = 4 then ',APINFO,DELETE' "+  
        "  else ',INFO,DELETE' end  as actionX, "+ 
        "  '{'|| string_agg( case when (t.dettype = rotd.objtypedetid) then '\"'||rotd.objtypedetname||'\":\"'||t.detname||'\"' else '\" \"'  end, ',')||'}'  as objdetail "+ 
        "  FROM conblock cb, rbm_object_type rot , UNNEST(cb.objdetail) as t(detname,dettype) "+ 
        "  , rbm_obj_type_det rotd "+ 
        "  WHERE	cb.objtype = rot.objtypeid "+ 
        "  and t.dettype = rotd.objtypedetid "+ 
        "  group by cb.objid ,cb.objmaster,rot.typename,objtypeid ) x order by 1";

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
                        console.log(`ENTRANCE ID = ${data.objid}`);
                        details.forEach((det) => {
                            let addDetaild = "update rbm_objects set objdetail = array_append(objdetail, CAST(ROW($2,$3) as objdetils)) where objid = $1";
                            //let addDetaild = "insert into rbm_obj_details(objid,objtypedetid,value) values($1,$2, $3)";
                            queries.push(t.none(addDetaild, [data.objid, det.val, det.type]));
                        });
                        let addFloorSql = "insert into rbm_objects(objtype,objmaster, objactive,objdetail) "+
                                                " values((select objtypeid from rbm_object_type where typename = 'FLOOR'),$1,1,ARRAY[CAST(ROW($2,4) as objdetils)])";
                                    queries.push(t.none(addFloorSql,[data.objid, 0]));
                        
                        //var detailsFloor = [];
                        //detailsFloor.push({type: 4, val: 0 });
                        //let addFloorSql = "insert into rbm_objects(objtype,objmaster, objactive) values((select objtypeid from rbm_object_type where typename = 'FLOOR'),$1,1) RETURNING objid"
                        //queries.push(t.one(addFloorSql,[data.objid])
                        //    .then(floor => {
                        //        console.log(`FLOOR ID = ${floor.objid}`);
                        //        detailsFloor.forEach((detf) => {
                        //            let addDetaildfloor = "update rbm_objects set objdetail = array_append(objdetail, CAST(ROW($2,$3) as objdetils)) where objid = $1";
                        //           // let addDetaildfloor = "insert into rbm_obj_details(objid,objtypedetid,value) values($1,$2,$3)";
                        //            queries.push(t.none(addDetaildfloor, [floor.objid, detf.val, detf.type]));    
                        //        });
                        //    })
                        //);
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
};


exports.updateAppartment = function (req, res, next) {
   console.log('BODY');
   console.log(req.body);
   console.log('PARAMS');
   console.log(req.params);
   var obj;
   return res.status(200).json({ block: obj, message: 'Appartment was updated' });
   
} 

exports.apartmentInfo = function (req, res, next) {
   console.log('BODY');
   console.log(req.body);
   console.log('PARAMS');
   console.log(req.params);
   var obj;
   return res.status(200).json({ block: obj, message: 'Appartment was updated' });
   
}   

exports.updateFloor = function (req, res, next) {
   console.log('BODY');
   console.log(req.body);
   console.log('PARAMS');
   console.log(req.params);
    var obj;
   var floors = req.body.props.floors;
   var objid = req.body.props.objid;
   console.log(`MASTER ID = ${objid}`);
   const queries = [];
    db.tx(t => { // automatic BEGIN
    //    console.log('BEGIN TX');
    //    floors.forEach((flo) => {
    //        console.log(flo.NUMBER);

           var inputFloors =  [];
           floors.map(flo => { 
             inputFloors.push(flo.NUMBER);
           });
           console.log(inputFloors);
            
            let checkFloorSql = "select COALESCE(indata.detname,dbdata.detname ) as detname, "+
                " COALESCE(indata.dettype, dbdata.dettype ) as dettype, dbdata.objid, "+
                " case when dbdata.objid is null then 1 WHEN indata.detname is null then -1 "+
                " else 0 end as actionX from (  "+
                " select t.*,4 as dettype, null as  objid from UNNEST(ARRAY[$2]) as t(detname)) indata FULL OUTER JOIN ( "+
                " select t.*, det.objid from rbm_objects  det, UNNEST(objdetail) as t(detname,dettype)  "+
                " where objmaster = $1 and objactive = 1) dbdata on indata.detname = dbdata.detname "; 
                t.any(checkFloorSql,[objid, inputFloors])
                .then(data => {
                    console.log(data);
                    data.forEach((flo) => {
                        switch (flo.actionx) {
                            case 1: 
                                    let addFloorSql = "insert into rbm_objects(objtype,objmaster, objactive,objdetail) "+
                                                " values((select objtypeid from rbm_object_type where typename = 'FLOOR'),$1,1,ARRAY[CAST(ROW($2,4) as objdetils)])";
                                    queries.push(t.none(addFloorSql,[objid, flo.detname]));
                                console.log(`ADDED ${flo.detname} FLOOR `);    
                                break;
                            case -1: 
                                let delFloor = "update rbm_objects set objactive = 0 where objid = $1";
                                queries.push(t.none(delFloor, [flo.objid]));
                                console.log(`DELETE ${flo.objid} `);
                                break;
                            default: 
                                console.log(`EXIST FLOOR: ${flo.detname}`);
                                break;
                        }
                    })
                    
                });
        return t.batch(queries);
    })
    .then(data => {
        console.log('OK');
        console.log(data);
        return res.status(200).json({ block: obj, message: 'Floors was updated' });
    })
    .catch(error => {
        console.log(error);
        return res.status(200).json({ block: obj, error: error});
    });
   
}



