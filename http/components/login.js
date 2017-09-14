/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { ScrollView, Text, TextInput, View, Button } from 'react-native';
import { login, signin, forgot } from '../actions/auth';
//import './login.css';

//import bcrypt  from 'bcrypt-nodejs';

const passTab = 2;
const singTab = 1;
const loginTab = 0;

class Login extends Component {
    constructor (props) {
      super(props);
      this.state = {
        username: this.props.username || '',
        password: '',
        firstname: '',
        lastname: '',
        tab: loginTab
      };
      this.handleInputChange = this.handleInputChange.bind(this);
      this.tabchange = this.tabchange.bind(this);
  }

  
    userLogin (e) {
      
      console.log(this.state.username);
      this.props.onLogin(this.state.username, this.state.password);
      e.preventDefault();
    }
    userSignup (e) {
      console.log(this.state.username);
      var password = '123';
      this.props.onSign(this.state.username, this.state.firstname, this.state.lastname, password);
      e.preventDefault();
     // this.setState({
     //   username: '',
     //   firstname: '',
     //   lastname: ''
     // });
    }
    

    tabchange(e) {
      var name = e.target.getAttribute('name');
      var value = loginTab;
      if (name === "SignIn") {
        value = singTab;
      } else if (name === "LogIn") {
        value = loginTab;
      } else if (name === "PassWd") {
        value = passTab;
      }
      this.setState({
        tab: value,
        username: '',
        firstname: '',
        lastname: ''
      });
      e.preventDefault();
    }
    
    forgotpass(e) {
      this.props.onForgot(this.state.username);
      this.setState({
        username: '',
        tab: loginTab
        });
      e.preventDefault();
    }
	
    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      this.setState({
              [name]: value
      });
    }
	
    renderForgot() {
      return (<div id="forgot">
        <div className="field-wrap">
          <label> Username<span className="req">*</span></label>
          <input type="text" required autoComplete="off" name="username" value={this.state.username} onChange={this.handleInputChange}/>
          <button className="button button-block" onClick={(e) => this.forgotpass(e)} >Submit</button>                                        
        </div>
      </div>
      );
    }
    renderLogin() {
      console.log(this.props.message);
      return (<div id="login"> 
          <h1>Login</h1>
          <div className="field-wrap">
            <label> {this.props.message}</label>
          </div>
          <div className="field-wrap">
            <label> Username<span className="req">*</span></label>
            <input type="text" required autoComplete="off" name="username" value={this.state.username} onChange={this.handleInputChange}/>
          </div>
          <div className="field-wrap">
            <label> Password<span className="req">*</span> </label>
            <input type="password" required autoComplete="off" name="password" value={this.state.password} onChange={this.handleInputChange}/>
          </div>
          <p className="forgot"><a name = "PassWd" href="#" onClick={(e) => this.tabchange(e)}>Forgot Password?</a></p>
          <button className="button button-block" onClick={(e) => this.userLogin(e)} >Log In</button>
      </div>  );
    }
    renderSignin() {
      console.log(this.props.message);
      return(<div id="signup"> 
          <h1>Sign Up for Free</h1>
          <div className="field-wrap">
            <label> {this.props.message}</label>
          </div>
          <div className="top-row">
            <div className="field-wrap">
              <label>First Name<span className="req">*</span></label>
              <input type="text" required autoComplete="off" name="firstname" value={this.state.firstname} onChange={this.handleInputChange} />
            </div>
            <div className="field-wrap">
              <label>Last Name<span className="req">*</span></label>
              <input type="text"required autoComplete="off" name="lastname" value={this.state.lastname} onChange={this.handleInputChange} />
            </div>
          </div>
          <div className="field-wrap">
            <label>Email Address<span className="req">*</span> </label>
            <input type="email"required autoComplete="off" name="username" value={this.state.username} onChange={this.handleInputChange} />
          </div>
          <button className="button button-block" onClick={(e) => this.userSignup(e)} >Get Started</button>
        </div>
      );
    }
    renderTab() {
      return (<ul className="tab-group">
        <li className="tab active"><a name="SignIn" href="#" onClick={(e) => this.tabchange(e)}>Sign Up</a></li>
        <li className="tab"><a name="LogIn" href="#" onClick={(e) => this.tabchange(e)}>Log In</a></li>
      </ul>);
    }

  render() {
    if (this.state.tab === passTab)
      {
        return (<div className="loginform">
          {this.renderForgot()}		
      </div>); 
      } else {
      if ((this.state.tab === loginTab) || this.props.emailSent) {
        return (<div className="loginform">
          {this.renderTab()}		
          <div className="tab-content">
            {this.renderLogin()}	
          </div>
      </div>);
      } else {
        return (<div className="loginform">
          {this.renderTab()}		
            <div className="tab-content">
            {this.renderSignin()}	
            </div>
          </div>);
      }
    }
  }
}


const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        emailSent: state.auth.emailsent,
        message: state.auth.message
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (username, password) => { dispatch(login(username, password)); },
	onSign: (username, firstname, lastname, password) => { dispatch(signin(username, firstname,lastname, password)); },
        onForgot: (username) => { dispatch(forgot(username)); }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

