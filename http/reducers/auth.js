/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const defaultState = {
    isLoggedIn: false,
    emailsent: false,
    username: '',
    password: ''
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'LOGIN': 
      return Object.assign({}, state, { 
          isLoggedIn: true,
          username: action.username,
          emailsent:false
      });
    case 'SIGNIN': 
      return Object.assign({}, state, { 
          isLoggedIn: false,
          username: action.username,
          emailsent: true
      });	
    case 'PASSWORD': 
      return Object.assign({}, state, { 
          isLoggedIn: false,
          username: '',
          emailsent: true
      });		
    case 'LOGOUT':
      return Object.assign({}, state, { 
          isLoggedIn: false,
          username: '',
          emailsent:false
      });
    default:
      return state;
  }
}


