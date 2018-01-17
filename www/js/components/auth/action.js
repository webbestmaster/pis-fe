/* global fetch */
const appGlobalConst = require('./../../app-const.json');
const authConst = require('./const.json');

export function login(email, password) {
    return dispatch => fetch(appGlobalConst.pageDataUrl.host + authConst.url.login
        .replace('{{email}}', email || 'email@email.email')
        .replace('{{password}}', password || 'password'))
        .then(data => data.json())
        .then(parsedData => dispatch({type: authConst.type.login, payload: {login: parsedData}}));
}

export function registration(regData) {
    const registerStr = Object.keys(regData).map(key => key + '=' + regData[key]).join('&');

    return dispatch => fetch(appGlobalConst.pageDataUrl.host + authConst.url.registration + '?' + registerStr)
        .then(data => data.json())
        .then(parsedData => dispatch({type: authConst.type.registration, payload: {registration: parsedData}}));
}

export function forgotPassword(email) {
    return dispatch => fetch(appGlobalConst.pageDataUrl.host + authConst.url.forgotPassword + '?' + 'email=' + email)
        .then(data => data.json())
        .then(parsedData => dispatch({type: authConst.type.forgotPassword, payload: {forgotPassword: parsedData}}));
}

export function resetPassword(token, password) {
    return dispatch => fetch(appGlobalConst.pageDataUrl.host + authConst.url.resetPassword + '?' +
        'token=' + token +
        '&password=' + password +
        '&password_confirmation=' + password)
        .then(data => data.json())
        .then(parsedData => dispatch({type: authConst.type.resetPassword, payload: {resetPassword: parsedData}}));
}

export function openPopup(popupType) {
    return {
        type: authConst.type.openPopup,
        payload: {popupType}
    };
}

export function closePopup() {
    return {
        type: authConst.type.openPopup,
        payload: {popupType: null}
    };
}

export function openPopupLogin() {
    return {
        type: authConst.type.openPopup,
        payload: {popupType: authConst.popup.login}
    };
}

export function openPopupRegister() {
    return {
        type: authConst.type.openPopup,
        payload: {popupType: authConst.popup.register}
    };
}

export function openPopupRestore() {
    return {
        type: authConst.type.openPopup,
        payload: {popupType: authConst.popup.restore}
    };
}

export function openPopupPromo() {
    return {
        type: authConst.type.openPopup,
        payload: {popupType: authConst.popup.promo}
    };
}

