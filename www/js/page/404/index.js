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
const topBanner = require('./../../../style/images/order/top-banner.png');
const authConst = require('./../../components/auth/const.json');

class NotFoundPage extends Component {
    render() {
        const view = this;
        const {props, state} = view;
        const {app} = props;
        const {auth} = props;

        return <div>
            <HeaderSimple/>
            <TopBigBanner backgroundImage={topBanner}>
                <BreadCrumbs>
                    <Link to="/">Главная</Link>
                    {/* <Link to="/trainings">Тренировки</Link>*/}
                    {/* <Link to="/trainings">Мой заказ</Link>*/}
                </BreadCrumbs>
                <h3 className="section__header">404</h3>
            </TopBigBanner>

            <h1>404 Page</h1>
            <h1>404 Page</h1>
            <h1>404 Page</h1>
            <h1>404 Page</h1>
            <h1>404 Page</h1>
            <h1>404 Page</h1>
            <h1>404 Page</h1>
            <h1>404 Page</h1>

            <Footer/>
        </div>;
    }
}

export default connect(
    state => ({
        app: state.app,
        auth: state.auth
    }),
    {}
)(NotFoundPage);

