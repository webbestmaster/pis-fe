/* global document */
// polyfill
require('./polyfill/es5-sham');
require('./polyfill/json3');
require('./polyfill/es6-shim');
require('./polyfill/es6-sham.min');
require('./polyfill/es7-shim');
require('whatwg-fetch');
import 'react-datepicker/dist/react-datepicker.css';

/* global window */
import es6Promise from 'es6-promise';

es6Promise.polyfill();

import FastClick from 'fastclick';

function addFont(fontLink) {
    const linkTag = document.createElement('link');
    linkTag.setAttribute('href', fontLink);
    linkTag.setAttribute('rel', 'stylesheet');
    document.head.appendChild(linkTag);
}

function addFontList() {
    const fontList = [
        'https://fonts.googleapis.com/css?family=Ubuntu',
        'https://fonts.googleapis.com/css?family=Anonymous+Pro'
    ];

    fontList.forEach(addFont);
}

function initializeEnvironment() {
    const doc = window.document;

    FastClick.attach(doc.body);
    addFontList();
}

initializeEnvironment();

module.exports = initializeEnvironment;
