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
import OrderTraining from './../../components/order-training';
import {metaTagMaster} from '../../module/meta-tag';

const globalAppConst = require('./../../app-const.json');
const topBanner = require('./../../../style/images/order/top-banner.png');
const authConst = require('./../../components/auth/const.json');

class OrderPage extends Component {
    componentDidMount() {
        metaTagMaster.updateByUrl('/make-order');
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {app} = props;
        const {auth, match} = props;

        return <div>
            <HeaderSimple/>
            <TopBigBanner backgroundImage={topBanner}>
                <BreadCrumbs>
                    <Link to="/">Главная</Link>
                    <Link to="/trainings">Тренировки</Link>
                    <Link to={match.url}>Мой заказ</Link>
                </BreadCrumbs>
                <h3 className="section__header">Мой заказ</h3>
            </TopBigBanner>

            <OrderTraining/>

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
)(OrderPage);

