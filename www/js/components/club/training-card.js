/* global window, setTimeout, Event */
import React, {Component} from 'react';
import cnx from './../../helper/cnx';
import {Link, withRouter} from 'react-router-dom';
import {resolveImagePath} from '../../helper/path-x';
import {connect} from 'react-redux';
import * as authAction from '../auth/action';

const find = require('lodash/find');
const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

class TrainingCard extends Component {
    renderTrainingSchedule(training) {
        const includedDays = weekDays.map(() => false);

        training.schedule
            .forEach(schedule => weekDays
                .forEach((dayName, dayIi) => Object
                    .assign(includedDays,
                        {[dayIi]: Boolean(schedule.day & Math.pow(2, dayIi + 1)) || includedDays[dayIi]} // eslint-disable-line no-bitwise
                    )
                )
            );

        return <div className="sale-swiper-card__week-schedule">
            {weekDays.map((dayName, dayIi) => <span
                key={dayIi} {...cnx('sale-swiper-card__week-day', {
                    'sale-swiper-card__week-day--active': includedDays[dayIi]
                })}>{dayName}</span>)}
        </div>;
    }

    addToFavorite(trainingId) {
        const view = this;
        const {props, state} = view;

        props.addToFavoriteTraining(trainingId);
    }

    removeFromFavorite(trainingId) {
        const view = this;
        const {props, state} = view;
        const {auth} = props;
        const {favorites = []} = auth.login.data;
        const favoriteItem = find(favorites, {type: 'training', item_id: trainingId});// eslint-disable-line camelcase, id-match

        if (!favoriteItem) {
            console.warn('CAN NOT find favorite training with trainingId:', trainingId);
            return;
        }

        props.removeFromFavorite(favoriteItem.id);
    }

    isFavorite(trainingId) {
        const view = this;
        const {props, state} = view;
        const {auth} = props;
        const {favorites = []} = auth.login.data;

        return Boolean(find(favorites, {type: 'training', item_id: trainingId})); // eslint-disable-line camelcase, id-match
    }

    renderFavoriteMark() { // eslint-disable-line complexity
        const view = this;
        const {props, state} = view;
        const {training, auth} = props;

        const promotion = training.promotion instanceof Array || !training.promotion ?
            null :
            training.promotion; // yes, if promotion is not exist: row.promotion === []

        const trainingId = promotion ? promotion.fitness_club_training_id : training.id;

        if (!auth.login.isLogin) {
            return <div
                onClick={evt => {
                    evt.stopPropagation();
                    evt.preventDefault();
                    props.openPopupLogin();
                }}
                className="sale-swiper-card__favorite-mark"/>;
        }

        if (view.isFavorite(trainingId)) {
            return <div
                onClick={evt => {
                    evt.stopPropagation();
                    evt.preventDefault();
                    view.removeFromFavorite(trainingId);
                }}
                className="sale-swiper-card__favorite-mark sale-swiper-card__favorite-mark--active"/>;
        }

        return <div
            onClick={evt => {
                evt.stopPropagation();
                evt.preventDefault();
                view.addToFavorite(trainingId);
            }}
            className="sale-swiper-card__favorite-mark"/>;
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {training, auth} = props;

        const promotion = training.promotion instanceof Array || !training.promotion ?
            null :
            training.promotion; // yes, if promotion is not exist: row.promotion === []

        const trainingId = promotion ? promotion.fitness_club_training_id : training.id;

        return <Link
            to={'/training/' + trainingId}
            className="swiper-slide sale-swiper-card">
            <div className="sale-swiper-card__label sale-swiper-card__label--line-only"/>
            <div className="sale-swiper-card__static-content">
                <div
                    className="sale-swiper-card__training-image"
                    style={{backgroundImage: 'url(' + resolveImagePath(training.image) + ')'}}>
                    {view.renderFavoriteMark()}
                </div>
                <div className="sale-swiper-card__subscription-data">
                    <p className="sale-swiper-card__subscription-single-header">{training.title}</p>
                </div>
                {view.renderTrainingSchedule(training)}
                <div className="sale-swiper-card__subscription-training-description">
                    <p>{training.description}</p>
                </div>
                <p className="sale-swiper-card__subscription-cost">{promotion ?
                    (training.price - promotion.discount).toFixed(2) :
                    training.price} <span
                    className="sale-swiper-card__subscription-cost-currency"> руб.</span></p>
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
)(TrainingCard));
