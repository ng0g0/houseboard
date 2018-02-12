import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Translation from '../locale/translate';
import { saveEntry } from '../../actions/blocks';
import {bindActionCreators} from 'redux';
import { AddEntranceConst } from '../../consts';


function validate(formProps) {
  const errors = {};
  return errors;
}

const renderField = ({
  input,
  type,
  meta: { touched, error, warning },
}) =>
  ( <div>
      <input className="form-control" {...input} type={type} />
	  {touched &&  error &&   <div className="error">  {error}  </div>}
    </div>
  );
  

class AddEntrance extends Component {
    constructor(props) {
		super(props);
	}
    
    render () {
        const { handleSubmit } = this.props;
        if  (this.props.loadingSpinner) {
		return (<div className='loader'><Translation text="Loading" />...</div>);
        } else {
            return(
            <form onSubmit={handleSubmit}>
            <div className="row">
               <div className="col-md-12">
                <label><Translation text="title" /></label>
                <Field name="name" className="form-control" component={renderField} type="text" />
                <Field name="objid" style={{ height: 0 }} component="input" type="hidden" />
              </div>
              <div className="col-md-12">
                <label><Translation text="stnumber" /></label>
                <Field name="number" className="form-control" component={renderField} type="text" />
              </div>
            </div>
           
          </form>); 
        }
	
	}
}
	
function mapStateToProps(state) {
   return {
    block: state.block.blockInfo,
//	setupComplete: state.block.loadingSpinnerInfo,
//    initialValues: ownProp,
	errorMessage: state.block.error
  };
}
const mapDispatchToProps = (dispatch) =>   
  bindActionCreators({
    saveEntry
  //  fetchBlockInfo
}, dispatch);

function  handleFormSubmit(formProps, dispatch) {
    return dispatch(saveEntry(formProps));
}

const form = reduxForm({
  form: AddEntranceConst,
  validate,
  enableReinitialize: true,
  onSubmit: handleFormSubmit 
});


export default connect(mapStateToProps, mapDispatchToProps)(form(AddEntrance));


