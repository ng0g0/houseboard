import { LANG_CHANGE } from '../actions/types';

const INITIAL_STATE = { lang: 'bg' };

export default function (state = INITIAL_STATE, action) {
 // console.log(action);
  switch (action.type) {
	case LANG_CHANGE:
			return Object.assign({}, state, {
				lang: action.payload.lang
				});		
	default:
 	  return { ...state };   
  }
}
