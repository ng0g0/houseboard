/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import * as sessionActions from '../../actions/sessionActions';
import { logout } from '../actions/auth';

class LoginInfo extends React.Component {
	userLogout(e) {
        this.props.onLogout();
        e.preventDefault();
    }

	render() {
        return ( <div>
            User: {this.props.username}
            <button onClick={(e) => this.userLogout(e)} title="Logout"/>
			</div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        username: state.auth.username
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => { dispatch(logout()); }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginInfo);