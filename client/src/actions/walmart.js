import axios from 'axios';
import cookie from 'react-cookie';
//import { showNotify } from './toast';
import {SUCCESS_NOTIF, ERROR_NOTIF} from '../consts';
//import jsonp from 'jsonp';

import { 
 REQ_WALMART_LIST,
 RECV_WALMART_LIST,
 REQ_WALMART_INFO,
 RECV_WALMART_INFO
 //CLEAR_BLOCK_INFO
 } 
from './types';

import {API_URL, CLIENT_ROOT_URL, API_WALMART_URL, WALMART_API_KEY} from './index'; 

//= ===============================
// Customer actions
//= ===============================

function requestWalmartList() {
   return {type: REQ_WALMART_LIST} 
}

function receiveWalmartList(json) {
	return{
		type: RECV_WALMART_LIST,
		data: json
	}
};

function requestWalmartAPI() {
   return {type: REQ_WALMART_INFO} 
}

//function receiveWalmartAPI() {
//   return {type: RECV_WALMART_INFO}  
//}

function receiveWalmartAPI(json) {
	return{
		type: RECV_WALMART_INFO,
		data: json
	}
};
//export function resetBlockInfo(){
//    return function (dispatch) {
//        dispatch(clearBlockInfo() );  
//    }
//}

//http://api.walmartlabs.com/v1/items?apiKey=upxrg7rpj4hjew5jbjwqhwkf&itemId=17201599,469836497

export function fetchFromWalmarAPI(items) {
    return function (dispatch) {
        dispatch(requestWalmartAPI());
        return axios({
            url: `${API_WALMART_URL}/v1/items?apiKey=${WALMART_API_KEY}&itemId=${items}`,
            timeout: 2000,
			method: 'get',
        })
        .then((response) => {
            dispatch(receiveWalmartAPI(response.data));
        })
        .catch((error) => {
            console.log(error)
		});
    };    
}

// search for 'frog'
/*
export function fetchData(items) {
    return jsonp(, null, function (err, data) {
        if (err) {
            console.error(err.message);
        } else {
            console.log(data);
            if (data.errors) {
                var j={items:[]};
                if (Array.isArray(items)) {
                    Object.keys(items).forEach( (element) => {
                    j.items.push({"itemId": items[element], "message": "NotFound"});
                    });    
                } else {
                    j.items.push({"itemId": items, "message": "NotFound"});
                }
                //dispatch(receiveWalmartAPI(j));
                return j;
            } else {
                var j={items: []};
                if (Array.isArray(items)) {
                    Object.keys(items).forEach( (element) => {
                        var result = data.items.find(function(it) { return  it.itemId == items[element];  });
                        if (result) {
                           j.items.push(result); 
                        } else {
                           j.items.push({"itemId": items[element], "message": "NotFound"}); 
                        }
                    });
                } else {
                    j.items.push(data.items[0]);
                }
                return j;//dispatch(receiveWalmartAPI(j));
            }
        }
    });        
};


function getItems(items) {
    return axios({ url:`${API_WALMART_URL}/v1/items?apiKey=${WALMART_API_KEY}&itemId=${items}`,
                    method: 'get'
                    //headers: {"Access-Control-Allow-Origin": "*"}
                });
}

export function fetchFromWalmarAPI(items) {
   const maxLenght = 3;
   console.log(items);
   let promises = [];
   return function (dispatch) {
	dispatch(requestWalmartAPI()); 
    if (Array.isArray(items)) {
        var interactions = items.length/maxLenght;
        if (interactions > 1) {
            for (var i = 0; i < Math.ceil(interactions); i++) { 
                var list = items.slice(i*maxLenght,i*maxLenght+maxLenght);
                console.log(list);
                //var it = fetchData(list);
                //console.log(it);
                promises.push(//it
                    jsonp(`${API_WALMART_URL}/v1/items?apiKey=${WALMART_API_KEY}&itemId=${list}`, null, function (err, data) {
                    if (err) {
                        console.error(err.message);
                        return err.message;
                    } else {
                        console.log(data);
                        return data;
                    }}
                    ));
            }

        }
    } else {
        //var it = fetchData(items);
        //console.log(it) 
        promises.push(
        getItems(items)
        //jsonp(
        //{
        //    url: `${API_WALMART_URL}/v1/items?apiKey=${WALMART_API_KEY}&itemId=${items}`,
        //    callbackName: "__callback",
        //})
        //.then(function(response) {
        //    console.log(response.data) 
        //})
            
        //, null, function (err, data) {
        //    if (err) {
        //        console.error(err.message);
        //        return err.message;
        //    } else {
        //        console.log(data);
        //        return data;
        //    }}
        //)
        );
    }
     console.log('Promise All');
    console.log(promises);
    
    return axios.all(promises).then((response) => {
        console.log(response)
        dispatch(receiveWalmartAPI(response));
        //dispatch(receiveWalmartAPI(response.data));
    })
    .catch((error) => {
		console.log(error)
	});
    
    
  };
};
*/

export function fetchWalmarUserList() {
  return function (dispatch) {
	dispatch(requestWalmartList());
	return axios({ url: `${API_URL}/user/walmartList`,
			timeout: 2000,
			method: 'get',
			headers: { Authorization: cookie.load('token') }
    })
    .then((response) => {
        console.log(response.data)
        dispatch(receiveWalmartList(response.data));
    })
    .catch((error) => {
		console.log(error)
		//dispatch(errorHandler(error));
	});
  };
}

export function fetchBlockInfo(bid) {
   console.log(bid); 
  return function (dispatch) {
	dispatch(requestBlockInfo());  
	return axios({ url: `${API_URL}/block/${bid}`,
			timeout: 2000,
			method: 'get',
			headers: { Authorization: cookie.load('token') }
    })
    .then((response) => {
        console.log(response);
        dispatch(receiveBlockInfo(response.data));
    })
	.catch((error) => {
		console.log(error)
	});
  };  
}



    


