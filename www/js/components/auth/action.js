/* global fetch, window, FormData */
import * as authApi from './api';
import * as fileApi from './../../helper/file';
// import {progressiveFetch} from './../../helper/file';
const appGlobalConst = require('./../../app-const');
const authConst = require('./const');

export function getSessionState() {
    if (appGlobalConst.isTest) {
        return dispatch => Promise.resolve({data: {user: {}}});
    }

    return dispatch => fetch(
        appGlobalConst.pageDataUrl.host + authConst.url.sessionState,
        {credentials: 'include', method: 'GET'})
        .then(data => data.json())
        .then(parsedData => {
            if (!parsedData.data.user || parsedData.data.user instanceof Array && parsedData.data.user.length === 0) {
                return null;
            }

            dispatch({type: authConst.type.login, payload: {login: Object.assign(parsedData, {isLogin: true})}});
            return parsedData;
        });
}

export function getUserHomeData() {
    return dispatch => fetch(
        appGlobalConst.pageDataUrl.host + authConst.url.userHomeData,
        {credentials: 'include', method: 'GET'})
        .then(data => data.json())
        .then(parsedData => {
            if (!parsedData.data.user || parsedData.data.user instanceof Array && parsedData.data.user.length === 0) {
                return null;
            }

            console.log('user', parsedData);

            dispatch({type: authConst.type.homeData, payload: {homeData: parsedData}});
            return parsedData;
        });
}

export function getClubHomeData() {
    return dispatch => fetch(
        appGlobalConst.pageDataUrl.host + authConst.url.clubHomeData,
        {credentials: 'include', method: 'GET'})
        .then(data => data.json())
        .then(parsedData => {
            console.log('club data', parsedData);

            dispatch({type: authConst.type.clubData, payload: {clubData: parsedData}});
            return parsedData;
        });
}

export function getClubFeedbackList() {
    return dispatch => fetch(
        appGlobalConst.pageDataUrl.host + authConst.url.clubFeedbackList,
        {credentials: 'include', method: 'GET'})
        .then(data => data.json())
        .then(parsedData => {
            console.log('club feedback list', parsedData);

            dispatch({type: authConst.type.clubFeedback, payload: {clubFeedback: parsedData}});
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
        .then(parsedData => dispatch({
            type: authConst.type.login,
            payload: {login: Object.assign(parsedData, {isLogin: true})}
        }));
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

export function addToFavorite(type, itemId) {
    return dispatch => fetch(
        appGlobalConst.pageDataUrl.host +
        authConst.url.addToFavorite
            .replace('{{type}}', type)
            .replace('{{itemId}}', itemId),
        {credentials: 'include', method: 'POST'})
        .then(data => dispatch(getSessionState()).then(() => data.json()));
}

export function addToFavoriteClub(itemId) {
    return addToFavorite('club', itemId);
}

export function addToFavoriteTraining(itemId) {
    return addToFavorite('training', itemId);
}

export function addToFavoriteSubscription(itemId) {
    return addToFavorite('subscription', itemId);
}

export function removeFromFavorite(favoriteItemId) {
    return dispatch => fetch(
        appGlobalConst.pageDataUrl.host +
        authConst.url.removeFromFavorite
            .replace('{{favoriteItemId}}', favoriteItemId),
        {credentials: 'include', method: 'POST'})
        .then(data => dispatch(getSessionState()).then(() => data.json()));
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
    return dispatch => fileApi.loadImage(file, {maxWidth: 1000, maxHeight: 1000, orientation: true})
        .then(canvas => {
            const formData = new FormData();

            formData.append('image', fileApi.fromCanvasToAvatarFile(canvas));

            return fetch(appGlobalConst.pageDataUrl.host + authConst.url.updateProfileImage,
                {method: 'POST', credentials: 'include', body: formData})
                .then(rawData => rawData.json());
        });
}

export function createClubAnswer(reviewId, answer) {
    return dispatch => fetch(appGlobalConst.pageDataUrl.host + authConst.url.createClubAnswer
        .replace('{{reviewId}}', reviewId)
        .replace('{{answer}}', answer),
    {credentials: 'include', method: 'POST'})
        .then(data => data.json());
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
