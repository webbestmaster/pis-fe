/* global document */

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
    const doc = document;

    FastClick.attach(doc.body);
    addFontList();
}

initializeEnvironment();

module.exports = initializeEnvironment;
