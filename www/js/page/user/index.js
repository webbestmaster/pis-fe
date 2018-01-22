import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';
import HeaderSimple from './../../components/header-simple';
import TopBigBanner from './../../components/top-big-banner';
import BreadCrumbs from './../../components/bread-crumbs';
import TrainingsCatalog from './../../components/trainings-catalog';
import Footer from './../../components/footer';
import UserShortInfo from './../../components/user-short-info';
import userShortInfoStyle from './../../components/user-short-info/style.m.scss';
import cnx from './../../helper/cnx';
import User from './../../components/user';
import UserClub from './../../components/user/user-club';

const globalAppConst = require('./../../app-const.json');
const topBanner = require('./../../../style/images/user/top-banner.png');
const authConst = require('./../../components/auth/const.json');

class UserPage extends Component {
    renderUser() {
        const view = this;
        const {props, state} = view;
        const {app} = props;

        return <div>
            <HeaderSimple/>
            {app.screen.width <= globalAppConst.tabletWidth ? null : <UserShortInfo/>}
            <div {...cnx({[userShortInfoStyle.left_padded_wrapper]: app.screen.width > globalAppConst.tabletWidth})}>
                <TopBigBanner backgroundImage={topBanner}>
                    <BreadCrumbs>
                        <Link to="/">Главная</Link>
                        <Link to="/user">Личный кабинет</Link>
                    </BreadCrumbs>
                    <h3 className="section__header">Личный кабинет</h3>
                </TopBigBanner>
                <User/>
            </div>
            <Footer/>
        </div>;
    }

    renderUserClub() {
        const view = this;
        const {props, state} = view;
        const {app} = props;

        return <div>

            <HeaderSimple/>
            {app.screen.width <= globalAppConst.tabletWidth ? null : <UserShortInfo/>}
            <div {...cnx({[userShortInfoStyle.left_padded_wrapper]: app.screen.width > globalAppConst.tabletWidth})}>
                <TopBigBanner backgroundImage={topBanner}>
                    <BreadCrumbs>
                        <Link to="/">Главная</Link>
                        <Link to="/user">Личный кабинет</Link>
                    </BreadCrumbs>
                    <h3 className="section__header">----------- Личный кабинет -----------</h3>
                </TopBigBanner>

                <UserClub/>

            </div>
            <Footer/>
        </div>;
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

        return <h1>unsupported user type</h1>;
    }
}

export default connect(
    state => ({
        app: state.app,
        auth: state.auth
    }),
    {}
)(UserPage);

