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

const globalAppConst = require('./../../app-const.json');
const topBanner = require('./../../../style/images/user/top-banner.png');

import User from './../../components/user';

class UserPage extends Component {
    render() {
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
}

export default connect(
    state => ({
        app: state.app
    }),
    {}
)(UserPage);

