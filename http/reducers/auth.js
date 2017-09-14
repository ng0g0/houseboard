/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 
import user from '../services/block'; 
import axios from 'axios';

const defaultState = {
    isLoggedIn: false,
    emailsent: false,
    username: '',
    password: '',
    message: ''
};


export default function reducer(state = defaultState, action) {
  switch (action.type) {
    
    case 'LOGIN': 
	{
		
	return Object.assign({}, state, { 
          isLoggedIn: true,
          username: action.username,
          emailsent:false,
          message: ''
      });
	}
      
    case 'SIGNIN': 
      return Object.assign({}, state, { 
          isLoggedIn: false,
          username: action.username,
          emailsent: true,
          message: ''
      });	
    case 'PASSWORD': 
      return Object.assign({}, state, { 
          isLoggedIn: false,
          username: '',
          emailsent: true,
          message: ''
      });		
    case 'LOGOUT':
      return Object.assign({}, state, { 
          isLoggedIn: false,
          username: '',
          emailsent:false,
          message: ''
      });
    case 'WRONGUSERNAME': {
      return Object.assign({}, state, { 
            isLoggedIn: false,
            username: '',
            emailsent:false,
            message: action.message
        });
    }
    case 'ERRORSIGNUP': {
      return Object.assign({}, state, { 
            isLoggedIn: false,
            username: '',
            emailsent:false,
            message: action.message
        });
    }
    default:
      return state;
  }
}


