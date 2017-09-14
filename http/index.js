import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//import { createStore } from 'redux';
import {compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import App from './app';
//import store from './redux';
import rootReducer from './reducers';

//let store = createStore(rootReducer);
const createAppStore = compose(applyMiddleware(thunkMiddleware))(createStore);

const store = createAppStore(rootReducer);

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
