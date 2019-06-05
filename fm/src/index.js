import React from 'react';
import ReactDOM from 'react-dom';
import Provider from 'react-redux/es/components/Provider';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import './index.css';

import configureStore from './stores/configureStore';


import ComponentApp from './containers/ComponentApp';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route path="/" component={ComponentApp} />
        </Router>
    </Provider >,
    document.getElementById('root')
);

serviceWorker.unregister();
