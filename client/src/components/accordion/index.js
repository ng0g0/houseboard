import React, { Component } from 'react';
//import { Link } from 'react-router';
//import {icons} from '../../consts';
//import Translation from '../locale/translate';
import ButtonPanel from '../template/btnpanel';


class AccordionPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {isToggleOn: true};
		this.handleClick = this.handleClick.bind(this);
	}
  
	handleClick() {
		this.setState(prevState => ({
			isToggleOn: !prevState.isToggleOn
		}));
	}
	render() {
		const { objid, title, buttons } = this.props
		let panel = `panel-col${objid}`;
		return(<div className="panel panel-primary">
			<div className="panel-heading">
				<h4 className="panel-title">
					<a className="nounderline" href={`#panel-col${objid}`} data-toggle="collapse" 
					onClick={() => this.handleClick()}>
						{this.state.isToggleOn ? 
							<span className="glyphicon glyphicon-chevron-right"></span> 
							: <span className="glyphicon glyphicon-chevron-down"></span> }
						&nbsp;{title}
					</a>
					<ButtonPanel buttons={buttons} objid={objid} target="block" 
					onViewEntry={this.props.handleViewClick}
					/>
				</h4>
			</div>
			<div id={panel} className="collapse">
				{this.props.children}
			</div>
			</div>);
	}  
	
	
//			
}

  
export default AccordionPanel; 