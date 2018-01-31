import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Translation from '../locale/translate';

class LayerMask extends Component {
	
  render() {
	  const { layerid, header } = this.props
	//console.log(this.props);
    return (
      <div className="modal fade" id={layerid} role="dialog">
		<div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">&times;</button>
          <h4 className="modal-title">
		  <Translation text={header} />
		  </h4>
        </div>
        <div className="modal-body">
		{this.props.children}
        </div>
        <div className="modal-footer">
			<button type="button" className="btn btn-primary"> OK</button>
     		<button type="button" className="btn btn-danger" data-dismiss="modal"> Cancel</button>
        </div>
      </div>
    </div>
  </div>
	
	
	
    );
  }
}


/// {this.props.children}

export default LayerMask;
