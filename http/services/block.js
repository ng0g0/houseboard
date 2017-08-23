/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var  axios = require('axios');

const baseURL = "";


function getblockObject(id) {
  const url = baseURL + "/api/block/" + id;
  return axios.get(url);
}

function AddObjectBlock (){
   const url = baseURL + "/api/block";
   return axios.post(url);
};

module.exports = {
  AddObjectBlock: AddObjectBlock,
  getblockObject: getblockObject
};