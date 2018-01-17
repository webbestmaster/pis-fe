import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';
import HeaderSimple from './../../components/header-simple';
import TopBigBanner from './../../components/top-big-banner';
import BreadCrumbs from './../../components/bread-crumbs';
import SubscriptionsCatalog from './../../components/subscriptions-catalog';
import Footer from './../../components/footer';
import Training from './../../components/training';

const isEqual = require('lodash/isEqual');
const appConst = require('./../../app-const.json');
const {fetchX} = require('./../../helper/fetch-x');
const topBanner = require('./../../../style/images/club/top-banner.png');

export default class Terms extends Component {
    constructor() {
        super();

        const view = this;
    }

    render() {
        const view = this;
        const {props, state} = view;

        return <div>
            <h1>Terms</h1>
        </div>;
    }
}
