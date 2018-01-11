const UserController = require('./api/controllers/authentication');
//const UserController = require('./api/controllers/user');

const express = require('express');
const passport = require('passport');
const path = require('path');
//const generatePassword = require('password-generator');

const passportService = require('./config/passport');
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

const app = express();
const bodyParser = require('body-parser');
const config = require('./config/main');
const favicon  = require('serve-favicon');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/prod')));
app.use(favicon(path.join(__dirname,'/client/prod/favicon.ico')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
}); 

const apiRoutes = express.Router(),
    authRoutes = express.Router(),
    userRoutes = express.Router();
	
	
	// Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/auth', authRoutes);

  // Registration route
  authRoutes.post('/register', UserController.register);

  // Login route
  authRoutes.post('/login', requireLogin, UserController.login);

  // Password reset request route (generate/send token)
  authRoutes.post('/forgot-password', UserController.forgotPassword);

  // Password reset route (change password using token)
  authRoutes.post('/reset-password/:token', UserController.verifyToken);

  //= ========================
  // User Routes
  //= ========================

  // Set user routes as a subgroup/middleware to apiRoutes
  apiRoutes.use('/user', userRoutes);

  // View user profile route
  userRoutes.get('/:userId', requireAuth, UserController.viewProfile);
  userRoutes.post('/:userId', UserController.userUpdate);
  userRoutes.delete('/:userId', UserController.userDelete);

  // Test protected route
   apiRoutes.get('/protected', requireAuth, (req, res) => {
    res.send({ content: 'The protected test route is functional!' });
  });

app.use('/api', apiRoutes);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/prod/index.html'));
});

console.log(process.env.NODE_ENV);

const port = process.env.PORT || config.port;
app.listen(port);

console.log(`API listening on ${port}`);
