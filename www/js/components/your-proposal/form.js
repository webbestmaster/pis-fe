/* global fetch */
import React, {Component} from 'react';
import style from './../club/style.m.scss';
import cnx from './../../helper/cnx';
import {connect} from 'react-redux';
import * as authAction from './../auth/action';
import {resolveImagePath} from '../../helper/path-x';

const get = require('lodash/get');
const globalAppConst = require('./../../app-const');
const authConst = require('./../auth/const');

class BecomeAPartnerForm extends Component {
    constructor() {
        super();

        const view = this;

        view.state = {
            error: null,
            messageText: '',
            formSent: false,
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

        fetch(
            globalAppConst.pageDataUrl.host +
            authConst.url.proposal
                .replace('{{type}}', authConst.proposalType.proposal)
                .replace('{{message}}', state.messageText.trim()),
            {credentials: 'include', method: 'POST'})
            .then(() => view.setState({formSent: true}));
    }

    render() { // eslint-disable-line complexity
        const view = this;
        const {props, state} = view;
        const {auth} = props;

        if (state.formSent === true) {
            return <h3
                style={{paddingTop: 200, paddingBottom: 200}}
                className={style.review_wait_for_moderation}>Спасибо за Ваше предложение!</h3>;
        }

        const avatar = get(auth, 'login.data.user.image') || null;

        return [
            <div
                key="text"
                className="section__text-wrapper clear-full">
                <p>Мы любим отличное обслуживание в магазинах, банках и ресторанах. Уверены, вы тоже. И мы рады, что у
                    нас есть возможность положительно влиять на качество нашего сервиса. Удовлетворенность клиентов —
                    это один из наших любимых инструментов для выстраивания долгих и надежных отношений.</p>
                <p>Здесь вы можете оставить ваши отзывы, предложения и пожелания к работе нашей онлайн-площадки. Для нас
                    очень важно ваше мнение.</p>
            </div>,
            get(props.auth, 'login.data.user.id', false) ?
                null :
                <p
                    key="review-enter"
                    onClick={() => props.openPopupLogin()}
                    className={style.review_enter_text}>
                    Авторизуйтесь чтобы оставить предложение
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
                <h4 className={style.review_form__header}>Написать предложение</h4>
                <p className={style.review_form__stars_label}>&nbsp;</p>
                <textarea
                    ref="message"
                    onInput={() => view.validateMessage()}
                    onBlur={() => view.validateMessage()}
                    className={style.review_form__text_area}
                    rows="10"
                    placeholder="Напишите Ваше предложение"/>
                {state.error && <p className={style.review_error_text}>{state.error}</p>}
                <div
                    onClick={() => view.leaveMessage()}
                    {...cnx(style.review_form__button, {
                        disabled: state.messageText.trim().length < 10
                    })}>
                    Написать предложение
                </div>
            </form>
        ];
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
