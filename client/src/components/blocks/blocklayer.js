import React, { Component } from 'react';
import AddBlock from '../blocks/block-add';
import { addBlockConst,  viewInfoConst, DeleteConst} from '../../consts';
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
            return (<div><Translation text={'DELETE_BLOCK_QUESTION'} /> </div>);
        }
        return (<div> test </div>);
        
    }
}

export default BlockLayer;


