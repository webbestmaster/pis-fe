/* global window, requestAnimationFrame, setTimeout, Event, fetch */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import cnx from './../../helper/cnx';
import style from './style.m.scss';
import cardStyle from './card.m.scss';
import CheckboxLabel from './../util/checkbox';
import RadioLabel from './../util/radio';
import {withRouter} from 'react-router-dom';
import {formatPhoneBY} from '../../helper/format';
import {resolveImagePath} from '../../helper/path-x';
import {reduceSeconds} from '../../helper/date';
import * as authAction from '../auth/action';
import {Link} from 'react-router-dom';

const globalAppConst = require('./../../app-const.json');
const authConst = require('./../auth/const.json');

const mapPinImage = require('./../../../style/i/clubs/map-pin.svg');
const trainingImage = require('./../../../style/i/category/dancing.svg');

const timeImage = require('./../../../style/i/order/icon-time.png');
const faceImage = require('./../../../style/i/order/icon-face.png');
const phoneImage = require('./../../../style/i/order/icon-phone.png');
const mailImage = require('./../../../style/i/order/icon-mail.png');

const cacheImage = require('./../../../style/i/order/icon-cache.png');
const cachebackImage = require('./../../../style/i/order/icon-cashe-back.png');

const Swiper = require('./../../lib/swiper');
const {fetchX} = require('./../../helper/fetch-x');

class Order extends Component {
    constructor() {
        super();
        const view = this;

        view.state = {
            orderType: 'reservation',
            pageData: null,
            partIndex: 0,
            qty: 1,
            form: {
                input: {
                    // fullName: {
                    //     isValid: true,
                    //     error: {
                    //         message: ''
                    //     }
                    // },
                    phone: {
                        isValid: true,
                        error: {
                            message: ''
                        }
                    }
                    // email: {
                    //     isValid: true,
                    //     error: {
                    //         message: ''
                    //     }
                    // }
                }
            }
        };

        view.attr = {
            swiper: null
        };
    }

    componentDidMount() {
        const view = this;
        const {props, state} = view;
        const {auth} = props;

        fetchX(globalAppConst.pageDataUrl.host + globalAppConst.pageDataUrl.subscription
            .replace('{{subscriptionId}}', props.match.params.id))
            .then(({data}) => view.setState({pageData: data}, () => view.initSwiper()))
            .catch(console.error);

        if (auth.login.isLogin) {
            return;
        }

        props
            .getSessionState()
            .then(() => {
                if (view.props.auth.login.isLogin) {
                    return;
                }

                (function wait() {
                    if (view.props.auth.login.isLogin) {
                        return;
                    }

                    if (view.props.auth.openPopup === null) {
                        props.openPopupLogin();
                    }
                    setTimeout(wait, 100);
                })();
            });
    }

    onBlurValidatePhone() {
        const view = this;
        const phone = view.refs.phone;

        phone.value = formatPhoneBY(phone.value);

        const value = phone.value;

        view.setState(prevState => {
            Object.assign(prevState.form.input.phone, {isValid: true});

            return prevState;
        });

        if (value === '') {
            view.setState(prevState => {
                Object.assign(prevState.form.input.phone,
                    {isValid: false, error: {message: 'Это поле обязательно к заполнению.'}}
                );

                return prevState;
            });
            return false;
        }

        if ((value.match(/\d/g) || []).length !== 9) {
            view.setState(prevState => {
                Object.assign(prevState.form.input.phone,
                    {isValid: false, error: {message: 'Введите телефон в формате: XX XXX XX XX'}}
                );

                return prevState;
            });
            return false;
        }

        return true;
    }

    validateForm() {
        const view = this;

        return [view.onBlurValidatePhone()]
            .every(validation => validation);
    }

