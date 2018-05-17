/* global window */
require('./lib/initialize-environment');
import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

import App from './components/app';
import {initAppScreenHelper} from './components/app/helper';

import * as reducers from './reducer';

const reducer = combineReducers({
    ...reducers
});

const composeEnhancers = composeWithDevTools({
    // options like actionSanitizer, stateSanitizer
});

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    window.document.querySelector('.js-app-wrapper')
);

export {store};

initAppScreenHelper();
