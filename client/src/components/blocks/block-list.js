import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBlockList, fetchBlockInfo, deleteBlock } from '../../actions/blocks';
import { viewEntry } from '../../actions/entry';
import {bindActionCreators} from 'redux';
import Translation from '../locale/translate';
import {Redirect} from 'react-router';
import ButtonPanel from '../template/btnpanel';
//import LayerMask from '../layerMask/layermask';
import AccordionPanel from '../accordion';
import PropTypes from 'prop-types'; // ES6
import { blocksTarget,viewInfoConst,DeleteConst } from '../../consts';


class BlockList extends Component {
	static contextTypes = {
		router: PropTypes.object,
	}
	
	constructor(props) {
		super(props);
		this.handleViewClick = this.handleViewClick.bind(this);
	}
  
  
  
	componentDidMount() {
		if (!this.props.block) {
			this.props.dispatch(fetchBlockList());
		}
	}
	
	handleViewClick(target, objid, label ) {
        console.log(label);
		if (target === blocksTarget) {
           var redirect = `/${target}/${objid}`;
            //console.log(redirect);
            this.props.dispatch(viewEntry(objid));
            this.context.router.push(redirect); 
        } else {
            switch(label) {
                case viewInfoConst:
                    this.props.dispatch(fetchBlockInfo(objid));    
                    break;
                //case DeleteConst:
                //    this.props.dispatch(deleteBlock(objid));    
                //    break;
                default:
                    console.log(label);
            }
        }
        
	}
	
	renderBlockItems( block) {
        //console.log('renderBlockItems');
        if (block.items) {
            //console.log(block);
            return (<div className="panel-body">
            {block.items.map((it) => {
                var buttons = it.actionx.split(",");
                var details = JSON.parse(it.details);
                //console.log(buttons);
                return (<div key={it.objid.toString()} className="panel panel-default">
                        <div className="panel-body"> 
                        <Translation text="ENTRY_NUMBER" />:{details.NUMBER}
                        <ButtonPanel buttons={buttons} objid={it.objid} target="blocks" 
                        onViewEntry={this.handleViewClick} 
                        />
                        </div>
                    </div>);
            })}
            </div>);
        }
		else {
			return(<div className="panel-body"><Translation text="NO_DATE_FOUND" /></div>);
		}
		
	}
	
	renderListContent(item) {
		if (item) {
            //console.log(item);
			return (<div className="panel-body">
				{item.map((block) => {
					var buttons = block.actionx.split(",");
                    var details = JSON.parse(block.details);
                   // console.log(details);
					return (
                        <AccordionPanel objid={block.objid} title={details.NAME} buttons={buttons} key={block.objid}
							handleViewClick={this.handleViewClick}>
                           {  this.renderBlockItems(block)}
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
			<ButtonPanel buttons={buttons} target="modal" objid="0" 
                onViewEntry={this.handleViewClick}
            />
		</div>);
	}
  
  
  
  render() {
	  if ( this.props.loadingSpinner ) {
		return (<div className='loader'><Translation text="Loading" />...</div>);
	} else {
		 const { block} = this.props;
         //console.log(block);
		return (<div>
		<h2> <Translation text="BLOCK_LIST" />	</h2>
            <div className="panel panel-default">
			{this.renderListHeader()}
			{this.renderListContent(block)}
			</div>
		</div>);	
	}
    
  }
}



function mapStateToProps(state) {
  return {
    block: state.block.data,	
	errorMessage: state.block.error,
	loadingSpinner: state.block.loadingSpinner
  };
}

const mapDispatchToProps = (dispatch) =>   
  bindActionCreators({
    fetchBlockList,
	viewEntry,
    fetchBlockInfo,
    deleteBlock
  }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(BlockList);

