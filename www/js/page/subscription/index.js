import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';
import HeaderSimple from './../../components/header-simple';
import TopBigBanner from './../../components/top-big-banner';
import BreadCrumbs from './../../components/bread-crumbs';
import SubscriptionsCatalog from './../../components/subscriptions-catalog';
import Footer from './../../components/footer';
import Subscription from './../../components/subscription';
import * as appAction from '../../components/app/action';
import {metaTagMaster} from '../../module/meta-tag';

const isEqual = require('lodash/isEqual');
const appConst = require('./../../app-const.json');
const {fetchX} = require('./../../helper/fetch-x');
const topBanner = require('./../../../style/images/club/top-banner.png');

export default class SubscriptionPage extends Component {
    constructor() {
        super();

        const view = this;

        view.state = {
            pageData: null
        };
    }

    componentDidUpdate(prevProps) {
        const view = this;
        const {props, state} = view;

        if (!prevProps.match) {
            return;
        }

        if (isEqual(props.match.params, prevProps.match.params)) {
            return;
        }

        view.componentDidMount().then(() => view.setState({pageData: null}, () => view.componentDidMount()));
    }

    componentDidMount() {
        metaTagMaster.updateByUrl('/subscription');

        const view = this;
        const {props, state} = view;
        const {subscriptionId} = props.match.params;

        appAction.scrollToTop();

        return fetchX(appConst.pageDataUrl.subscription.replace('{{subscriptionId}}', subscriptionId))
            .then(({data}) => view.setState({pageData: data})).catch(console.error);
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {subscriptionId} = props.match.params;
        const {pageData} = state;

        if (pageData === null) {
            return null;
        }

        return <div>
            {/* <div className="json">{JSON.stringify(pageData)}</div> */}
            <HeaderSimple/>
            <TopBigBanner backgroundImage={topBanner}>
                <BreadCrumbs>
                    <Link to="/">Главная</Link>
                    <Link to="/subscriptions">Абонементы</Link>
                    <Link to={'/club/' + pageData.row.fitnessClub.id}>{pageData.row.fitnessClub.title}</Link>
                </BreadCrumbs>
                <h3 className="section__header">Абонемент</h3>
            </TopBigBanner>
            <Subscription {...{subscriptionId}}/>
            <Footer/>
        </div>;
    }
}
