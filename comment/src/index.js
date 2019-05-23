import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import commentsReducer from './reduers/comments'
import { createStore } from "redux";
import Provider from "react-redux/es/components/Provider";
import { HashRouter as Router, Route } from 'react-router-dom';
import CommentApp from './containers/CommentApp'
import TestApp from './containers/test';

const store = createStore(commentsReducer);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route exact path='/' component={CommentApp} />
            <Route path='/test' component={TestApp} />
        </Router>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
