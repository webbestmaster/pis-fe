/* global setTimeout, IS_DEVELOPMENT */
import React, {Component} from 'react';
import Promo from './popup/promo';
import Register from './popup/register';
import Login from './popup/login';
import Restore from './popup/restore';
import ChangePassword from './popup/change-password';
import {connect} from 'react-redux';
import * as authAction from './action';
import * as authApi from './api';

const authConst = require('./const');
const globalAppConst = require('./../../app-const');

class Auth extends Component {
    componentDidMount() {
        const view = this;

        view.autoLogin();

        setTimeout(() => view.initPromoPopup(), 4 * 60 * 1000);
    }

    autoLogin() {
        const view = this;
        const {props} = view;

        props.getSessionState().then(data => { // eslint-disable-line complexity
            if (data !== null) {
                if (data.data.user.role === authConst.userType.fitnessClub) {
                    props.getClubHomeData();
                }

                /*
                if (data.data.user.role === authConst.userType.user) {
                    props.getUserHomeData();
                }
                */
                return;
            }

            console.log('try to login from session storage');

            const {email, password} = authApi.getUserData();

            if (email && password) {
                view.props.login(email, password);
                return;
            }
            console.log('No saved email or password');
        });
    }

    initPromoPopup() {
        const view = this;
        const {props} = view;
        const {auth, app} = props;

        if (IS_DEVELOPMENT) { // eslint-disable-line id-match
            return;
        }

        if (app.screen.width <= globalAppConst.tabletWidth) {
            console.log('too narrow screen to show promo popup');
            return;
        }

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

        /*
        <InstagramLogin
            scope="comments"
            clientId="aa0687bc325"
            onSuccess={responseInstagram => {
                console.log('responseInstagram++');
                console.log(responseInstagram);
            }}
            onFailure={responseInstagram => {
                console.log('responseInstagram--');
                console.log(responseInstagram);
            }}/>
        */

        return [
            <Promo key="promo" dialog={{open: authConst.popup.promo === popupType}}/>,
            <Register key="register" dialog={{open: authConst.popup.register === popupType}}/>,
            <Login key="login" dialog={{open: authConst.popup.login === popupType}}/>,
            <Restore key="restore" dialog={{open: authConst.popup.restore === popupType}}/>,
            <ChangePassword key="changePassword" dialog={{open: authConst.popup.changePassword === popupType}}/>
        ];
    }
}

export default connect(
    state => ({
        app: state.app,
        auth: state.auth
    }),
    {
        login: authAction.login,
        getSessionState: authAction.getSessionState,
        getClubHomeData: authAction.getClubHomeData,
        getUserHomeData: authAction.getUserHomeData,
        openPopupPromo: authAction.openPopupPromo
    }
)(Auth);
