import React, { Component } from 'react';
import cookie from 'react-cookie';
import { connect } from 'react-redux';
import { fetchUser } from '../../../actions/index';

//import UserInfo from './user-info';

class ViewProfile extends Component {
  componentWillMount() {
    // Fetch user data prior to component mounting
    const user = cookie.load('user');
	console.log(user)
    this.props.fetchUser(user.uid);
  }

  render() {
	console.log(this.props); 
    return (<div>KUR</div>
      
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profile,
  };
}

export default connect(mapStateToProps, { fetchUser })(ViewProfile);

//<UserInfo profile={this.props.profile.username} />