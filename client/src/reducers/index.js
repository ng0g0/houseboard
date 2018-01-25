import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import userReducer from './user_reducer';
import langReducer from './lang_reducer';
import entryReducer from './entry_reducer';
//import communicationReducer from './communication_reducer';
//import customerReducer from './customer_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  user: userReducer,
  lang: langReducer,
  entry: entryReducer
  
});

export default rootReducer;




//  communication: communicationReducer,
//  customer: customerReducer,