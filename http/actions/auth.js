/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

export const login = (username, password) => {
    return {
        type: 'LOGIN',
        username: username,
        password: password
    };
};

export const signin = (username, firstname, lastname) => {
	return {
        type: 'SIGNIN',
        username: username,
        firstname: firstname,
		lastname: lastname
    };
};

export const forgot = (username) => {
    return {
        type: 'PASSWORD',
        username: username
    };
};

export const logout = () => {
    return {
        type: 'LOGOUT'
    };
};
