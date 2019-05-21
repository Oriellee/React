import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import Provider from 'react-redux/es/components/Provider';
import { BrowserRouter, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import './index.css';

import configureStore from './stores/configureStore';


import MainContainer from './containers/MainContainer';
import TestContainer from './containers/TestContainer';


const store = createStore(configureStore);
console.log(configureStore,"----------")

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route exact path='/' component={MainContainer} />
            <Route path='/test' component={TestContainer} />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
