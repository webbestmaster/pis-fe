/* global window, setTimeout, Event */
import React, {Component} from 'react';
import classnames from 'classnames';
import cnx from './../../../../helper/cnx';
import {Link, withRouter} from 'react-router-dom';
import {resolveImagePath} from './../../../../helper/path-x';
import {connect} from 'react-redux';
import * as authAction from './../../../auth/action';
import style from './style.m.scss';
import {reduceSeconds} from './../../../../helper/date';

const months = [
    'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
    'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
];

const monthsAfterDay = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

const appConst = require('./../../../../app-const');
const find = require('lodash/find');
const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
const weekDaysFull = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

import {getCategoryNameFromRow, getCategoryColor} from './../../../trainings-catalog/helper';

const categoryToHide = ['gym', 'after'];

export class TrainingSchedulePopup extends Component {
    render() {
        const view = this;
        const {state, props} = view;
        const {data} = props;
        const {training, date} = data;
        const dateNow = new Date();

        return <div className={style.wrapper} onClick={evt => evt.stopPropagation()}>
            <div onClick={props.onClickClose}>close</div>
            <div
                className={classnames(
                    style.category_icon,
                    'clubs-catalog-list-item__header--icon-' + getCategoryNameFromRow(data.training)
                )}/>
            <div>{props.data.training.title}</div>
            <div>{reduceSeconds(data.time_from)} {reduceSeconds(data.time_to)}</div>

            <div>{weekDaysFull[data.dayIndex]}</div>
            <div>{data.date.getDate()}</div>
            <div>{monthsAfterDay[data.date.getMonth()]}</div>

            <div>isActive: {dateNow.getTime() < data.date.getTime() ? 'active' : 'too late'}</div>
            <div>{training.description}</div>

            <div>/order/training/{training.id}/{data.schedule.id}/{Math.pow(2, data.dayIndex + 1)}</div>
            <div>/training/{training.id}</div>
        </div>;
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
)(TrainingSchedulePopup);
