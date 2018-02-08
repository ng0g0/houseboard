import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import userReducer from './user_reducer';
import langReducer from './lang_reducer';
import entryReducer from './entry_reducer';
import blockReducer from './block_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  user: userReducer,
  lang: langReducer,
  entry: entryReducer,
  block: blockReducer
  
  
});

export default rootReducer;
