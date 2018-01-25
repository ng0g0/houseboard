DROP TABLE rbm_user;
create table rbm_user (
	usrid serial8,
	username varchar(32) NOT NULL,
	password varchar(128) NOT NULL,
	firstname varchar(128) NOT NULL,
	lastname varchar(128) NOT NULL,
	userToken varchar(128),
	userExpires Date,
	active int4,
	CONSTRAINT rbm_username_key UNIQUE (username) 
);

insert into rbm_user(username, password, firstname , lastname) values ('admin', 'pass', 'Admin', 'User');

DROP TABLE 	 rbm_obj_details;

CREATE TABLE rbm_obj_details (
	objdetid serial8 NOT NULL,
	objid int4 NOT NULL,
	objtypedetid int4 NOT NULL,
	value varchar(64) NOT NULL
);

DROP TABLE 	 rbm_object_type;
CREATE TABLE rbm_object_type (
	objtypeid int4 NOT NULL,
	typename varchar(32) NOT NULL,
	objactive int4 NOT NULL,
	objtypemaster int4 NULL,
	objshort bpchar(1) NOT NULL,
	CONSTRAINT rbm_object_type_objshort_key UNIQUE (objshort)
);

DROP TABLE 	 rbm_obj_type_det;

CREATE TABLE rbm_obj_type_det (
	objtypedetid int4 NOT NULL,
	objtypedetname varchar(16) NOT NULL,
	objtypedettype int2 NOT NULL,
	visible varchar(32) NOT NULL
);

DROP TABLE 	 rbm_objects;
CREATE TABLE rbm_objects (
	objid serial8,
	objtype int4 NOT NULL,
	objmaster int4 NOT NULL,
	objactive int4 NOT NULL
);

select rod.objid, 
rod.value, rotd.objtypedetname
from rbm_obj_details rod, 
	 rbm_obj_type_det rotd, 
	 rbm_objects ro
where rod.objid = ro.objid 
and rod.objtypedetid = rotd.objtypedetid
and objmaster = 0

SELECT ro.objid, ro.objmaster
   FROM rbm_objects ro
  START WITH ro.objmaster = 0
CONNECT BY PRIOR ro.objid = ro.objmaster

WITH RECURSIVE conblock AS (SELECT ro.objid, ro.objmaster
                       FROM rbm_objects ro
                      WHERE ro.objmaster = 0 and ro.objtype in (1,2) 
                      UNION ALL
                     SELECT m.objid, m.objmaster
                       FROM rbm_objects m  
                       JOIN conblock ON conblock.objid = m.objmaster
                       where m.objtype in (1,2)
                       )
        SELECT cb.objid, rod.value, rotd.objtypedetname
        FROM conblock cb, 
        	rbm_obj_details rod, 
	 		rbm_obj_type_det rotd
	 	WHERE	rod.objid = cb.objid 
		and rod.objtypedetid = rotd.objtypedetid
        
        
        
        
        
        

select * from rbm_objects ro 
where ro.objmaster= 1



select * from rbm_objects

INSERT INTO rbm_obj_details (objdetid,objid,objtypedetid,value) VALUES (1,1,3,'Sofia, 1510, 18 Lyaskovets street');
INSERT INTO rbm_obj_details (objdetid,objid,objtypedetid,value) VALUES (2,2,4,'1');
INSERT INTO rbm_obj_details (objdetid,objid,objtypedetid,value) VALUES (4,3,4,'1');
INSERT INTO rbm_obj_details (objdetid,objid,objtypedetid,value) VALUES (5,3,4,'2');
INSERT INTO rbm_obj_details (objdetid,objid,objtypedetid,value) VALUES (3,3,4,'0');
INSERT INTO rbm_obj_details (objdetid,objid,objtypedetid,value) VALUES (6,6,3,'Sofia, 1510, 156 Angel Voivoda street');

INSERT INTO rbm_obj_type_det (objtypedetid,objtypedetname,objtypedettype,visible) VALUES (1,'MAX',1,'n');
INSERT INTO rbm_obj_type_det (objtypedetid,objtypedetname,objtypedettype,visible) VALUES (2,'SIZE',1,'a');
INSERT INTO rbm_obj_type_det (objtypedetid,objtypedetname,objtypedettype,visible) VALUES (3,'ADDRESS',2,'b');
INSERT INTO rbm_obj_type_det (objtypedetid,objtypedetname,objtypedettype,visible) VALUES (4,'NUMBER',2,'be');
INSERT INTO rbm_obj_type_det (objtypedetid,objtypedetname,objtypedettype,visible) VALUES (5,'BDAY',3,'p');
INSERT INTO rbm_obj_type_det (objtypedetid,objtypedetname,objtypedettype,visible) VALUES (6,'AGE',1,'p');
INSERT INTO rbm_obj_type_det (objtypedetid,objtypedetname,objtypedettype,visible) VALUES (7,'PET',4,'p');
INSERT INTO rbm_obj_type_det (objtypedetid,objtypedetname,objtypedettype,visible) VALUES (8,'NAME',2,'ptivw');

INSERT INTO rbm_object_type (objtypeid,typename,objactive,objtypemaster,objshort) VALUES (1,'BLOCK',1,0,'b');
INSERT INTO rbm_object_type (objtypeid,typename,objactive,objtypemaster,objshort) VALUES (2,'ENTRANCE',1,1,'e');
INSERT INTO rbm_object_type (objtypeid,typename,objactive,objtypemaster,objshort) VALUES (3,'FLOOR',1,2,'f');
INSERT INTO rbm_object_type (objtypeid,typename,objactive,objtypemaster,objshort) VALUES (4,'APARTMENT',1,3,'a');
INSERT INTO rbm_object_type (objtypeid,typename,objactive,objtypemaster,objshort) VALUES (5,'PERSON',1,4,'p');
INSERT INTO rbm_object_type (objtypeid,typename,objactive,objtypemaster,objshort) VALUES (6,'ACOM-BL',1,1,'t');
INSERT INTO rbm_object_type (objtypeid,typename,objactive,objtypemaster,objshort) VALUES (7,'ACOM-ENT',1,2,'v');
INSERT INTO rbm_object_type (objtypeid,typename,objactive,objtypemaster,objshort) VALUES (8,'ACOM-FL',1,3,'i');
INSERT INTO rbm_object_type (objtypeid,typename,objactive,objtypemaster,objshort) VALUES (9,'ACOM-AP',1,4,'w');

INSERT INTO rbm_objects (objid,objtype,objmaster,objactive) VALUES (1,1,0,1);
INSERT INTO rbm_objects (objid,objtype,objmaster,objactive) VALUES (2,2,1,1);
INSERT INTO rbm_objects (objid,objtype,objmaster,objactive) VALUES (3,3,2,1);
INSERT INTO rbm_objects (objid,objtype,objmaster,objactive) VALUES (4,3,2,1);
INSERT INTO rbm_objects (objid,objtype,objmaster,objactive) VALUES (5,3,2,1);


select * from rbm_objects where objtype = 1

{
objid: 1,

}

