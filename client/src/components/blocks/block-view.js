import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { viewEntry } from '../../actions/entry';
import Translation from '../locale/translate';
import { isUndefined } from 'underscore';
import ButtonPanel from '../template/btnpanel';
import LayerMask from '../layerMask/layermask';
import PropTypes from 'prop-types'; // ES6

class BlockView extends Component {
    static contextTypes = {
		router: PropTypes.object,
	}  
	constructor(props) {
    super(props);
  }
  
  componentDidMount() {
	if (!this.props.entry) {
		this.props.dispatch(viewEntry(this.props.params.blockid));
	}
  }
  
    handleViewClick(target, objid, label ) {
        console.log(label);
        console.log(objid);
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
        let cnt = 1;
        let classNum;
        let colItems = 12 / app.items.length;
        return(<div className="row">
            {app.items.map((ap) => {
                classNum = setAll(cnt,app.items.length);
                cnt ++;
                console.log(ap);
                var buttons = ap.actionx.split(",");
                var details = JSON.parse(ap.details); 
                console.log(details);
                return (<div className={`col-xs-${colItems}`} key={ap.objid}>
                        <div className="panel panel-default">
                            <div className="panel-body">
                            <div>
                                //	
                            </div>	
                                <img className={classNum} src="../images/apartment.jpg" alt="entry" height="80px"/>
                            </div>
                        </div>
                        </div>);})	
            }
        </div>);
	} else {
		return (<div className="row"><div className="col-sm-12"></div></div>);
	}		
  }
  
  //<ButtonPanel buttons={buttons} target="modal" />

  renderFloors( entry ) {
	function compare(a,b) {
		if (a.value < b.value)  return 1;
		if (a.value > b.value)  return -1;
		return 0;
	}
    if (!isUndefined(entry.items)) {
		entry.items.sort(compare);
        return(<div >
          {entry.items.map((it) => {
              var buttons = it.actionx.split(",");
              var details = JSON.parse(ap.details); 
              console.log(details);
              return (<div key={it.value} className="panel panel-default blockche" >
                        <div className="panel-body"> 
                        { this.renderApps(it)}
                        </div>
                        <div className="panel-heading">
                            <Translation text="FLOOR" />: {details.number} 
                            //
                        </div>
                        
                    </div>)
          })}
		</div>
	  );  
	  }	
  }
  //<ButtonPanel buttons={buttons} target="modal" />	
  
  renderEntry( entry ) {
	console.log(entry);	
	var buttons = entry.actionx.split(",");
	return (<div className="panel panel-default">
				<div className="panel-body">
				<div className="row">
					<div className="col-xs-12"><img className="center-block" src="../images/entrance.jpg" alt="entry" height="80px"/></div>
				</div>
				</div>
				<div className="panel-heading">
				&nbsp;
                    <ButtonPanel buttons={buttons} target="modal" objid={entry.objid} type={entry.typename}
                        onViewEntry={this.handleViewClick}
                    />
				</div>
			</div>);
  }
  //<ButtonPanel buttons={buttons} />
  
  render () {
	// console.log(this.props);
	if ( this.props.loadingSpinner) {
		return (<div className="panel panel-default">
			<div className='loader'> <Translation text="Loading" />...</div> 
		</div>);
		
		}
	else {
		const { entry }  = this.props;
        if (!entry) {
            var redirect = '/blocks';
            this.context.router.push(redirect); 
            return(<div>NOT FOUND</div>);
        }
		if (entry.length > 0) {
			let entryNum = entry[0];
			return ( <div className="panel panel-default"> 
					<div className="panel-heading">ADDRESS</div>
					<div className="panel-body">
						{this.renderFloors( entryNum )}	
						{this.renderEntry( entryNum )}
						
					</div>
				</div>);	
		} else {
			return(<div className="panel panel-default"> 
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


