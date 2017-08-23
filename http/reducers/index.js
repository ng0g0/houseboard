/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { combineReducers } from 'redux';
import auth from './auth';

const rootReducer = combineReducers({
    auth
});

export default rootReducer;