    submitOrder() {
        const view = this;
        const {state, props, refs} = view;

        if (!view.validateForm()) {
            view.setState({partIndex: 1});
            return Promise.reject({error: {message: 'NOT valid form.'}});
        }

        const {orderType} = state;
        const amount = state.qty;
        const subscriptionId = state.pageData.row.id;
        const needCall = refs.phoneCallBack.refs.input.checked ? 1 : 0;
        const userPhone = (globalAppConst.phone.by.prefix + view.refs.phone.value).replace(/\D/g, '');

        return fetch(
            globalAppConst.pageDataUrl.host +
            authConst.url.makeSubscriptionOrder
                .replace('{{orderType}}', orderType)
                .replace('{{amount}}', amount)
                .replace('{{subscriptionId}}', subscriptionId)
                .replace('{{needCall}}', needCall)
                .replace('{{userPhone}}', userPhone),
            {credentials: 'include', method: 'POST'})
        // .then(data => data.json())
            .then(() => view.props.history.push('/user/tab-index/1'));
    }

    initSwiper() {
        const view = this;
        const {refs} = view;
        const {swiperContainer} = refs;

        view.attr.swiper = new Swiper(swiperContainer, {
            slidesPerView: 'auto',
            freeMode: true
        });

        // need to fix swiper
        requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
    }

    renderOrderInfo() {
        const view = this;
        const {props, state} = view;
        const {pageData, qty} = state;
        const {row} = pageData;
        const {fitnessClub} = row;
        const promotion = row.promotion instanceof Array || !row.promotion ? null : row.promotion; // yes, if promotion is not exist: row.promotion === []
        const singlePrice = parseFloat(promotion ? (row.price - promotion.discount).toFixed(2) : row.price);
        const singleCacheBack = parseFloat(row.cashback);

        return <div>
            <h3 className="section__header">Информация об абонементе</h3>

            <div className={style.input_block}>
                <h3 className={style.input_label}>
                    <span className={style.input_header_icon} style={{backgroundImage: 'url(' + mapPinImage + ')'}}/>
                    Филиал клуба
                </h3>
                <input className={style.input_node} type="text" defaultValue={fitnessClub.address} disabled/>
            </div>
            <div className={style.input_block}>
                <h3 className={style.input_label}>
                    <span className={style.input_header_icon} style={{backgroundImage: 'url(' + trainingImage + ')'}}/>
                    Абонемент
                </h3>
                <input
                    className={style.input_node} type="text"
                    defaultValue={row.title + ' - ' + singlePrice + ' руб.'} disabled/>
            </div>
            <div className={style.input_block}>
                <h3 className={style.input_label}>
                    <span className={style.input_header_icon} style={{backgroundImage: 'url(' + timeImage + ')'}}/>
                    Время действия
                </h3>
                <input
                    className={style.input_node} type="text"
                    defaultValue={'Пн-Пт: ' + reduceSeconds(row.work_from) + ' - ' + reduceSeconds(row.work_to) +
                    ', Сб-Вс: ' + reduceSeconds(row.weekend_work_from) + ' - ' + reduceSeconds(row.weekend_work_to)}
                    disabled/>
            </div>
            <div className={style.arrow_block_wrapper}>
                {/*
                <div className={style.input_block + ' ' + style.input_block__arrow}>
                    <h3 className={style.input_label}>День</h3>
                    <input className={style.input_node} type="text" defaultValue={'7 июня'} disabled/>
                </div>
                <div className={style.input_block + ' ' + style.input_block__arrow}>
                    <h3 className={style.input_label}>Время</h3>
                    <input className={style.input_node} type="text" defaultValue={'20 : 00 '} disabled/>
                </div>
                */}
                <div className={style.input_block + ' ' + style.input_block__arrow}>
                    <h3 className={style.input_label}>Кол-во человек</h3>
                    <div className={style.input_node__number}>
                        <div
                            onClick={() => view.setState({qty: Math.min(qty + 1, 5)})}
                            className={style.input_node__number__plus}/>
                        <input
                            className={style.input_node} type="text"
                            value={qty}
                            disabled/>
                        <div
                            onClick={() => view.setState({qty: Math.max(qty - 1, 1)})}
                            className={style.input_node__number__minus}/>
                    </div>
                </div>
            </div>
            <div
                onClick={() => view.setState({partIndex: 1})}
                className={style.navigate_button}>Перейти к личным данным
            </div>
        </div>;
    }

