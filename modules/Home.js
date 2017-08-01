import React from 'react';
import {Link} from 'react-router';
import auth from './authenticator';

class HomePage extends React.Component {

	renderLogin() {
		if (!auth.loggedIn()) {
			return (<Link to="login" className="btn btn-primary btn-lg">log in as a test user</Link>)
		} else {
			return ""
		}
		
	}
	render() {
		return (
		  <div className="jumbotron">
			<h1>Residence Board Manager</h1>
			{this.renderLogin()}
		  </div>
		);
	}
}

export default HomePage;