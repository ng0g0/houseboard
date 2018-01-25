import React, { Component } from 'react';
import Translation from '../locale/translate';
import EntryRow from './Entryrow';
import { Link } from 'react-router';
import LayerMask from '../layerMask/layermask';

class EntryList extends Component {
	
	addLaayerMask() {
	return (<LayerMask layerid="newBlock" header="AddBlock">
			<p> test </p>
			<span className="flag-icon flag-icon-us"></span>
			<span className="flag-icon flag-icon-bg"></span>
		</LayerMask>
	);
	}
	

	renderListContent(item) {
		//console.log(item);
		if (item) {
			return ( <div className="panel-body">
				{item.map((e) => {
					return (<div key={e.objid.toString()}>{this.renderAccordionItem( e )}</div>)
				})}
				</div>);	
		}
		else {
			return(<div className="panel-body"><Translation text="NO_DATE_FOUND" /></div>);
		}
	}
	
	renderBlockItems( items) {
		//console.log(items);
		return (<div className="panel-body">
		{items.map((it) => {
			return (<div key={it.objid.toString()} className="panel panel-primary">
					<div className="panel-body"> 
					<Translation text="ENTRY_NUMBER" />:{it.value}
						<div className="btn-group pull-right">
							<span className="glyphicon glyphicon-info-sign"></span>
							<span className="glyphicon glyphicon-trash"></span>
						</div>
					</div>
				</div>);
		})}
		</div>);
		
	}
	
	renderAccordionItem(block) {
	//	console.log(block);
		let panel = `panel-col${block.objid}`;
		return (<div className="panel panel-primary">
			<div className="panel-heading">
				<h4 className="panel-title">
					<a className="accordion-toggle" href={`#panel-col${block.objid}`} data-toggle="collapse" >
						<span className="glyphicon glyphicon-chevron-right"></span>	{block.value}
					</a>
					<div className="btn-group pull-right">
					<span className="glyphicon glyphicon-plus"></span>
					<span className="glyphicon glyphicon-edit"></span>
					<span className="glyphicon glyphicon-trash"></span>
					</div>
				</h4>
			</div>
			<div id={panel} className="collapse">
				  {this.renderBlockItems(block.items)}

			</div>
			</div>
		);
	}

	renderListHeader() {
		return (
			<div className="panel-heading">
			<Translation text="BLOCK_LIST" />
			<div className="btn-group pull-right">
				<a href="#" className="btn-sm btn-primary" data-toggle="modal" 
					data-target="#newBlock"> <span className="glyphicon glyphicon-plus"></span>
				</a>
			</div>
		</div>
		);
	}

	render() {
		const { entry } = this.props
		return(<div className="panel panel-primary">
			{this.renderListHeader()}
			{this.renderListContent(entry)}
			{this.addLaayerMask()}
			</div>);
	}  
	

}
  
export default EntryList;  
  