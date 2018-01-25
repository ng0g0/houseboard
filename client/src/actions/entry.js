import axios from 'axios';
import cookie from 'react-cookie';
//import { getData, postData//, putData, deleteData 
//} from './index';
import { 
 FETCH_ENTRY,
 REQ_ENTRY_DATA,
 RECV_ENTRY_DATA } 
from './types';

import {API_URL, CLIENT_ROOT_URL} from './index'; 

//= ===============================
// Customer actions
//= ===============================

function requestEntryData() {
	return {type: REQ_ENTRY_DATA}
};

function receiveEntryData(json) {
	return{
		type: RECV_ENTRY_DATA,
		data: json
	}
};

//function errorHandler(error) {
//	return{
 //   ERROR_RESPONSE,
 //   payload: error
 // };
//}; 

export function fetchEntryList() {
  return function (dispatch) {
	dispatch(requestEntryData());  
	return axios({ url: `${API_URL}/entry/list`,
			timeout: 2000,
			method: 'get',
			headers: { Authorization: cookie.load('token') }
    })
    .then((response) => {
        dispatch(receiveEntryData(response.data));
    })
    .catch((error) => {
		console.log(error)
		//dispatch(errorHandler(error));
	});
  };
}

export function viewEntry(eid) {
  return function (dispatch) {
	dispatch(requestEntryData());  
	return axios({ url: `${API_URL}/user/${eid}`,
			timeout: 2000,
			method: 'get',
			headers: { Authorization: cookie.load('token') }
    })
    .then((response) => {
        dispatch(receiveEntryData(response.data.user));
    })
	.catch((error) => {
		console.log(error)
		//dispatch(errorHandler(error));
	});
    //.catch(response => dispatch(errorHandler(response.data.error)));
  };
}