    renderUserInfo() {
        const view = this;
        const {props, state} = view;
        const {auth} = props;
        const {user} = auth.login.data;
        const {pageData, qty} = state;
        const {row} = pageData;
        const {fitnessClub} = row;
        const promotion = row.promotion instanceof Array || !row.promotion ? null : row.promotion; // yes, if promotion is not exist: row.promotion === []
        const singlePrice = parseFloat(promotion ? (row.price - promotion.discount).toFixed(2) : row.price);
        const singleCacheBack = parseFloat(row.cashback);

        return <div>
            <h3 className="section__header">Личные данные</h3>
            <div className={style.input_block}>
                <h3
                    className={style.input_label}>
                    <span
                        className={style.input_header_icon}
                        style={{backgroundImage: 'url(' + faceImage + ')'}}/>
                    Имя Фамилия
                </h3>
                <input
                    className={style.input_node}
                    type="text"
                    defaultValue={user.first_name + ' ' + user.last_name}
                    disabled/>
            </div>
            <div className={style.input_block}>
                <span className={style.input_block__phone_prefix}>{globalAppConst.phone.by.prefix}</span>
                <h3
                    className={style.input_label}>
                    <span
                        className={style.input_header_icon}
                        style={{backgroundImage: 'url(' + phoneImage + ')'}}/>
                    Телефон
                    <span className="main-color">&nbsp;*</span>
                </h3>

                {/*
                <input
                    ref="phone"
                    onBlur={() => view.onBlurValidatePhone()}
                    onInput={() => view.onBlurValidatePhone()}
                    type="text"
                    defaultValue={formatPhoneBY(user.phone.replace(globalAppConst.phone.by.prefixClean, ''))}
                    placeholder="XX XXX XX XX"
                />
                */}

                {user.phone ?
                    <input
                        key="phone"
                        ref="phone"
                        className={style.input_node + ' ' + style.input_node__phone}
                        type="text"
                        value={user.phone
                            .replace('+', '')
                            .replace(globalAppConst.phone.by.prefixClean, '')
                            .trim()}
                        disabled/> :
                    [
                        <input
                            key="phone"
                            ref="phone"
                            onBlur={() => view.onBlurValidatePhone()}
                            onInput={() => view.onBlurValidatePhone()}
                            {...cnx(style.input_node,
                                style.input_node__phone,
                                {[style.input_text__invalid]: !state.form.input.phone.isValid})
                            }
                            type="text"
                            placeholder="XX XXX XX XX"/>,
                        <ErrorLabel
                            key="phone-error-label"
                            propName="phone"
                            form={state.form}/>
                    ]
                }
            </div>

            <CheckboxLabel
                ref="phoneCallBack"
                label={{className: style.checkbox_label_phone}}
                input={{ref: 'input', defaultChecked: true}}>
                Жду звонок для подтверждение заказа
            </CheckboxLabel>
            <div className={style.input_block}>
                <h3 className={style.input_label}>
                    <span
                        className={style.input_header_icon}
                        style={{backgroundImage: 'url(' + mailImage + ')'}}/>
                    Электронная почта
                    {/* <span className="main-color">&nbsp;*</span>*/}
                </h3>
                <input
                    className={style.input_node}
                    value={user.email}
                    type="text"
                    disabled/>
            </div>

            {/*
            <CheckboxLabel
                ref="mailingPromotion"
                label={{className: style.checkbox_label_subscribe}}
                input={{ref: 'input', defaultChecked: false}}>
                Хочу получать новости и спецпредложения
            </CheckboxLabel>
            */}

            <div className={style.line}/>

            <p className={style.required_note}>
                <span className="main-color">*&nbsp;</span>
                Обязательные поля для заполнения
            </p>

            <div
                onClick={() => {
                    if (view.validateForm()) {
                        view.setState({partIndex: 2});
                        return;
                    }
                    view.setState({partIndex: 1});
                }}
                className={style.navigate_button}>Способы оплаты
            </div>
        </div>;
    }

