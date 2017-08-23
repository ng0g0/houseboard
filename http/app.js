import React from 'react';
//import ReactDOM from 'react-dom';

import Header from './components/Header';
import BlockList from './components/BlockList';
import block from './services/block';
import LoginInfo from './components/info';
import { connect } from 'react-redux';
import Login from './components/login';


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
          ,setupComplete: false
        };
    }
    componentDidMount() {
      this.setState({userid: 0});
      this.findUserBuildings(0);
//        setInterval(this.findUserBuildings(this.state.userid), this.state.pollInterval);
    }
    addBlock() {
      axios.all([block.AddObjectBlock()]);
      this.findUserBuildings(0);
    }
    
    onOpenObject(objectid) {
        this.setState({userid: objectid});
        this.findUserBuildings(objectid);
    }
    
    findUserBuildings(id) {
      let that = this;
      axios.all([block.getblockObject(id)])
        .then(function(response) {
          that.setState(
            { 
              blocks: response[0].data.blocks, 
               total: response[0].data.total, 
               setupComplete:true 
             }
          );
        });    
    }
    
    renderMainSent() {
      if (this.props.emailsent) {
      return(<div> Password was sent to your email! </div>
      );
      }
    }
    
    renderContent() {
      if ( this.state.setupComplete ) {
          return (<div className='container'>
            <BlockList 
              blocks={this.state.blocks} 
              onOpenObject={this.onOpenObject.bind(this)} 
              onAddObject={this.addBlock.bind(this)}/>
            </div>);
      } else {
        return (<div className='loader'> Loading...</div> );
        }
    }

    render() {
      if (this.props.isLoggedIn) {
        return (<div>
          <Header text="Building Board Managment"/>
          <LoginInfo />
          {this.renderContent()}
        </div>);
      } else {
        return (<div>
          <Header text="Building Board Managment"/>
          {this.renderMainSent()}
          <Login />
	</div>);
        }
    }
}

    const mapStateToProps = (state, ownProps) => {
      return {
        isLoggedIn: state.auth.isLoggedIn,
        emailsent: state.auth.emailsent
      };
    };

export default connect(mapStateToProps)(App);
