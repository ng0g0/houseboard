import React, { Component } from 'react';
import { Link } from 'react-router';
import {icons, viewInfo} from '../../consts';
import Translation from '../locale/translate';
import {Redirect, browserHistory} from 'react-router';
import PropTypes from 'prop-types'; // ES6




class ButtonPanel extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		const { buttons, target, objid } = this.props;
		//if (target == "modal") {
		//	return (<div className="btn-group pull-right">
		//		{buttons.map((btn) =>{
		//			var butname = icons.find(function(e) {
		//				return e.name === btn;
		//			});
		//			let icon = butname.icon;
		//			return (<a href="#" className="btn-sm btn-primary" data-toggle={target} key={btn}
		//					data-target={butname.target}> <span className={butname.icon}></span></a>);
		//		})}
		//	</div>);
		//} else {
			return(<div className="btn-group pull-right">
				<a className="btn-sm btn-primary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown">
					<span className="glyphicon glyphicon-plus"></span>
					</a>
				<ul className="dropdown-menu">
			{buttons.map((btn) =>{
					var butname = icons.find(function(e) {
						return e.name === btn;
					});
					let icon = butname.icon;
					//console.log(butname);
					
					if (butname.target.startsWith("#")) {
						return (<li key={btn}> 
							<a href="#" className="dropdown-item" data-toggle="modal"
							data-target={butname.target}> <span className={butname.icon}></span>
							&nbsp;<Translation text={butname.label} />
							</a>
						</li>);
					} else {
					return (<li key={btn}><Link  className="dropdown-item"  
								onClick={()=> this.props.onViewEntry(butname.target, objid) }>
								<span className={butname.icon}></span>&nbsp;
							<Translation text={butname.label} /></Link>
							</li>);
					}		
				})}
				</ul>
		</div>);
		//}
	} 
}

ButtonPanel.PropTypes = {
		onViewEntry: PropTypes.func,
		buttons: PropTypes.array,
		target: PropTypes.string,
		objid: PropTypes.number,
	};

  
export default ButtonPanel;  
  