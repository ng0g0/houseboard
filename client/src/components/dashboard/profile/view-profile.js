import React, { Component } from 'react';
import cookie from 'react-cookie';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {bindActionCreators} from 'redux';
import { fetchUser, updateUser, deleteUser} from '../../../actions/index';

const form = reduxForm({
  form: 'ViewProfile',
  validate,
});

const renderField = ({
  input,
  type,
  meta: { touched, error, warning },
}) => (
  <div>
    <input className="form-control" {...input} type={type} />
    {touched &&  error &&   <div className="error">  {error}  </div>}
  </div>
);

const emailValidate = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined;

function validate(formProps) {
  const errors = {};
  
  if (!formProps.firstName) {
    errors.firstName = 'Please enter a first name';
  }

  if (!formProps.lastName) {
    errors.lastName = 'Please enter a last name';
  }

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }
  
  errors.email = emailValidate(formProps.email);

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }
  
   if (!formProps.passwordConfirm ) {
    errors.passwordConfirm = 'Please confirm new password';
  }
  
  if (formProps.password !== formProps.passwordConfirm) {
    errors.passwordConfirm = 'Passwords must match';
  }

  return errors;
}



class ViewProfile extends Component {
   handleFormSubmit(formProps) {
    this.props.updateUser(formProps);
	this.props.dispatch(this.props.reset('ViewProfile'));
  }	
  deleteUser() {
	this.props.deleteUser(this.props.data.uid);  
  }

  componentDidMount() {
    // Fetch user data prior to component mounting
	if (!this.props.data) {
		const user = cookie.load('user');
		this.setState({setupComplete: false});
		this.props.dispatch(fetchUser(user.uid));
	}
  }
  
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div>
          <span><strong>Error!</strong> {this.props.errorMessage}</span>
        </div>
      );
    }
  }

  render () {
	const { handleSubmit, load, pristine, reset, submitting } = this.props; 
	
	if ( this.props.setupComplete ) {
		return (
		  <div> User information:	
		  <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
			{this.renderAlert()}
			<div className="row">
			  <div className="col-md-6">
				<label>First Name</label>
				<Field name="firstName" className="form-control" component={renderField} type="text" />
			  </div>
			  <div className="col-md-6">
				<label>Last Name</label>
				<Field name="lastName" className="form-control" component={renderField} type="text" />
			  </div>
			</div>
			<div className="row">
			  <div className="col-md-12">
				<label>Email</label>
				<Field name="email" className="form-control" component={renderField} type="text" />
			  </div>
			</div>
			<div className="row">
			  <div className="col-md-12">
				<label>Password</label>
				<Field name="password" className="form-control" component={renderField} type="password" />
			  </div>
			</div>
			<div className="row">
			  <div className="col-md-12">
				<label>Confirm Password</label>
				<Field name="passwordConfirm" className="form-control" component={renderField} type="password" />
			  </div>
			</div>
			<button type="submit" className="btn btn-primary">Update</button>
			<button type="button" onClick={() => this.deleteUser(this)}>Delete</button>
		  </form>
		  </div>
		);
		}
	else {
		return (<div className='loader'> Loading...</div> );
	}
  }
}

function mapStateToProps(state) {
	//console.log(state);
  return {
    data: state.user.data,
	setupComplete: state.user.setupComplete,
	initialValues: state.user.data,
	errorMessage: state.user.error
	//,formFields: state.form.ViewProfile.fields
  };
}

const mapDispatchToProps = (dispatch) =>   
  bindActionCreators({
    fetchUser,
	updateUser,
	deleteUser
  }, dispatch);

  
  export default connect(mapStateToProps, mapDispatchToProps)(form(ViewProfile));
//export default connect(mapStateToProps, mapDispatchToProps )(ProfileFromStateForm(ViewProfile));


