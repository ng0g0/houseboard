import React, { Component } from 'react';
import AddBlock from '../blocks/block-add';
import AddEntrance from '../blocks/entry-add';
import { addBlockConst,  viewInfoConst, DeleteConst, AddEntranceConst, BLOCK, ENTRANCE} from '../../consts';
import Translation from '../locale/translate';


class BlockLayer extends Component {
    render() {
        //console.log(this.props);
        if (this.props.layercalled === addBlockConst) {
            return (<AddBlock objid={this.props.objid} />);
        }
        if (this.props.layercalled === viewInfoConst) {
            return (<AddBlock objid={this.props.objid} />);
        }
        if (this.props.layercalled === DeleteConst) {
            switch(this.props.type) {
                case BLOCK: 
                    return (<div><Translation text={'DELETE_BLOCK_QUESTION'} /> </div>);
                    break;
                case ENTRANCE:
                    return (<div><Translation text={'DELETE_ENTRY_QUESTION'} /> </div>);
                    break;
                default:
                    return (<div><Translation text={'DELETE_QUESTION'} /> </div>);
            }                
            
        }
        if ( this.props.layercalled === AddEntranceConst) {
            return (<AddEntrance />);
        }
        return (<div> test </div>);
        
    }
}

export default BlockLayer;


