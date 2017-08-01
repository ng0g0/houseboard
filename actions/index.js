
export const login = (user, password) {
	return {
		type: 'LOGIN',
        user: user,
        password: password		
	}
}