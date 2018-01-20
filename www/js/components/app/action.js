/* global window */
const appConst = require('./const.json');

export function scrollToTop() {
    window.scrollTo(0, 0);
    window.document.body.scrollTo(0, 0);

    return {
        type: appConst.type.scrollToTop,
        payload: null
    };
}

