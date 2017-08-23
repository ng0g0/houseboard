import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './app';
//import store from './redux';
import rootReducer from './reducers';

let store = createStore(rootReducer);

class Start extends React.Component {
    render() {
        return (
          <Provider store={store}>
            <App />
          </Provider>
        );
    }
};

ReactDOM.render(<Start/>, document.getElementById("main"));
