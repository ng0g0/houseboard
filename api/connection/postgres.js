const pgp = require('pg-promise')(/*options*/);
const config = require('../../config/main');


var connectionString =  'postgres://elink:elink123@192.168.56.101/rbm';	
  ///if (process.env.NODE_ENV != config.test_env) {
    connectionString = config.connectionString;
  //} else{
//	connectionString = config.test_connectionString;
//  }
  console.log(`Postgres:  ${connectionString}.`); 
// Creating a new database instance from the connection details:
const db = pgp(connectionString);

// Exporting the database object for shared use:
module.exports = db;