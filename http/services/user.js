/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var  axios = require('axios');

const baseURL = "";


function login(username, password) {
  var payload={
          "email":username,
          "password":password
  };
  const url = baseURL + "/api/user/login/";
  return axios.post(url, payload);
}

function signup (){
   const url = baseURL + "/api/user/signup";
   return axios.post(url);
};

module.exports = {
  signup: signup,
  login: login
};