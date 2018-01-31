import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEntryList, viewEntry } from '../../actions/entry';
import {bindActionCreators} from 'redux';
import Translation from '../locale/translate';
import {Redirect} from 'react-router';
import ButtonPanel from '../template/btnpanel';
import LayerMask from '../layerMask/layermask';
import AccordionPanel from '../accordion';
import PropTypes from 'prop-types'; // ES6


class BlockList extends Component {
	static contextTypes = {
		router: PropTypes.object,
	}
	
	constructor(props) {
		super(props);
		this.handleViewClick = this.handleViewClick.bind(this);
	}
  
  
  
	componentDidMount() {
		if (!this.props.entry) {
			this.props.dispatch(fetchEntryList());
		}
	}
	
	handleViewClick(target, objid ) {
		var redirect = `/${target}/${objid}`;
		console.log(redirect);
		this.props.dispatch(viewEntry(objid));
		this.context.router.push(redirect);
	}
	
	
	addBlockLayerMask() {
	return (<LayerMask layerid="newBlock" header="AddBlock">
			<p> test </p>
		</LayerMask>
	);
	}
	
	addBlACCLayerMask(){
	return (<LayerMask layerid="newAcomudation" header="Accomucation">
			<p> test </p>
		</LayerMask>
	);
	}
	delBlockLayerMask(){
	return (<LayerMask layerid="delete" header="Delete">
			<p> test </p>
		</LayerMask>
	);
	}

	
  
	renderBlockItems( items) {
		return (<div className="panel-body">
		{items.map((it) => {
			var buttons = it.actionx.split(",");
			return (<div key={it.objid.toString()} className="panel panel-primary">
					<div className="panel-body"> 
					<Translation text="ENTRY_NUMBER" />:{it.value}
					<ButtonPanel buttons={buttons} objid={it.objid} target="blocks" 
					onViewEntry={this.handleViewClick}
					/>
					</div>
				</div>);
		})}
		</div>);
		
	}
	
	renderListContent(item) {
		if (item) {
			return (<div className="panel-body">
				{item.map((block) => {
					var buttons = block.actionx.split(",");
					return (<AccordionPanel objid={block.objid} title={block.value} buttons={buttons} key={block.objid}
							handleViewClick={this.handleViewClick}>
							{this.renderBlockItems(block.items)}
						</AccordionPanel>)
				})}
				</div>);	
		}
		else {
			return(<div className="panel-body"><Translation text="NO_DATE_FOUND" /></div>);
		}
	}
	
  
  renderListHeader() {
	let buttons = ['BLOCK'];
	return (<div className="panel-heading">
			<Translation text="BLOCK_LIST" />
			<ButtonPanel buttons={buttons} target="modal" />
		</div>);
	}
  
  
  
  render() {
	  if ( this.props.loadingSpinner ) {
		return (<div className='loader'><Translation text="Loading" />...</div>);
	} else {
		 const { entry} = this.props;
		return (
		<div>
		<h2> <Translation text="BLOCK_LIST" />	</h2>
		<div className="panel panel-primary">
			{this.renderListHeader()}
			{this.renderListContent(entry)}
			{this.addBlockLayerMask()}
			{this.addBlACCLayerMask()}
			{this.delBlockLayerMask()}
			</div>
		
		</div>
		);	
	}
    
  }
}


function mapStateToProps(state) {
  return {
    entry: state.entry.entry,	
	locale: state.lang.locale,
	errorMessage: state.entry.error,
	loadingSpinner: state.entry.loadingSpinner
  };
}

const mapDispatchToProps = (dispatch) =>   
  bindActionCreators({
    fetchEntryList,
	viewEntry
  }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(BlockList);

