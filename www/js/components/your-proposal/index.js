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
import {metaTagMaster} from '../../module/meta-tag';
import Form from './form';

const globalAppConst = require('./../../app-const');
const topBanner = require('./../../../style/images/order/top-banner.png');
const authConst = require('./../../components/auth/const');

class YourProposal extends Component {
    componentDidMount() {
        metaTagMaster.updateByUrl('/your-proposal');
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {app} = props;
        const {auth} = props;

        return <div className="hug hug--simple-page">
            <h3 className="section__header">Ваши предложения</h3>
            <Form/>
        </div>;
    }
}

export default connect(
    state => ({}),
    {}
)(YourProposal);

