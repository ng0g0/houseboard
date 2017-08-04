'use strict';



/*
 This repository mixes hard-coded and dynamic SQL, primarily to show a diverse example of using both.
 */
	let sql = "select o.objid,o.OBJTYPE,o.objmaster,ot.typename, otd.OBJTYPEDETNAME, od.value , otd.OBJTYPEDETTYPE " +
	    " from RBM_OBJECTS o, RBM_OBJ_DETAILS od,	RBM_OBJECT_TYPE ot,	RBM_OBJ_TYPE_DET otd " +
	    " where o.OBJID = od.OBJID and o.OBJTYPE = ot.OBJTYPEID and od.OBJTYPEDETID =otd.OBJTYPEDETID " +
	    " and o.objmaster = ${objId}";

 
 
class ObjectRepository {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
    }


    // Tries to delete a product by id, and returns the number of records deleted;
//    remove(id) {
//        return this.db.result('DELETE FROM products WHERE id = $1', +id, r => r.rowCount);
//    }

    // Tries to find a user product from user id + product name;
    find(values) {
        return this.db.manyOrNone(sql, {
            objId: +values.objId
        });
    }

}  

/*
    And if you prefer object prototyping instead, it will work the same.
    EXAMPLE:
    ProductsRepository.prototype.all = function () {
        return this.db.any('SELECT * FROM products');
    }
*/

module.exports = ObjectRepository;