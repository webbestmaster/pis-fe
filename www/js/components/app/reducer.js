/* global window */
import {combineReducers} from 'redux';

const appConst = require('./const.json');

const docElem = window.document.documentElement;

export default combineReducers({
    screen: (screenState = {width: docElem.clientWidth, height: docElem.clientHeight}, {type, payload}) => {
        if (type !== appConst.type.setScreenSize) {
            return screenState;
        }

        return {
            width: payload.width,
            height: payload.height
        };
    },
    window: (windowState = {isLoad: false}, {type, payload}) => {
        if (type !== appConst.type.window) {
            return windowState;
        }

        return {...windowState, ...payload.window};
    }
});
