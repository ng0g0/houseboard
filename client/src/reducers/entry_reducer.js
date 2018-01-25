import { 
	REQ_ENTRY_DATA, 
	RECV_ENTRY_DATA 
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
	default:
 	  return { ...state };   
  }
}
