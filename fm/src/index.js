import React from 'react';
import ReactDOM from 'react-dom';
import Provider from 'react-redux/es/components/Provider';
import { HashRouter as Router, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import './index.css';

import configureStore from './stores/configureStore';


import MainContainer from './containers/MainContainer';
import TestContainer from './containers/TestContainer';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route exact path='/' component={MainContainer} />
            <Route path='/test' component={TestContainer} />
        </Router>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