    renderPayingInfo() {
        const view = this;
        const {props, state} = view;
        const {auth} = props;
        const {user} = auth.login.data;
        const {pageData, qty} = state;
        const {row} = pageData;
        const {fitnessClub} = row;
        const promotion = row.promotion instanceof Array || !row.promotion ? null : row.promotion; // yes, if promotion is not exist: row.promotion === []
        const singlePrice = parseFloat(promotion ? (row.price - promotion.discount).toFixed(2) : row.price);
        const singleCacheBack = parseFloat(row.cashback);

        return <div>
            <h3 className="section__header">Способы оплаты</h3>

            <div className={style.input_block}>
                <h3
                    className={style.input_label}>
                    <span
                        className={style.input_header_icon}
                        style={{backgroundImage: 'url(' + cacheImage + ')'}}/>
                    Оплата на месте
                </h3>
                <RadioLabel
                    ref="cacheRadioInput"
                    input={{name: 'payType', ref: 'input', checked: state.orderType === 'reservation', readOnly: true}}
                    label={{
                        className: style.radio_label_pay_type,
                        onClick: () => view.setState({orderType: 'reservation'})
                    }}>
                    Оплатить наличными на месте
                </RadioLabel>

            </div>

            <div className={style.line__margin_bottom}/>

            <div className={style.input_block}>
                <h3
                    className={style.input_label}>
                    <span
                        className={style.input_header_icon}
                        style={{backgroundImage: 'url(' + cachebackImage + ')'}}/>
                    &nbsp;Оплата бонусами (бонус баланс: {singleCacheBack.toFixed(2)})
                </h3>
                <RadioLabel
                    ref="bonusRadioInput"
                    input={{name: 'payType', ref: 'input', checked: state.orderType === 'cashback', readOnly: true}}
                    label={{
                        className: style.radio_label_pay_type,
                        onClick: () => {
                            if (singleCacheBack < state.qty * singlePrice) {
                                return;
                            }
                            view.setState({orderType: 'cashback'});
                        }
                    }}>
                    Оплатить <Link
                        to="/about-cashback"
                        target="_blank"
                        className={style.inner_link}>бонусами</Link> через наш
                    сервис
                </RadioLabel>

            </div>

            <div
                onClick={() => view.submitOrder()}
                className={style.navigate_button}>Забронировать
            </div>
        </div>;
    }

    renderCard() {
        const view = this;
        const {props, state} = view;
        const {pageData} = state;
        const {row} = pageData;
        const {fitnessClub} = row;
        const promotion = row.promotion instanceof Array || !row.promotion ? null : row.promotion; // yes, if promotion is not exist: row.promotion === []
        const singlePrice = parseFloat(promotion ? (row.price - promotion.discount).toFixed(2) : row.price);
        const singleCacheBack = parseFloat(row.cashback);

        return <div className={cardStyle.card}>
            <h3 className={cardStyle.header} title={fitnessClub.title}>
                <span className={cardStyle.company_name}>
                    <span className={cardStyle.company_name_value + ' ellipsis'}>{fitnessClub.title}</span>
                </span>
                <span
                    className={cardStyle.company_logo}
                    style={{backgroundImage: 'url(' + resolveImagePath(fitnessClub.logo_image) + ')'}}/>
            </h3>
            <h4 className={cardStyle.your_order}>Ваш заказ:</h4>
            <p className={cardStyle.order_data_item}>
                {/* Тренировка: <span>Пробное занятие по стрип-пластике</span>*/}
                Абонемент: <span>{row.title}</span>
            </p>
            <p className={cardStyle.order_data_item}>
                Адрес: <span>{fitnessClub.address}</span>
            </p>

            {/*
            <h3 className={style.description_info_item_header}>Время действия:</h3>
            <p className={style.description_info_item_text}>
                Пн-Пт: {reduceSeconds(row.work_from)} - {reduceSeconds(row.work_to)}
                &nbsp;
                Сб-Вс: {reduceSeconds(row.weekend_work_from)} - {reduceSeconds(row.weekend_work_to)}
            </p>
            */}

            <p className={cardStyle.order_data_item}>
                Время действия:&nbsp;
                <span>
                    Пн-Пт: {reduceSeconds(row.work_from)} - {reduceSeconds(row.work_to)},
                    <br/>
                    Сб-Вс: {reduceSeconds(row.weekend_work_from)} - {reduceSeconds(row.weekend_work_to)}
                </span>
            </p>

            {/*
            <p className={cardStyle.order_data_item}>
                Время: <span>20:00</span>
            </p>
            */}

            <p className={cardStyle.order_data_item}>
                Кол-во человек: <span>{state.qty}</span>
            </p>

            {/*
            {promotion ?
                <div>
                    <p className={style.card_cost}>Цена со скидкой:&nbsp;
                        {(row.price - promotion.discount).toFixed(2)} руб.
                    </p>
                    <p className={style.card_old_cost}>&nbsp;&nbsp;{row.price}&nbsp;&nbsp;</p>
                </div> :
                <div>
                    <p className={style.card_cost}>Цена: {row.price}</p>
                    <br/>
                </div>}
            */}

            <h5 className={cardStyle.full_cost}>
                Итоговая цена: {(state.qty * singlePrice).toFixed(2)}&nbsp;руб.
            </h5>

            <div
                onClick={() => {
                    switch (state.partIndex) {
                        case 0:
                            view.setState({partIndex: 1});
                            break;
                        case 1:
                            if (view.validateForm()) {
                                view.setState({partIndex: 2});
                            }
                            break;
                        case 2:
                            view.submitOrder();
                            break;

                        default:
                            console.warn('How it possible o_O ?');
                    }
                }}
                className={cardStyle.button}>забронировать
            </div>
            <p className={cardStyle.cash_back}>Бонус:&nbsp;
            <span className={cardStyle.cash_back_value}>+{(state.qty * singleCacheBack).toFixed(2)}</span>
            </p>
        </div>;
    }

