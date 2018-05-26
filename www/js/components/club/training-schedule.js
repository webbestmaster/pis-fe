/* global window, setTimeout, Event */
import React, {Component} from 'react';
import cnx from './../../helper/cnx';
import {Link, withRouter} from 'react-router-dom';
import {resolveImagePath} from '../../helper/path-x';
import {connect} from 'react-redux';
import * as authAction from '../auth/action';

const find = require('lodash/find');
const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

class TrainingSchedule extends Component {
    // constructor(data) {
    //     super();
    // }

    render() {
        const view = this;
        const {props, state} = view;
        const {trainings} = props;

        return JSON.stringify(trainings);
    }
}

export default connect(
    state => ({
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
)(TrainingSchedule);
