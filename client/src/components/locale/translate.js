import React, { Component } from 'react';
import cookie from 'react-cookie';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { TRANSLATIONS } from './locale';

class Translation extends Component {
	constructor(props) {
    super(props);
    this.state = {
      translation: '',
    };
  }


	componentDidMount() {
		let local = cookie.load('i18n');
		//console.log(local);
		if (!local) {
			local = this.props.locale || 'en';
		}
		//console.log(local);
		if ((local) && (this.props.text)) {
			this.setState({ translation: TRANSLATIONS[local][this.props.text]});
		} else  {
			this.setState({ translation: this.props.text});
		}
	}
	
  render() {
    return (<span>{this.state.translation}</span>);
  }
}

function mapStateToProps(state) {
  return {
    locale: state.lang.locale
  };
}

const props = {
  text: 'hello', // is valid
  locale: 'bg', // not valid
};

Translation.propTypes = {
  text: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired
};

PropTypes.checkPropTypes(Translation.propTypes, props, 'prop', 'Translation');

export default connect(mapStateToProps, null)(Translation);


