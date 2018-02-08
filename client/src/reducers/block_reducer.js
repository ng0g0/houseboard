import { 
	REQ_BLOCK_LIST,
    RECV_BLOCK_LIST,
    REQ_BLOCK_INFO,
    RECV_BLOCK_INFO	
} from '../actions/types';

const INITIAL_STATE = { message: '', error: '', loadingSpinner: true };

export default function (state = INITIAL_STATE, action) {
  //console.log(action);  
  switch (action.type) {
	case REQ_BLOCK_LIST:
		return Object.assign({}, state, {
		    loadingSpinner: true
		});
	case RECV_BLOCK_LIST:
			return Object.assign({}, state, {
				data: action.data.block,
				message: action.message,
				loadingSpinner: false
			});
			
	case REQ_BLOCK_INFO:
			return Object.assign({}, state, {
			    loadingSpinnerInfo: true
			});
	case RECV_BLOCK_INFO:
			return Object.assign({}, state, {
				blockInfo: action.data.block,
				message: action.message,
				loadingSpinnerInfo: false
			});
	/*case ERROR_RESPONSE:	
		return Object.assign({}, state, {
				message: action.message,
				loadingSpinner: false
			});*/
	default:
 	  return { ...state };   
  }
}
