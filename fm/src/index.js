import React from 'react';
import ReactDOM from 'react-dom';
import Provider from 'react-redux/es/components/Provider';
import { HashRouter as Router, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import './index.css';

import configureStore from './stores/configureStore';


import ComponentApp from './containers/ComponentApp';
import HomeContainer from './containers/HomeContainer';
import TestContainer from './containers/TestContainer';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route path='/' component={ComponentApp} >
                <Route exact path='/home' component={HomeContainer} />
                <Route path='/test' component={TestContainer} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
