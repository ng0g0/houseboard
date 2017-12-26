import axios from 'axios';
import cookie from 'react-cookie';
import { logoutUser } from './auth';
import { STATIC_ERROR, FETCH_USER } from './types';
let config = require('../../../config/main');
const test_env = 'test';
const test_url = 'http://localhost';
const prod_url = 'http://houseboard.herokuapp.com';
const test_client_port = 8080;
const prod_client_port = 80;
const test_api_port = 5000;
const prod_api_port = 5000;

//= ===============================
// Utility actions
//= ===============================

function apiURL() {
		return `${config.app_url}:${config.api_port}/api`;
		//return (process.env.npm_package_run != test_env)? 
		//	`${test_url}:${test_api_port}/api` : `${prod_url}:${prod_api_port}/api`;
}

function clientURL() {
			return `${config.app_url}:${config.client_port}`;
	//return (process.env.npm_package_run != test_env)? 
	//		`${test_url}:${test_client_port}` : `${prod_url}:${prod_client_port}`;
}

export const API_URL = apiURL();
export const CLIENT_ROOT_URL = clientURL();

//export const API_URL = apiURL();
//export const API_URL = 'http://houseboard.herokuapp.com:5000/api';
//export const CLIENT_ROOT_URL = clientURL();
//export const CLIENT_ROOT_URL = 'http://houseboard.herokuapp.com';


export function fetchUser(uid) {
  return function (dispatch) {
    axios.get(`${API_URL}/user/${uid}`, {
      headers: { Authorization: cookie.load('token') },
    })
    .then((response) => {
      dispatch({
        type: FETCH_USER,
        payload: response.data.user,
      });
    })
    .catch(response => dispatch(errorHandler(response.data.error)));
  };
}

export function errorHandler(dispatch, error, type) {
  console.log('Error type: ', type);
  console.log(error);

  let errorMessage = error.response ? error.response.data : error;

   // NOT AUTHENTICATED ERROR
  if (error.status === 401 || error.response.status === 401) {
    errorMessage = 'You are not authorized to do this.';
    return dispatch(logoutUser(errorMessage));
  }

  dispatch({
    type,
    payload: errorMessage,
  });
}

// Post Request
export function postData(action, errorType, isAuthReq, url, dispatch, data) {
  const requestUrl = API_URL + url;
  let headers = {};

  if (isAuthReq) {
    headers = { headers: { Authorization: cookie.load('token') } };
  }

  axios.post(requestUrl, data, headers)
  .then((response) => {
    dispatch({
      type: action,
      payload: response.data,
    });
  })
  .catch((error) => {
    errorHandler(dispatch, error.response, errorType);
  });
}

// Get Request
export function getData(action, errorType, isAuthReq, url, dispatch) {
  const requestUrl = API_URL + url;
  let headers = {};

  if (isAuthReq) {
    headers = { headers: { Authorization: cookie.load('token') } };
  }

  axios.get(requestUrl, headers)
  .then((response) => {
    dispatch({
      type: action,
      payload: response.data,
    });
  })
  .catch((error) => {
    errorHandler(dispatch, error.response, errorType);
  });
}

// Put Request
export function putData(action, errorType, isAuthReq, url, dispatch, data) {
  const requestUrl = API_URL + url;
  let headers = {};

  if (isAuthReq) {
    headers = { headers: { Authorization: cookie.load('token') } };
  }

  axios.put(requestUrl, data, headers)
  .then((response) => {
    dispatch({
      type: action,
      payload: response.data,
    });
  })
  .catch((error) => {
    errorHandler(dispatch, error.response, errorType);
  });
}

// Delete Request
export function deleteData(action, errorType, isAuthReq, url, dispatch) {
  const requestUrl = API_URL + url;
  let headers = {};

  if (isAuthReq) {
    headers = { headers: { Authorization: cookie.load('token') } };
  }

  axios.delete(requestUrl, headers)
  .then((response) => {
    dispatch({
      type: action,
      payload: response.data,
    });
  })
  .catch((error) => {
    errorHandler(dispatch, error.response, errorType);
  });
}

//= ===============================
// Static Page actions
//= ===============================
export function sendContactForm({ name, emailAddress, message }) {
  return function (dispatch) {
    axios.post(`${API_URL}/communication/contact`, { name, emailAddress, message })
    .then((response) => {
      dispatch({
        type: SEND_CONTACT_FORM,
        payload: response.data.message,
      });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, STATIC_ERROR);
    });
  };
}
