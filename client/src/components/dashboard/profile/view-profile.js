import React, { Component } from 'react';
import cookie from 'react-cookie';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { fetchUser } from '../../../actions/index';

//import UserInfo from './user-info';

class ViewProfile extends Component {

  componentDidMount() {
    // Fetch user data prior to component mounting
    const user = cookie.load('user');
	this.setState({setupComplete: false});
	
    this.props.dispatch(fetchUser(user.uid));

//        setInterval(this.props.fetchUser(this.state.user.userid), this.state.pollInterval);	
  }

  render() {
	//console.log(this.props.profile);
	if ( this.props.setupComplete ) {	
		return (<div>
			<div>Name: {this.props.profile.firstName} {this.props.profile.lastName}</div>
			<div>Email: {this.props.profile.username}</div>
		</div>
		); 
		}
	else {
		return (<div className='loader'> Loading...</div> );
	}
  }
}

function mapStateToProps(state) {
  return {
    profile: state.user.profile,
	setupComplete: state.user.setupComplete,
  };
}

const mapDispatchToProps = (dispatch) =>   
  bindActionCreators({
    fetchUser
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps )(ViewProfile);

//<UserInfo profile={this.props.profile.username} />