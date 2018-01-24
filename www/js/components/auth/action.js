/* global fetch, window */
import * as authApi from './api';
import {progressiveFetch} from './../../helper/file';

const appGlobalConst = require('./../../app-const.json');
const authConst = require('./const.json');

export function getSessionState() {
    return dispatch => fetch(
        appGlobalConst.pageDataUrl.host + authConst.url.sessionState,
        {credentials: 'include', method: 'GET'})
        .then(data => data.json())
        .then(parsedData => {
            if (!parsedData.data.user || parsedData.data.user instanceof Array && parsedData.data.user.length === 0) {
                return null;
            }

            dispatch({type: authConst.type.login, payload: {login: parsedData}});
            return parsedData;
        });
}

export function login(email, password) {
    if (!email || !password) {
        return () => console.warn('No email or password');
    }

    return dispatch => fetch(
        appGlobalConst.pageDataUrl.host +
        authConst.url.login.replace('{{email}}', email).replace('{{password}}', password),
        {credentials: 'include', method: 'POST'})
        .then(data => data.json())
        .then(parsedData => dispatch({type: authConst.type.login, payload: {login: parsedData}}));
}

export function logout() {
    return dispatch => fetch(
        appGlobalConst.pageDataUrl.host +
        authConst.url.logout,
        {credentials: 'include', method: 'GET'})
        .then(data => data.json())
        .then(() => {
            authApi.setUserData({email: null, password: null});
            window.location.reload();
        });
}

export function registration(regData) {
    const registerStr = Object.keys(regData).map(key => key + '=' + regData[key]).join('&');

    return dispatch => fetch(appGlobalConst.pageDataUrl.host + authConst.url.registration + '?' + registerStr,
        {credentials: 'include', method: 'POST'})
        .then(data => data.json())
        .then(parsedData => dispatch({type: authConst.type.registration, payload: {registration: parsedData}}));
}

export function forgotPassword(email) {
    return dispatch => fetch(appGlobalConst.pageDataUrl.host + authConst.url.forgotPassword + '?' + 'email=' + email,
        {credentials: 'include', method: 'POST'})
        .then(data => data.json())
        .then(parsedData => dispatch({type: authConst.type.forgotPassword, payload: {forgotPassword: parsedData}}));
}

export function resetPassword(token, password) {
    return dispatch => fetch(appGlobalConst.pageDataUrl.host + authConst.url.resetPassword + '?' +
        'token=' + token +
        '&password=' + password +
        '&password_confirmation=' + password,
    {credentials: 'include', method: 'POST'})
        .then(data => data.json())
        .then(parsedData => dispatch({type: authConst.type.resetPassword, payload: {resetPassword: parsedData}}));
}

export function updateProfile(userData) {
    const userDataStr = Object.keys(userData).map(key => key + '=' + userData[key]).join('&');

    return dispatch => fetch(appGlobalConst.pageDataUrl.host + authConst.url.updateProfile + '?' + userDataStr,
        {credentials: 'include', method: 'POST'})
        .then(data => data.json())
        .then(parsedData => dispatch({type: authConst.type.userProfile, payload: {userProfile: parsedData}}));
}

export function uploadUserAvatar(file) {
    return dispatch => progressiveFetch(appGlobalConst.pageDataUrl.host + '/member/user/updateProfileImage',
        {
            method: 'POST',
            credentials: 'include',
            body: {
                image: file
            },
            headers: {'Content-Disposition': 'attachment; filename=' + '"' + file.name + '"'}
        },
        console.log);
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

export function openPopupChangePassword() {
    return {
        type: authConst.type.openPopup,
        payload: {popupType: authConst.popup.changePassword}
    };
}

export function openPopupPromo() {
    return {
        type: authConst.type.openPopup,
        payload: {popupType: authConst.popup.promo}
    };
}
