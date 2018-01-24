/* eslint-disable id-length */
// added here to avoid added they to main.js
// if you know better way, please, talk to me. BR, Dmitry Turvotsov

import styles from 'style/css/_root.scss'; // do not remove me

// polyfill
// require('./lib/polyfill/es5-shim');
require('./lib/polyfill/es5-sham');
require('./lib/polyfill/json3');
require('./lib/polyfill/es6-shim');
require('./lib/polyfill/es6-sham.min');
require('./lib/polyfill/es7-shim');

require('./lib/initialize-environment');
require('./lib/swiper');

import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware} from 'redux';

import Dialog from 'material-ui/Dialog';
import {withStyles} from 'material-ui/styles';

// dev tools
import {createDevTools} from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

// libs
require('google-map-react');
require('react-images');
require('react-tabs');
require('lodash/find');
require('lodash/get');
require('react-datepicker');
require('moment');
require('cryptr');
import 'react-datepicker/dist/react-datepicker.css';
