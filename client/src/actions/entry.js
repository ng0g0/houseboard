import axios from 'axios';
import cookie from 'react-cookie';
//import { getData, postData//, putData, deleteData 
//} from './index';
import { 
 FETCH_ENTRY,
 REQ_ENTRY_DATA,
 RECV_ENTRY_DATA,
 REQ_VIEW_DATA,
 RECV_VIEW_DATA
 } 
from './types';

import {API_URL, CLIENT_ROOT_URL} from './index'; 

//= ===============================
// Customer actions
//= ===============================

function requestListData() {
	return {type: REQ_ENTRY_DATA}
};

function receiveListData(json) {
	return{
		type: RECV_ENTRY_DATA,
		data: json
	}
};

function requestViewData() {
	return {type: REQ_VIEW_DATA}
};

function receiveViewData(json) {
	return{
		type: RECV_VIEW_DATA,
		data: json
	}
};

function errorHandler(error) {
	return{
		type: ERROR_RESPONSE,
		message: error
  };
}; 

export function fetchEntryList() {
  return function (dispatch) {
	dispatch(requestListData());  
	return axios({ url: `${API_URL}/entry/list`,
			timeout: 2000,
			method: 'get',
			headers: { Authorization: cookie.load('token') }
    })
    .then((response) => {
        dispatch(receiveListData(response.data));
    })
    .catch((error) => {
		console.log(error)
		//dispatch(errorHandler(error));
	});
  };
}

export function viewEntry(eid) {
  return function (dispatch) {
	dispatch(requestViewData());  
	return axios({ url: `${API_URL}/entry/${eid}`,
			timeout: 2000,
			method: 'get',
			headers: { Authorization: cookie.load('token') }
    })
    .then((response) => {
        dispatch(receiveViewData(response.data));
    })
	.catch((error) => {
		console.log(error)
		//dispatch(errorHandler(error));
	});
    //.catch(response => dispatch(errorHandler(response.data.error)));
  };
}


