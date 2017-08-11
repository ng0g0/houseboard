import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header';
import BlockList from './components/BlockList';

import axios from 'axios';
const baseURL = "";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.addBlock = this.addBlock.bind(this);
        this.state = {
            blocks: [],
            total: 0
//            pollInterval: 2000
        };
    }
    componentDidMount() {
        this.setState({userid: 0});
        this.findUserBuildings(0);
//        setInterval(this.findUserBuildings(this.state.userid), this.state.pollInterval);
    }
    addBlock() {
      const url = baseURL + "/api/block";
      axios.post(url)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
      this.findUserBuildings(0);
    }
    
    onOpenObject(objectid) {
        this.setState({userid: objectid});
        this.findUserBuildings(objectid);
    }
    
    findUserBuildings(id) {
      let that = this;
      console.log(id);
      const url = baseURL + "/api/block/" + id;
      axios.get(url)
        .then(function (response) {
          console.log(response);
          that.setState({
                    blocks: response.data.blocks,
                    total: response.data.total
                });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    

    render() {
        return (
            <div>
                <Header text="Building Board Managment"/>
                <div>
                <BlockList 
                  blocks={this.state.blocks} 
                  onOpenObject={this.onOpenObject.bind(this)} 
                  onAddObject={this.addBlock.bind(this)}/>
              </div>
            </div>
        );
    }
};

ReactDOM.render(<App/>, document.getElementById("main"));
