/* global window, setTimeout, Event */
import React, {Component} from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import style from './style.m.scss';
import classnames from 'classnames';
import cnx from './../../helper/cnx';
import Lightbox from 'react-images';
import MapView from './../map';
import MapItemClub from './../map/map-item-club';
import {Link, withRouter} from 'react-router-dom';
import {reduceSeconds} from '../../helper/date';
import {resolveImagePath} from '../../helper/path-x';
import {connect} from 'react-redux';
import * as authAction from '../auth/action';
import Subscription from '../subscription';

const find = require('lodash/find');
const appConst = require('./../../app-const');
const {fetchX} = require('./../../helper/fetch-x');
const Swiper = require('./../../lib/swiper');
const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

class SubscriptionCard extends Component {
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
        const {subscription, auth} = props;

        const promotion = subscription.promotion instanceof Array || !subscription.promotion ?
            null :
            subscription.promotion; // yes, if promotion is not exist: row.promotion === []

        const subscriptionId = promotion ? promotion.fitness_club_subscription_id : subscription.id;

        if (!auth.login.isLogin) {
            return <div
                onClick={evt => {
                    evt.stopPropagation();
                    evt.preventDefault();
                    props.openPopupLogin();
                }}
                className="sale-swiper-card__favorite-mark"/>;
        }

        if (view.isFavorite(subscriptionId)) {
            return <div
                onClick={evt => {
                    evt.stopPropagation();
                    evt.preventDefault();
                    view.removeFromFavorite(subscriptionId);
                }}
                className="sale-swiper-card__favorite-mark sale-swiper-card__favorite-mark--active"/>;
        }

        return <div
            onClick={evt => {
                evt.stopPropagation();
                evt.preventDefault();
                view.addToFavorite(subscriptionId);
            }}
            className="sale-swiper-card__favorite-mark"/>;
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {subscription, auth} = props;

        const promotion = subscription.promotion instanceof Array || !subscription.promotion ?
            null :
            subscription.promotion; // yes, if promotion is not exist: row.promotion === []

        const subscriptionId = promotion ? promotion.fitness_club_subscription_id : subscription.id;

        return <Link
            className="swiper-slide sale-swiper-card"
            to={'/subscription/' + subscriptionId}>
            <div {...cnx('sale-swiper-card__label', {
                'sale-swiper-card__label--line-only': Boolean(!promotion)
            })}>%
            </div>

            <div className="sale-swiper-card__static-content">
                <div className="sale-swiper-card__stopwatch">
                    {view.renderFavoriteMark()}
                </div>
                <div className="sale-swiper-card__subscription-data">
                    <p className="sale-swiper-card__subscription-count">
                        {subscription.period_amount}
                    </p>
                    <p className="sale-swiper-card__subscription-header">{subscription.title}</p>
                </div>
                <div className="sale-swiper-card__subscription-description">
                    <p dangerouslySetInnerHTML={{
                        __html: subscription.description // eslint-disable-line id-match
                    }}/>
                </div>

                <p className="sale-swiper-card__subscription-cost">{promotion ?
                    (subscription.price - promotion.discount).toFixed(2) :
                    subscription.price}
                <span
                    className="sale-swiper-card__subscription-cost-currency">руб.</span></p>
                <div className="sale-swiper-card__button">Забронировать</div>
            </div>
        </Link>;
    }
}

export default withRouter(connect(
    state => ({
        auth: state.auth
    }),
    {
        // closePopup: authAction.closePopup,
        openPopupLogin: authAction.openPopupLogin,
        // openPopupRestore: authAction.openPopupRestore,
        addToFavoriteClub: authAction.addToFavoriteClub,
        removeFromFavorite: authAction.removeFromFavorite,
        addToFavoriteTraining: authAction.addToFavoriteTraining,
        addToFavoriteSubscription: authAction.addToFavoriteSubscription
    }
)(SubscriptionCard));
