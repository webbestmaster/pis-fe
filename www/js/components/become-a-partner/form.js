/* global fetch */
import React, {Component} from 'react';
import style from './../club/style.m.scss';
import Rating from './../util/rating';
import cnx from './../../helper/cnx';
import {getMonthAfterDayName} from './../../helper/date';
import {connect} from 'react-redux';
import * as authAction from './../auth/action';
import * as authApi from '../auth/api';
import {store} from '../../index';
import {resolveImagePath} from '../../helper/path-x';
import {formatPhoneBY} from '../../helper/format';

const get = require('lodash/get');
const appConst = require('./../../app-const');
const {fetchX} = require('./../../helper/fetch-x');
const defaultUserAvatar = require('./../../../style/i/club/no-avatar.png');
const authConst = require('./../auth/const');

/*
    Example
    <ClubLeaveReviewForm clubId={clubId:string|number}/>
*/

class BecomeAPartnerForm extends Component {
    constructor() {
        super();

        const view = this;

        view.state = {
            error: null,
            messageText: '',
            // overStarIndex: -1,
            form: {
                input: {
                    message: {
                        isValid: true,
                        error: {
                            message: ''
                        }
                    }
                }
            }
        };
    }

    validateMessage() {
        const maxMessageLength = 1000;
        const view = this;
        const message = view.refs.message;
        const value = message.value.substr(0, maxMessageLength);

        view.setState({messageText: value});

        message.value = value;

        view.setState(prevState => {
            Object.assign(prevState.form.input.message, {isValid: true});

            return prevState;
        });

        if (value.trim() === '') {
            view.setState(prevState => {
                Object.assign(prevState.form.input.message,
                    {isValid: false, error: {message: 'Это поле обязательно к заполнению.'}}
                );

                return prevState;
            });
            return false;
        }

        return true;
    }

    validateForm() {
        const view = this;

        return [view.validateMessage()]
            .every(isValid => isValid);
    }

    leaveMessage() {
        const view = this;
        const {props, state} = view;
        const {message} = state;

        if (!view.validateForm()) {
            console.log('form is not valid');
            return;
        }

        console.log('send message');
    }

    render() { // eslint-disable-line complexity
        const view = this;
        const {props, state} = view;
        const {auth} = props;

        const avatar = get(auth, 'login.data.user.image') || null;

        return [get(props.auth, 'login.data.user.id', false) ?
            null :
            <p
                key="review-enter"
                onClick={() => props.openPopupLogin()}
                className={style.review_enter_text}>
                Авторизуйтесь чтобы оставить сообщение
            </p>,
        <form
            key="form" {...cnx(style.review_form, 'clear-full',
                {disabled: !get(props.auth, 'login.data.user.id', false)}
            )}>
            {avatar ?
                <div
                    className={style.review_form__avatar}
                    style={{backgroundImage: 'url(' + resolveImagePath(avatar) + ')'}}/> :
                <div className={style.review_form__avatar}/>
            }
            <h4 className={style.review_form__header}>Написать сообщение</h4>
            <p className={style.review_form__stars_label}>&nbsp;</p>
            <textarea
                ref="message"
                onInput={() => view.validateMessage()}
                onBlur={() => view.validateMessage()}
                className={style.review_form__text_area}
                rows="10"
                placeholder="Напишите Ваше сообщение"/>
            {state.error && <p className={style.review_error_text}>{state.error}</p>}
            <div
                onClick={() => view.leaveMessage()}
                {...cnx(style.review_form__button, {
                    disabled: state.messageText.trim().length < 10
                })}>
                    Написать сообщение
            </div>
        </form>];
    }
}

export default connect(
    state => ({
        // app: state.app,
        auth: state.auth
    }),
    {
        openPopupLogin: authAction.openPopupLogin
    }
)(BecomeAPartnerForm);
