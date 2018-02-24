import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import HeaderSimple from './../../components/header-simple';
import TopBigBanner from './../../components/top-big-banner';
import BreadCrumbs from './../../components/bread-crumbs';
import Footer from './../../components/footer';
import Subscription from './../../components/subscription';
import * as appAction from '../../components/app/action';
import {metaTagMaster} from '../../module/meta-tag';
import * as authAction from '../../components/auth/action';

const find = require('lodash/find');
const isEqual = require('lodash/isEqual');
const appConst = require('./../../app-const');
const {fetchX} = require('./../../helper/fetch-x');
const topBanner = require('./../../../style/images/club/top-banner.png');

class SubscriptionPage extends Component {
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

    addToFavorite(subscriptionId) {
        const view = this;
        const {props, state} = view;

        props.addToFavoriteSubscription(subscriptionId);
    }

    removeFromFavorite(subscriptionId) {
        const view = this;
        const {props, state} = view;
        const {auth} = props;
        const {favorites = []} = auth.login.data;
        const favoriteItem = find(favorites, {type: 'subscription', item_id: subscriptionId});// eslint-disable-line camelcase, id-match

        if (!favoriteItem) {
            console.warn('CAN NOT find favorite subscription with subscriptionId:', subscriptionId);
            return;
        }

        props.removeFromFavorite(favoriteItem.id);
    }

    isFavorite(subscriptionId) {
        const view = this;
        const {props, state} = view;
        const {auth} = props;
        const {favorites = []} = auth.login.data;

        return Boolean(find(favorites, {type: 'subscription', item_id: subscriptionId})); // eslint-disable-line camelcase, id-match
    }

    renderFavoriteMark() { // eslint-disable-line complexity
        const view = this;
        const {props, state} = view;
        const {auth} = props;

        const subscriptionId = state.pageData.row.id;

        if (!auth.login.isLogin) {
            return <div
                onClick={evt => {
                    evt.stopPropagation();
                    evt.preventDefault();
                    props.openPopupLogin();
                }}
                className="section__header-heart"/>;
        }

        if (view.isFavorite(subscriptionId)) {
            return <div
                onClick={evt => {
                    evt.stopPropagation();
                    evt.preventDefault();
                    view.removeFromFavorite(subscriptionId);
                }}
                className="section__header-heart section__header-heart--marked"/>;
        }

        return <div
            onClick={evt => {
                evt.stopPropagation();
                evt.preventDefault();
                view.addToFavorite(subscriptionId);
            }}
            className="section__header-heart"/>;
    }

    componentDidMount() {
        metaTagMaster.updateByUrl('/subscription');

        const view = this;
        const {props, state} = view;
        const {subscriptionId} = props.match.params;

        appAction.scrollToTop();

        return fetchX(appConst.pageDataUrl.host + appConst.pageDataUrl.subscription
            .replace('{{subscriptionId}}', subscriptionId))
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
                    <Link to={'/subscription/' + subscriptionId}>{pageData.row.title}</Link>
                </BreadCrumbs>
                <h3 className="section__header section__header--training">
                    {pageData.row.title}
                    {view.renderFavoriteMark()}
                </h3>
            </TopBigBanner>
            <Subscription {...{subscriptionId}}/>
            <Footer/>
        </div>;
    }
}

export default connect(
    state => ({
        auth: state.auth
    }),
    {
        // closePopup: authAction.closePopup,
        openPopupLogin: authAction.openPopupLogin,
        // openPopupRestore: authAction.openPopupRestore,
        // addToFavoriteClub: authAction.addToFavoriteClub,
        removeFromFavorite: authAction.removeFromFavorite,
        addToFavoriteTraining: authAction.addToFavoriteTraining,
        addToFavoriteSubscription: authAction.addToFavoriteSubscription
    }
)(SubscriptionPage);
