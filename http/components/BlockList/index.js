import React from 'react';
import BlocktListItem from './BlocktListItem';

class BlockList extends React.Component {
  render() {
    let listItems = this.props.blocks.map(blocks =>
       <BlocktListItem key={blocks.objid} block={blocks} onOpenObject={this.props.onOpenObject}/>
    );
    return (
      <div className="slds-grid slds-wrap slds-m-horizontal--large">
        {listItems}
      </div>
    );
  }
};

export default BlockList;