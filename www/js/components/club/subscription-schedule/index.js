/* global window, setTimeout, Event */
import React, {Component} from 'react';
import classnames from 'classnames';
import cnx from './../../../helper/cnx';
import {Link, withRouter} from 'react-router-dom';
import {resolveImagePath} from './../../../helper/path-x';
import {connect} from 'react-redux';
import * as authAction from './../../auth/action';
import style from './style.m.scss';

const appConst = require('./../../../app-const');
const find = require('lodash/find');

import {reduceSeconds} from './../../../helper/date';
import {getCategoryNameFromRow} from './../../trainings-catalog/helper';

// const categoryToHide = ['gym', 'after'];

const partList = [
    {
        name: 'Персональное занятие',
        filter: subscription => {
            const neededCategoryName = 'gym';
            const categoryName = getCategoryNameFromRow(subscription);
            const {attributes} = subscription;

            if (categoryName !== neededCategoryName) {
                return false;
            }

            return attributes[neededCategoryName] === 4;
        }
    },
    {
        name: 'Тренажерный зал',
        filter: subscription => {
            const neededCategoryName = 'gym';
            const categoryName = getCategoryNameFromRow(subscription);
            const {attributes} = subscription;

            if (categoryName !== neededCategoryName) {
                return false;
            }

            return attributes[neededCategoryName] === 2;
        }
    },
    {
        name: 'Фитнес',
        filter: subscription => {
            const excludedCategoryList = ['gym', 'after'];
            const categoryName = getCategoryNameFromRow(subscription);

            return !excludedCategoryList.includes(categoryName);
        }
    },
    {
        name: 'После спорта',
        filter: subscription => {
            const neededCategoryName = 'after';
            const categoryName = getCategoryNameFromRow(subscription);

            return categoryName === neededCategoryName;
        }
    }
];

class SubscriptionsSchedule extends Component {
    constructor() {
        super();

        const view = this;

        view.state = {
            // selectedDayIndex: view.getFirstActiveTrainingDay(),
            // selectedTimeIndex: -1,
            // openInfoPopupId: null
        };
    }

    renderDesktop() {
        const view = this;
        const {props, state} = view;
        const {subscriptions} = props;

        if (!subscriptions) {
            return null;
        }

        return <div className={style.wrapper}>
            {partList
                .map(part => {
                    const subscriptionList = subscriptions.filter(part.filter);

                    if (subscriptionList.length === 0) {
                        return null;
                    }

                    return <div className={style.part} key={part.name}>
                        <div className={style.table_header}>
                            <h3 className={style.table_header__name}>{part.name}</h3>
                            <p className={style.table_header__time}>Время</p>
                            <p className={style.table_header__cost}>Стоимость</p>
                        </div>
                        <div className={style.table_body}>
                            {subscriptionList
                                .map(subscription => <Link
                                    to={'/subscription/' + subscription.id}
                                    key={subscription.id}
                                    className={style.table_body__line}>
                                    <div
                                        className={style.table_body__name}>
                                        {subscription.title}
                                    </div>
                                    <div
                                        className={style.table_body__time}>
                                        {reduceSeconds(subscription.work_from)}
                                        {' - '}
                                        {reduceSeconds(subscription.work_to)}
                                    </div>
                                    <div
                                        className={style.table_body__cost}>
                                        <span className="bold">{subscription.price}&nbsp;</span>руб.
                                    </div>
                                </Link>)}
                        </div>
                    </div>;
                })}
        </div>;
    }

    renderMobile() {
        const view = this;
        const {props, state} = view;
        const {subscriptions} = props;

        if (!subscriptions) {
            return null;
        }

        return <div className={style.wrapper}>
            {partList
                .map(part => {
                    const subscriptionList = subscriptions.filter(part.filter);

                    if (subscriptionList.length === 0) {
                        return null;
                    }

                    return <div className={style.part} key={part.name}>
                        <div className={style.table_header}>
                            <h3 className={style.table_header__name}>{part.name}</h3>
                        </div>
                        <div className={style.table_body}>
                            {subscriptionList
                                .map(subscription => <Link
                                    to={'/subscription/' + subscription.id}
                                    key={subscription.id}
                                    className={style.table_body__line}>
                                    <div
                                        className={style.table_body__name}>
                                        {subscription.title}
                                    </div>
                                    <div
                                        className={style.table_body__time}>
                                        <span className={style.table_body__label}>Время:</span>
                                        {reduceSeconds(subscription.work_from)}
                                        {' - '}
                                        {reduceSeconds(subscription.work_to)}
                                    </div>
                                    <div
                                        className={style.table_body__cost}>
                                        <span className={style.table_body__label}>Цена:</span>
                                        <span className="bold">{subscription.price}&nbsp;</span>руб.
                                    </div>
                                </Link>)}
                        </div>
                    </div>;
                })}
        </div>;
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {app} = props;

        return app.screen.width > appConst.mobileWidth ? view.renderDesktop() : view.renderMobile();
    }
}

export default connect(
    state => ({
        app: state.app
        // auth: state.auth
    }),
    {
        // closePopup: authAction.closePopup,
        // openPopupLogin: authAction.openPopupLogin,
        // openPopupRestore: authAction.openPopupRestore,
        // addToFavoriteClub: authAction.addToFavoriteClub,
        // removeFromFavorite: authAction.removeFromFavorite,
        // addToFavoriteTraining: authAction.addToFavoriteTraining,
        // addToFavoriteSubscription: authAction.addToFavoriteSubscription
    }
)(SubscriptionsSchedule);
