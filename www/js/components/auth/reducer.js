import {combineReducers} from 'redux';

const authConst = require('./const');

export default combineReducers({
    login: (login = {}, {type, payload}) => {
        if (type !== authConst.type.login) {
            return login;
        }

        return {...login, ...payload.login};
    },
    homeData: (homeData = {}, {type, payload}) => {
        if (type !== authConst.type.homeData) {
            return homeData;
        }

        return {...homeData, ...payload.homeData};
    },
    clubData: (clubData = {}, {type, payload}) => {
        if (type !== authConst.type.clubData) {
            return clubData;
        }

        return {...clubData, ...payload.clubData};
    },
    clubFeedback: (clubFeedback = {}, {type, payload}) => {
        if (type !== authConst.type.clubFeedback) {
            return clubFeedback;
        }

        return {...clubFeedback, ...payload.clubFeedback};
    },
    registration: (registration = {}, {type, payload}) => {
        if (type !== authConst.type.registration) {
            return registration;
        }

        return {...registration, ...payload.registration};
    },
    forgotPassword: (forgotPassword = {}, {type, payload}) => {
        if (type !== authConst.type.forgotPassword) {
            return forgotPassword;
        }

        return {...forgotPassword, ...payload.forgotPassword};
    },
    resetPassword: (resetPassword = {}, {type, payload}) => {
        if (type !== authConst.type.resetPassword) {
            return resetPassword;
        }

        return {...resetPassword, ...payload.resetPassword};
    },
    userProfile: (userProfile = {}, {type, payload}) => {
        if (type !== authConst.type.userProfile) {
            return userProfile;
        }

        return {...userProfile, ...payload.userProfile};
    },
    openPopup: (popupType = null, {type, payload}) => {
        if (type !== authConst.type.openPopup) {
            return popupType;
        }

        return payload.popupType;
    }
});
