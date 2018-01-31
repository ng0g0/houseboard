import { 
	REQ_ENTRY_DATA, 
	RECV_ENTRY_DATA,
	ERROR_RESPONSE,
	REQ_VIEW_DATA,
	RECV_VIEW_DATA	
} from '../actions/types';

const INITIAL_STATE = { message: '', error: '', loadingSpinner: true };

export default function (state = INITIAL_STATE, action) {
	//console.log(action);
  switch (action.type) {
	case REQ_ENTRY_DATA:
			return Object.assign({}, state, {
			    loadingSpinner: true
			});
	case RECV_ENTRY_DATA:
			return Object.assign({}, state, {
				entry: action.data.entry,
				message: action.message,
				loadingSpinner: false
			});
			
	case REQ_VIEW_DATA:
			return Object.assign({}, state, {
			    loadingSpinner: true
			});
	case RECV_VIEW_DATA:
			return Object.assign({}, state, {
				block: action.data.entry,
				message: action.message,
				loadingSpinner: false
			});
	case ERROR_RESPONSE:	
		return Object.assign({}, state, {
				message: action.message,
				loadingSpinner: false
			});
	default:
 	  return { ...state };   
  }
}
