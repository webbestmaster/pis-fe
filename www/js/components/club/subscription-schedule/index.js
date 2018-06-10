/* global window, setTimeout, Event */
import React, {Component} from 'react';
import classnames from 'classnames';
import cnx from './../../../helper/cnx';
import {Link, withRouter} from 'react-router-dom';
import {resolveImagePath} from './../../../helper/path-x';
import {connect} from 'react-redux';
import * as authAction from './../../auth/action';
import style from './style.m.scss';
import {fetchX} from './../../../helper/fetch-x';

const appConst = require('./../../../app-const');
const find = require('lodash/find');

import {reduceSeconds} from './../../../helper/date';
import {getCategoryNameFromRow} from './../../trainings-catalog/helper';

// const categoryToHide = ['gym', 'after'];

const partList = [
    {
        id: 'personal',
        name: 'Персональное занятие (тренажерный зал)',
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
        id: 'gym',
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
        id: 'fitness',
        name: 'Фитнес',
        filter: subscription => {
            const excludedCategoryList = ['gym', 'after'];
            const categoryName = getCategoryNameFromRow(subscription);

            return !excludedCategoryList.includes(categoryName);
        }
    },
    {
        id: 'after',
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
            categoryMap: {
                name: {}
            }
        };
    }

    componentDidMount() {
        const view = this;

        fetchX(appConst.pageDataUrl.host + appConst.pageDataUrl.subscriptions).then(pageData => {
            const mapName = {};

            Object.keys(pageData.data.categoryFilter).forEach(categoryKey => {
                mapName[categoryKey] = pageData.data.categoryFilter[categoryKey].title;
            });

            view.setState(prevState => {
                prevState.categoryMap.name = mapName; // eslint-disable-line no-param-reassign
                return prevState;
            });
        });
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

                    /*
                    if (part.id === 'fitness') {
                        return <div className={style.part} key={part.name}>
                            <div className={style.table_header}>
                                <h3 className={style.table_header__name}>{part.name}</h3>
                                <p className={style.table_header__time}>Время</p>
                                <p className={style.table_header__cost}>Стоимость</p>
                            </div>
                            <div className={style.table_body}>
                                {view.renderByCategoriesDesktop(subscriptionList)}
                            </div>
                        </div>;
                    }
                    */

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

                    /*
                    if (part.id === 'fitness') {
                        return <div className={style.part} key={part.name}>
                            <div className={style.table_header}>
                                <h3 className={style.table_header__name}>{part.name}</h3>
                            </div>
                            <div className={style.table_body}>
                                {view.renderByCategoriesMobile(subscriptionList)}
                            </div>
                        </div>;
                    }
                    */

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

    getCategoryListByName(subscriptionList) {
        const categoryList = [];

        subscriptionList.forEach(subscription => {
            const categoryName = getCategoryNameFromRow(subscription);

            if (categoryList.indexOf(categoryName) === -1) {
                categoryList.push(categoryName);
            }
        });

        const categoryMap = {};

        categoryList.forEach(categoryName => {
            categoryMap[categoryName] = subscriptionList
                .filter(subscription => getCategoryNameFromRow(subscription) === categoryName);
        });

        return categoryMap;
    }

    renderByCategoriesDesktop(subscriptionList) {
        const view = this;
        const {state} = view;
        const {categoryMap} = state;
        const subscriptionListByCategories = view.getCategoryListByName(subscriptionList);

        return Object.keys(subscriptionListByCategories)
            .map(categoryName => <div key={categoryName}>
                <div className={style.table_body__line_header}>
                    <h5 className={style.table_body__name}>{categoryMap.name[categoryName] || <span>&nbsp;</span>}</h5>
                </div>

                {subscriptionListByCategories[categoryName]
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
            </div>);
    }

    renderByCategoriesMobile(subscriptionList) {
        const view = this;
        const {state} = view;
        const {categoryMap} = state;
        const subscriptionListByCategories = view.getCategoryListByName(subscriptionList);

        return Object.keys(subscriptionListByCategories)
            .map(categoryName => <div key={categoryName}>
                <div className={style.table_body__line_header}>
                    <h5 className={style.table_body__name}>{categoryMap.name[categoryName] || <span>&nbsp;</span>}</h5>
                </div>

                {subscriptionListByCategories[categoryName].map(subscription => <Link
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
            </div>);

        /*
        return subscriptionList
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
            </Link>);
*/
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
