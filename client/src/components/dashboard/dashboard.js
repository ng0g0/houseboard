import React, { Component } from 'react';
//import { Link } from 'react-router';
import { connect } from 'react-redux';
//import cookie from 'react-cookie';
//import { protectedTest } from '../../actions/auth';
import { fetchEntryList } from '../../actions/entry';
import {bindActionCreators} from 'redux';
import EntryList from '../entry/Entrylist';
import Translation from '../locale/translate';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
	if (!this.props.entry) {
		this.props.dispatch(fetchEntryList());
	}
  }
  
  render() {
	  if ( this.props.loadingSpinner ) {
		return (<div className='loader'><Translation text="Loading" />...</div>);
	} else {
		console.log(this.props);
		return (
		<div>
		<h2> <Translation text="BLOCK_LIST" />	</h2>
		<EntryList entry={this.props.entry} />
		</div>
		);	
	}
    
  }
}

function mapStateToProps(state) {
	//console.log(state);
  return {
    entry: state.entry.entry,	
	locale: state.lang.locale,
	errorMessage: state.entry.error,
	loadingSpinner: state.entry.loadingSpinner
  };
}

const mapDispatchToProps = (dispatch) =>   
  bindActionCreators({
    fetchEntryList
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

