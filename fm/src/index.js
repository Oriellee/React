import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import Provider from 'react-redux/es/components/Provider';
import { BrowserRouter, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import './index.css';
import MusicReducer from './reducers/MusicReducer.js';
import IndexContainer from './containers/IndexContainer';
import TestContainer from './containers/TestContainer';


const store = createStore(MusicReducer);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route exact path='/index' component={IndexContainer} />
            <Route path='/test' component={TestContainer} />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
