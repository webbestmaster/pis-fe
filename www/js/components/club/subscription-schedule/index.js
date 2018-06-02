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

// const categoryToHide = ['gym', 'after'];

const partList = [
    {
        name: 'Персональное занятие',
        filter: subscription => {
            return true;
        }
    },
    {
        name: 'Тренажерный зал',
        filter: subscription => {
            return true;
        }
    },
    {
        name: 'Фитнес',
        filter: subscription => {
            return true;
        }
    },
    {
        name: 'После спорта',
        filter: subscription => {
            return true;
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

        return <div className={style.wrapper}>mobile</div>;
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {app} = props;

        return app.screen.width > appConst.tabletWidth ? view.renderDesktop() : view.renderMobile();
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
