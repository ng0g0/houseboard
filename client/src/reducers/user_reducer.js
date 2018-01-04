import { FETCH_USER, ERROR_RESPONSE, REQ_USER_DATA, RECV_USER_DATA } from '../actions/types';

const INITIAL_STATE = { profile: {}, message: '', error: '' };

export default function (state = INITIAL_STATE, action) {
	//console.log('REDUCER');
	//console.log(action);
  switch (action.type) {
	case REQ_USER_DATA:
		    //console.log('REQ_USER_DATA');
			return Object.assign({}, state, {
            setupComplete: false
			});
			//return Object.assign({}, state, {setupComplete: false, profile: null });  
	case RECV_USER_DATA:
	        //console.log(action);
			return Object.assign({}, state, {
			profile: action.data,
            setupComplete: true
			});
			//var newState = Object.assign({}, state, {setupComplete: true, profile: action.data });
			
			//return newState;		
    case FETCH_USER:
		//console.log('FETCH_USER');
		return Object.assign({}, state, { profile: action.payload.user, setupComplete: true });
//       { ...state,  };
    case ERROR_RESPONSE:
      return { ...state, error: action.payload };
	default:
 	  return { ...state };   
  }
}
