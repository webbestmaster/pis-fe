import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';
import HeaderSimple from './../../components/header-simple';
import TopBigBanner from './../../components/top-big-banner';
import BreadCrumbs from './../../components/bread-crumbs';
import TrainingsCatalog from './../../components/trainings-catalog';
import Footer from './../../components/footer';
const topBanner = require('./../../../style/images/user/top-banner.png');

import UserShortInfo from './../../components/user-short-info';

export default class User extends Component {
    render() {
        const view = this;
        // const {props, state} = view;
        // const {app} = props;

        return <div>

            <UserShortInfo />

            other user data
        </div>;
    }
}
