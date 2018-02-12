import { 
	REQ_BLOCK_LIST,
    RECV_BLOCK_LIST,
    REQ_BLOCK_INFO,
    RECV_BLOCK_INFO,
    CLEAR_BLOCK_INFO
} from '../actions/types';

const INITIAL_STATE = { message: '', error: '', loadingSpinner: true };
const empty_block_info = {
    objid: 0,
    name: '',
    city: '',
    country: '',
    distict: '',
    postCode: '',
    street: '',
    number: ''
}

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
    case CLEAR_BLOCK_INFO:
            return Object.assign({}, state, {
			    blockInfo: empty_block_info,
				message: '',
				loadingSpinnerInfo: false
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
