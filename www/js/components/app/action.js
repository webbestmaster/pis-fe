/* global window */
const appConst = require('./const.json');

export function scrollToTop() {
    window.scrollTop = 0;
    window.document.body.scrollTop = 0;
    window.document.documentElement.scrollTop = 0;

    return {
        type: appConst.type.scrollToTop,
        payload: null
    };
}

