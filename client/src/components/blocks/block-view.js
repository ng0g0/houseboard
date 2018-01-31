import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { viewEntry } from '../../actions/entry';
import Translation from '../locale/translate';
import { isUndefined } from 'underscore';
import ButtonPanel from '../template/btnpanel';

class BlockView extends Component {
	constructor(props) {
    super(props);
  }
  
  componentDidMount() {
	//console.log(this.props.params.blockid);  
	if (!this.props.entry) {
		this.props.dispatch(viewEntry(this.props.params.blockid));
	}
  }
  renderApps(app) {
	  
	  function setAll(cnt, items) {
		let colItems = 12 / items;
		let classAl;
		switch (cnt) {
			case items: classAl = ( items > 1) ? "pull-right" : "center-block"; break;
			case 1: classAl = "pull-left"; break;
			default: classAl = "center-block";
		}
		
		return ` ${classAl}`;
	  }
		if (app.items) {
			//console.log(app.items.length);
			let cnt = 1;
			let classNum;
			let colItems = 12 / app.items.length;
			return(<div className="row">
			{ 
			    app.items.map((ap) => {
					classNum = setAll(cnt,app.items.length);
					cnt ++;
					return (<div className={`col-xs-${colItems}`} key={ap.objid}>
								<img className={classNum} src="../images/apartment.jpg" alt="entry" height="80px"/>
							</div>);})	
			}
			</div>
			);
			
		} else {
			return (<div className="row"><div className="col-sm-12"></div></div>);
		}		
  }

  renderFloors( entry ) {
	function compare(a,b) {
		if (a.value < b.value)  return 1;
		if (a.value > b.value)  return -1;
		return 0;
	}
	//console.log(entry);	
	  if (!isUndefined(entry.items)) {
	//	console.log('IMA');	
		entry.items.sort(compare);
	  return(<div >
	  {entry.items.map((it) => {
		  
		  return (<div key={it.value} className="panel panel-success blockche" >
					<div className="panel-body"> 
					{ this.renderApps(it)}
					</div>
					<div className="panel-heading">
						<Translation text="FLOOR" />: {it.value} 
						<Translation text={it.objtypedetname} />
						<div className="btn-group pull-right">
							<span className="glyphicon glyphicon-plus"></span>
						</div>
					</div>
					
				</div>)
	  })}
		</div>
	  );  
	  }	
  }
  renderEntry( entry ) {
	//console.log(entry);	
	var buttons = entry.actionx.split(",");
	return (<div className="panel panel-success">
				<div className="panel-body">
				<div className="row">
					<div className="col-xs-12"><img className="center-block" src="../images/entrance.jpg" alt="entry" height="80px"/></div>
				</div>
				</div>
				<div className="panel-heading">
				&nbsp;
				<ButtonPanel buttons={buttons} />	
				</div>
			</div>);
  }
  
  render () {
	// console.log(this.props);
	if ( this.props.loadingSpinner) {
		return (<div className="panel panel-primary">
			<div className='loader'> <Translation text="Loading" />...</div> 
		</div>);
		
		}
	else {
		const { entry }  = this.props;
		if (entry.length > 0) {
			let entryNum = entry[0];
			return ( <div className="panel panel-success"> 
					<div className="panel-heading">ADDRESS</div>
					<div className="panel-body">
						{this.renderFloors( entryNum )}	
						{this.renderEntry( entryNum )}	
					</div>
				</div>);	
		} else {
			return(<div className="panel panel-success"> 
					<div className="panel-heading">ADDRESS</div>
					<div className="panel-body">
						</div>
				</div>);
		}
	}
  }
}
	

	
	
function mapStateToProps(state) {
  return {
	entry: state.entry.block,	
	locale: state.lang.locale,
	errorMessage: state.entry.error,
	loadingSpinner: state.entry.loadingSpinner
  };
}

const mapDispatchToProps = (dispatch) =>   
  bindActionCreators({
    viewEntry
}, dispatch);

  
  export default connect(mapStateToProps, mapDispatchToProps)(BlockView);


