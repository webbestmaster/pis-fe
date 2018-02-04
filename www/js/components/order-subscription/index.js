/* global window, setTimeout, Event */
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

const globalAppConst = require('./../../app-const.json');

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
            pageData: null,
            selectedIndex: 0,
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

        fetchX(globalAppConst.pageDataUrl.subscription.replace('{{subscriptionId}}', props.match.params.id))
            .then(({data}) => view.setState({pageData: data}, () => view.initSwiper()))
            .catch(console.error);
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

        return [
            // view.onBlurValidateName(),
            // view.onBlurValidateFamily(),
            view.onBlurValidatePhone()
            // view.onBlurValidateEmail(),
            // view.onBlurValidatePassword(),
            // view.onBlurValidateNewPassword()
        ].every(validation => validation);
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
        setTimeout(() => window.dispatchEvent(new Event('resize')), 1e3);
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
            <h3 className="section__header">Информация о тренировке</h3>

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
            <div className={style.navigate_button}>Перейти к личным данным</div>
        </div>;
    }

    renderUserInfo() {
        return <div>
            <h3 className="section__header">Личные данные</h3>
            <div className={style.input_block}>
                <h3
                    className={style.input_label}>
                    <span
                        className={style.input_header_icon}
                        style={{backgroundImage: 'url(' + faceImage + ')'}}/>
                    Фамилия Имя Отчество
                </h3>
                <input
                    className={style.input_node}
                    type="text"
                    value="Иванов Иван" disabled/>
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
                <input
                    className={style.input_node + ' ' + style.input_node__phone}
                    type="text"
                    placeholder="XX XXX XX XX"/>
            </div>

            <CheckboxLabel
                ref="mailingPromotion"
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
                    value="user@mail.com"
                    type="text"
                    disabled/>
            </div>
            <CheckboxLabel
                ref="mailingPromotion"
                label={{className: style.checkbox_label_subscribe}}
                input={{ref: 'input', defaultChecked: false}}>
                Хочу получать новости и спецпредложения
            </CheckboxLabel>

            <div className={style.line}/>

            <p className={style.required_note}>
                <span className="main-color">*&nbsp;</span>
                Обязательные поля для заполнения
            </p>

            <div className={style.navigate_button}>Способы оплаты</div>
        </div>;
    }

    renderPayingInfo() {
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
                    input={{name: 'payType', ref: 'input', defaultChecked: true}}
                    label={{className: style.radio_label_pay_type}}>
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
                    &nbsp;Оплата бонусами
                </h3>
                <RadioLabel
                    ref="bonusRadioInput"
                    input={{name: 'payType', ref: 'input', defaultChecked: false}}
                    label={{className: style.radio_label_pay_type}}>
                    <span className="hidden">--- FIXME:LINK ---</span>
                    Оплатить <span className={style.inner_link}>бонусами</span> через наш сервис
                </RadioLabel>

            </div>

            {/* <div className={style.line__margin_bottom}/>*/}

            <div className={style.navigate_button}>Забронировать</div>
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

            <span className="hidden">--- FIXME:LINK ---</span>
            <div className={cardStyle.button}>забронировать</div>
            <p className={cardStyle.cash_back}>Бонус:&nbsp;
            <span className={cardStyle.cash_back_value}>+{(state.qty * singleCacheBack).toFixed(2)}</span>
            </p>
        </div>;
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {pageData} = state;
        const {app} = props;

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
                // selectedIndex={state.selectedIndex}
                onSelect={() => console.log('on select')}
                className="hug">
                <div className={style.tab_wrapper + ' swiper-container'} ref="swiperContainer">
                    <TabList className="swiper-wrapper">
                        <Tab
                            selectedClassName={style.tab_button__active}
                            className={style.tab_button + ' swiper-slide'}>
                            Информация
                        </Tab>
                        <Tab
                            selectedClassName={style.tab_button__active}
                            className={style.tab_button + ' swiper-slide'}>
                            Личные данные
                        </Tab>
                        <Tab
                            selectedClassName={style.tab_button__active}
                            className={style.tab_button + ' swiper-slide'}>
                            Способы оплаты
                        </Tab>
                    </TabList>
                </div>

                {globalAppConst.mobileWidth >= app.screen.width ? null : view.renderCard()}

                <TabPanel className={style.tab_panel}>
                    {view.renderOrderInfo()}
                </TabPanel>
                <TabPanel className={style.tab_panel}>
                    {view.renderUserInfo()}
                </TabPanel>
                <TabPanel className={style.tab_panel}>
                    {view.renderPayingInfo()}
                </TabPanel>

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
        app: state.app
        // auth: state.auth
    }),
    {
        // login: authAction.login,
        // getSessionState: authAction.getSessionState,
        // openPopupPromo: authAction.openPopupPromo
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
