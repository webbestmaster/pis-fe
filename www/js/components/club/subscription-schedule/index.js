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

const categoryToHide = ['gym', 'after'];

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

        return <div className={style.wrapper}>

            <h1>desktop</h1>

            <div>
                {JSON.stringify(subscriptions)}
            </div>

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
