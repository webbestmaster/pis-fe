/* global setTimeout */
import React, {Component} from 'react';
import Promo from './popup/promo';
import Register from './popup/register';
import Login from './popup/login';
import Restore from './popup/restore';
import {connect} from 'react-redux';
import * as authAction from './action';
import * as authApi from './api';

const authConst = require('./const.json');

// import {getLoginStatus} from './api';

// http://site.katran.by/api/auth/login?email=test@test.test&password=111111
// http://site.katran.by/api/auth/forgotPassword?email=test@t123123est.test - сброс пароля

// http://site.katran.by/api/auth/resetPassword?token=1test@t123123est.test&password=XXXXX&password_confirmation=XXXXX
// http://site.katran.by/api/auth/logout - выход

class Auth extends Component {
    componentDidMount() {
        const view = this;

        view.autoLogin();

        setTimeout(() => view.initPromoPopup(), 4 * 60 * 1000);
    }

    autoLogin() {
        const view = this;
        const {email, password} = authApi.getUserData();

        if (email && password) {
            view.props.login(email, password);
            return;
        }

        console.log('No saved email or password');
    }

    initPromoPopup() {
        const view = this;
        const {props} = view;
        const {auth} = props;

        if (auth.openPopup !== null) {
            console.log('some popup is open');
            return;
        }

        if (auth.login.code === 200) {
            console.log('already logged');
            return;
        }

        props.openPopupPromo();
    }

    render() {
        const view = this;
        const {props} = view;
        const {auth} = props;
        const popupType = auth.openPopup;

        return [
            <Promo key="promo" dialog={{open: authConst.popup.promo === popupType}}/>,
            <Register key="register" dialog={{open: authConst.popup.register === popupType}}/>,
            <Login key="login" dialog={{open: authConst.popup.login === popupType}}/>,
            <Restore key="restore" dialog={{open: authConst.popup.restore === popupType}}/>
        ];
    }
}

export default connect(
    state => ({
        auth: state.auth
    }),
    {
        login: authAction.login,
        openPopupPromo: authAction.openPopupPromo
    }
)(Auth);
