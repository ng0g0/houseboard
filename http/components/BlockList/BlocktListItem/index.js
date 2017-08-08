import React from 'react';

class BlocktListItem extends React.Component {

  linkHandler(id, e) {
      this.props.onOpenObject(id);
      return false;
  }

  render() {
      let link;
      link = "/block/" + this.props.block.objid;
      return (
          <div className="slds-col slds-p-around--xx-small slds-small-size--1-of-1 slds-medium-size--1-of-2 slds-large-size--1-of-4" 
              key={this.props.block.objid}>
              <div className="slds-card slds-card--narrow">
                <div className="slds-media__figure">
                  <a href="#" onClick={this.linkHandler.bind(this, this.props.block.objid )}> 
                    <img src="images/block.png" />
                  </a>
                </div>
              </div>
          </div>
      );
  }
};

export default BlocktListItem;