    render() { // eslint-disable-line complexity
        const view = this;
        const {props, state} = view;
        const {pageData} = state;
        const {app, auth} = props;

        if (pageData === null) {
            return null;
        }

        return <div className={style.main}>
            {/*
            <h1>{props.match.params.type}</h1>
            <h1>{props.match.params.id}</h1>
            <h1>{props.match.params.scheduleId}</h1>
            <h1>{props.match.params.day}</h1>
            */}
            <Tabs
                // defaultIndex={2}
                // selectedIndex={state.partIndex}
                // onSelect={() => {}}
                className="hug">
                <div className={style.tab_wrapper + ' swiper-container'} ref="swiperContainer">
                    <div className="swiper-wrapper">
                        <div
                            onClick={() => view.setState({partIndex: 0})}
                            {...cnx(style.tab_button, 'swiper-slide',
                                {[style.tab_button__active]: state.partIndex === 0})}>
                            Информация
                        </div>
                        <div
                            onClick={() => view.setState({partIndex: 1})}
                            {...cnx(style.tab_button, 'swiper-slide',
                                {[style.tab_button__active]: state.partIndex === 1})}>
                            Личные данные
                        </div>
                        <div
                            onClick={() => {
                                if (view.validateForm()) {
                                    view.setState({partIndex: 2});
                                    return;
                                }
                                view.setState({partIndex: 1});
                            }}
                            {...cnx(style.tab_button, 'swiper-slide',
                                {[style.tab_button__active]: state.partIndex === 2})}>
                            Способы оплаты
                        </div>
                    </div>
                </div>

                {globalAppConst.mobileWidth >= app.screen.width ? null : view.renderCard()}

                <div {...cnx(style.tab_panel, {hidden: state.partIndex !== 0})}>
                    {view.renderOrderInfo()}
                </div>
                <div {...cnx(style.tab_panel, {hidden: state.partIndex !== 1})}>
                    {auth.login.isLogin ? view.renderUserInfo() : null}
                </div>
                <div {...cnx(style.tab_panel, {hidden: state.partIndex !== 2})}>
                    {auth.login.isLogin ? view.renderPayingInfo() : null}
                </div>

                {globalAppConst.mobileWidth >= app.screen.width ?
                    <div className={cardStyle.arrow_arrow_holder + ' clear-full'}>
                        {view.renderCard()}
                    </div> :
                    null}

            </Tabs>
        </div>;
    }
}

export default withRouter(connect(
    state => ({
        app: state.app,
        auth: state.auth
    }),
    {
        // login: authAction.login,
        getSessionState: authAction.getSessionState,
        openPopupLogin: authAction.openPopupLogin
    }
)(Order));

class ErrorLabel extends Component {
    render() {
        const view = this;
        const {props, state} = view;
        const {propName, form} = props;

        if (form.input[propName].isValid) {
            return null;
        }

        return <span className={style.input_error_text}>{form.input[propName].error.message}</span>;
    }
}
