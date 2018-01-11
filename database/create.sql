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

update rbm_user 
set  resetPasswordToken = 'aaaa',
 resetPasswordExpires = NOW() + interval '1 hour'
where 	username = 'ng0g0@yahoo.com'	 
 
		 

CREATE TABLE rbm_obj_details (
	objdetid serial8 NOT NULL,
	objid int4 NOT NULL,
	objtypedetid int4 NOT NULL,
	value varchar(64) NOT NULL
);

CREATE TABLE rbm_object_type (
	objtypeid int4 NOT NULL,
	typename varchar(32) NOT NULL,
	objactive int4 NOT NULL,
	objtypemaster int4 NULL,
	objshort bpchar(1) NOT NULL,
	CONSTRAINT rbm_object_type_objshort_key UNIQUE (objshort)
);

CREATE TABLE rbm_obj_type_det (
	objtypedetid int4 NOT NULL,
	objtypedetname varchar(16) NOT NULL,
	objtypedettype int2 NOT NULL,
	visible varchar(32) NOT NULL
);

CREATE TABLE rbm_objects (
	objid serial8,
	objtype int4 NOT NULL,
	objmaster int4 NOT NULL,
	objactive int4 NOT NULL
);

INSERT INTO rbm_obj_details (objdetid,objid,objtypedetid,value) VALUES (
1,1,3,'Sofia, 1510, 18 Lyaskovets street');
INSERT INTO rbm_obj_details (objdetid,objid,objtypedetid,value) VALUES (
2,2,4,'1');
INSERT INTO rbm_obj_details (objdetid,objid,objtypedetid,value) VALUES (
4,3,4,'1');
INSERT INTO rbm_obj_details (objdetid,objid,objtypedetid,value) VALUES (
5,3,4,'2');
INSERT INTO rbm_obj_details (objdetid,objid,objtypedetid,value) VALUES (
3,3,4,'0');
INSERT INTO rbm_obj_details (objdetid,objid,objtypedetid,value) VALUES (
6,6,3,'Sofia, 1510, 156 Angel Voivoda street');

INSERT INTO rbm_obj_type_det (objtypedetid,objtypedetname,objtypedettype,visible) VALUES (
1,'MAX',1,'n');
INSERT INTO rbm_obj_type_det (objtypedetid,objtypedetname,objtypedettype,visible) VALUES (
2,'SIZE',1,'a');
INSERT INTO rbm_obj_type_det (objtypedetid,objtypedetname,objtypedettype,visible) VALUES (
3,'ADDRESS',2,'b');
INSERT INTO rbm_obj_type_det (objtypedetid,objtypedetname,objtypedettype,visible) VALUES (
4,'NUMBER',2,'be');
INSERT INTO rbm_obj_type_det (objtypedetid,objtypedetname,objtypedettype,visible) VALUES (
5,'BDAY',3,'p');
INSERT INTO rbm_obj_type_det (objtypedetid,objtypedetname,objtypedettype,visible) VALUES (
6,'AGE',1,'p');
INSERT INTO rbm_obj_type_det (objtypedetid,objtypedetname,objtypedettype,visible) VALUES (
7,'PET',4,'p');
INSERT INTO rbm_obj_type_det (objtypedetid,objtypedetname,objtypedettype,visible) VALUES (
8,'NAME',2,'ptivw');

INSERT INTO rbm_object_type (objtypeid,typename,objactive,objtypemaster,objshort) VALUES (
1,'BLOCK',1,0,'b');
INSERT INTO rbm_object_type (objtypeid,typename,objactive,objtypemaster,objshort) VALUES (
2,'ENTRANCE',1,1,'e');
INSERT INTO rbm_object_type (objtypeid,typename,objactive,objtypemaster,objshort) VALUES (
3,'FLOOR',1,2,'f');
INSERT INTO rbm_object_type (objtypeid,typename,objactive,objtypemaster,objshort) VALUES (
4,'APARTMENT',1,3,'a');
INSERT INTO rbm_object_type (objtypeid,typename,objactive,objtypemaster,objshort) VALUES (
5,'PERSON',1,4,'p');
INSERT INTO rbm_object_type (objtypeid,typename,objactive,objtypemaster,objshort) VALUES (
6,'ACOM-BL',1,1,'t');
INSERT INTO rbm_object_type (objtypeid,typename,objactive,objtypemaster,objshort) VALUES (
7,'ACOM-ENT',1,2,'v');
INSERT INTO rbm_object_type (objtypeid,typename,objactive,objtypemaster,objshort) VALUES (
8,'ACOM-FL',1,3,'i');
INSERT INTO rbm_object_type (objtypeid,typename,objactive,objtypemaster,objshort) VALUES (
9,'ACOM-AP',1,4,'w');

INSERT INTO public.rbm_objects (objid,objtype,objmaster,objactive) VALUES (
1,1,0,1);
INSERT INTO public.rbm_objects (objid,objtype,objmaster,objactive) VALUES (
2,2,1,1);
INSERT INTO public.rbm_objects (objid,objtype,objmaster,objactive) VALUES (
3,3,2,1);
INSERT INTO public.rbm_objects (objid,objtype,objmaster,objactive) VALUES (
4,3,2,1);
INSERT INTO public.rbm_objects (objid,objtype,objmaster,objactive) VALUES (
5,3,2,1);



