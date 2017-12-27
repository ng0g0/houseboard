//var pgp = require('pg-promise')(/*options*/);

var test_connectionString = 'postgres://elink:elink123@192.168.56.101/rbm';
var prod_connectionString = 'postgres://rrfcffhsalqnly:6b596e4fd06c6a808f1c99ddec492ff92320bc77b3b6d208125bfe1a3b0a555e@ec2-54-247-177-33,eu-west-1,compute,amazonaws,com:5432/d24mflhkuq27nd';

var test_env = 'test';

//global.FOO = 5;

//console.log(process.env.npm_package_run);

module.exports = {
  // Secret key for JWT signing and encryption
  secret: 'super secret passphrase',
  // Database connection information
  //database: 'mongodb://localhost:27017',
  // Setting port for server
  api_port: (process.env.npm_package_run == test_env)? 80: 80,
  client_port: (process.env.npm_package_run == test_env)? 80: 80,
  app_url:(process.env.npm_package_run == test_env)? 'http://localhost': 'http://houseboard.herokuapp.com',
  connectionString: (process.env.npm_package_run == test_env)? test_connectionString : prod_connectionString 
  //,
  // Configuring Mailgun API for sending transactional email
  //mailgun_priv_key: 'mailgun private key here',
  // Configuring Mailgun domain for sending transactional email
  //mailgun_domain: 'mailgun domain here',
  // Mailchimp API key
  //mailchimpApiKey: 'mailchimp api key here',
  // SendGrid API key
  //sendgridApiKey: 'sendgrid api key here',
  // Stripe API key
  //stripeApiKey: 'stripe api key goes here',
  // necessary in order to run tests in parallel of the main app
  //app_url: 'http://localhost',
  //test_app_url: 'http://localhost',
  //client_port: 80,
  //test_client_port:8080,
  //api_port: 5000,
  //test_api_port: 5000,
  //test_db: 'mern-starter-test',
  
};
