/* global window, setTimeout, Event */
import React, {Component} from 'react';
import classnames from 'classnames';
import cnx from './../../../../helper/cnx';
import {Link, withRouter} from 'react-router-dom';
import {resolveImagePath} from './../../../../helper/path-x';
import {connect} from 'react-redux';
import * as authAction from './../../../auth/action';
import style from './style.m.scss';

const appConst = require('./../../../../app-const');
const find = require('lodash/find');
const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

import {getCategoryNameFromRow, getCategoryColor} from './../../../trainings-catalog/helper';

const categoryToHide = ['gym', 'after'];

export class TrainingSchedulePopup extends Component {

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
)(TrainingSchedulePopup);
