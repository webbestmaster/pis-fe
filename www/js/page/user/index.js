/* global setTimeout, location */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import HeaderSimple from './../../components/header-simple';
import TopBigBanner from './../../components/top-big-banner';
import BreadCrumbs from './../../components/bread-crumbs';
import Footer from './../../components/footer';
import UserShortInfo from './../../components/user-short-info';
import userShortInfoStyle from './../../components/user-short-info/style.m.scss';
import cnx from './../../helper/cnx';
import User from './../../components/user';
import UserClub from './../../components/user/user-club';
import * as authAction from '../../components/auth/action';
import {metaTagMaster} from '../../module/meta-tag';
// import {metaTagMaster} from '../../module/meta-tag';

const globalAppConst = require('./../../app-const');
const topBanner = require('./../../../style/images/user/top-banner.jpg');
const authConst = require('./../../components/auth/const');

const defaultMetaData = {
    title: 'Личный кабинет'
};

class UserPage extends Component {
    componentDidMount() {
        metaTagMaster.updateByUrl('/user', defaultMetaData);

        const view = this;
        const {props, state} = view;
        const {auth} = props;

        if (auth.login.isLogin) {
            return;
        }

        props
            .getSessionState()
            .then(() => {
                if (view.props.auth.login.isLogin) {
                    return;
                }

                (function wait() {
                    if (view.props.auth.login.isLogin) {
                        return;
                    }

                    if (view.props.auth.openPopup === null) {
                        props.openPopupLogin();
                    }
                    setTimeout(wait, 100);
                })();
            });
    }

    renderUser() {
        const view = this;
        const {props, state} = view;
        const {app, auth} = props;
        const {user} = auth.login.data;

        return <div>
            <HeaderSimple/>
            <TopBigBanner backgroundImage={topBanner}>
                <BreadCrumbs>
                    <Link to="/">Главная</Link>
                    <Link to="/user">{defaultMetaData.title}</Link>
                </BreadCrumbs>
                <h1 className="section__header">{[user.first_name, user.last_name].join(' ')}</h1>
            </TopBigBanner>
            {app.screen.width <= globalAppConst.tabletWidth ? null : <UserShortInfo/>}
            <div {...cnx({
                [userShortInfoStyle.left_padded_wrapper]: app.screen.width > globalAppConst.tabletWidth,
                [userShortInfoStyle.left_padded_wrapper__user]: app.screen.width > globalAppConst.tabletWidth
            })}>
                <User/>
            </div>
            <Footer/>
        </div>;
    }

    renderUserClub() {
        const view = this;
        const {props, state} = view;
        const {app, auth} = props;
        const {user} = auth.login.data;

        return <div>
            <HeaderSimple/>
            <TopBigBanner backgroundImage={topBanner}>
                <BreadCrumbs>
                    <Link to="/">Главная</Link>
                    <Link to="/user">Личный кабинет</Link>
                </BreadCrumbs>
                <h1 className="section__header">{[user.first_name, user.last_name].join(' ')}</h1>
            </TopBigBanner>
            {app.screen.width <= globalAppConst.tabletWidth ? null : <UserShortInfo/>}
            <div {...cnx({
                [userShortInfoStyle.left_padded_wrapper]: app.screen.width > globalAppConst.tabletWidth,
                [userShortInfoStyle.left_padded_wrapper__club]: app.screen.width > globalAppConst.tabletWidth
            })}>
                <UserClub/>
            </div>
            <Footer/>
        </div>;
    }

    hardLogout() {
        const view = this;
        const {props, state} = view;

        props.logout().then(() => view.props.history.push('/'));

        return 'Logout...';
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {app} = props;
        const {auth} = props;
        const {login} = auth;

        if (login.code !== 200) {
            return null;
        }

        if (login.data.user.role === authConst.userType.user) {
            return view.renderUser();
        }

        if (login.data.user.role === authConst.userType.fitnessClub) {
            return view.renderUserClub();
        }

        return <h1>Unsupported user type! {view.hardLogout()}</h1>;
    }
}

export default connect(
    state => ({
        app: state.app,
        auth: state.auth
    }),
    {
        getSessionState: authAction.getSessionState,
        logout: authAction.logout,
        openPopupLogin: authAction.openPopupLogin
    }
)(UserPage);

