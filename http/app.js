import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header';
import BlockList from './components/BlockList';
import * as productService from './services/product-service';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blocks: [],
            total: 0
        }
    }
    componentDidMount() {
        this.setState({userid: 0});
        this.findUserBuildings(0);
    }
    addBlock() {
      productService.addBlock();
      this.findUserBuildings(0);
    }
    
    onOpenObject(objectid) {
        this.setState({userid: objectid});
        this.findUserBuildings(objectid);
    }
    
    findUserBuildings(id) {
      productService.findBlockList({id: id})
            .then(data => {
                this.setState({
                    blocks: data.blocks,
                    total: data.total
                });
            });
    }

    render() {
        return (
            <div>
                <Header text="Building Board Managment"/>
                <div className="slds-grid slds-p-top--small slds-grid--align-right">
                    <button type="button" onClick={this.addBlock.bind(this)} >
                      Add Block      
                    </button>     
                </div>
                <div>
                <BlockList blocks={this.state.blocks} onOpenObject={this.onOpenObject.bind(this)}/>
              </div>
            </div>
        );
    }
};

ReactDOM.render(<App/>, document.getElementById("main"));
