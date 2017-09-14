/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var  axios = require('axios');
//var bcrypt = require('bcrypt');
const baseURL = "";

/*
function genPassword(stringPass) {
  var SALT_FACTOR = 5;
  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
  if (err) return next(err);
    bcrypt.hash(stringPass, salt, null, function(err, hash) {
      if (err) return next(err);
      return hash;
      next();
    });
  });
}

*/

export const login = (username, password) => {
  const url = baseURL + "/api/user/login/";  
  return function(dispatch) {
    return axios.get(url,{
      params: {
        userName:username,
        passWord:password
      }
    })
    .then(response => {
      if (response.data.status  === 'OK') { 
        dispatch(loginServer(response.data.login));
      } else {
        dispatch(loginFail(response.data.message));
      }
    });
  };  
};

export const loginServer = (user) => {
  return {
    type: 'LOGIN',
    username: user
  };
};

export const signInServer = (user) => {
  return {
    type: 'SIGNIN',
    username: user
  };
};

export const signin = (username, firstname, lastname, password) => {
  //var password =  '123';
  const saltRounds = 10;
  //var salt = bcrypt.genSaltSync(saltRounds);
  //var hash = bcrypt.hashSync(password, salt);
  const url = baseURL + "/api/user/signup/";  
  return function(dispatch) {
    return axios.post(url,{
        userName: username,
        passWord: password,
        firstName: firstname, 
        lastName: lastname
    })
    .then(response => {
      console.log(response);
      if (response.data.status  === 'OK') { 
        dispatch(signInServer(response.data.login));
      } else {
        dispatch(errorSignUp(response.data.message));
      }
    });
  };  
};

export const forgot = (username) => {
    return {
        type: 'PASSWORD',
        username: username
    };
};

export const logout = () => {
    return {
        type: 'LOGOUT'
    };
};
export const errorSignUp = (error) => {
  return {
        type: 'ERRORSIGNUP',
        message: error
    };
};
export const loginFail= (messsage) => {
  return {
        type: 'WRONGUSERNAME',
        message: messsage
    };
};

