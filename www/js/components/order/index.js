/* global window, setTimeout, Event */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import cnx from './../../helper/cnx';
import style from './style.m.scss';
import cardStyle from './card.m.scss';

const mapPinImage = require('./../../../style/i/clubs/map-pin.svg');
const trainingImage = require('./../../../style/i/category/dancing.svg');

const Swiper = require('./../../lib/swiper');

class Order extends Component {
    constructor() {
        super();
        const view = this;

        view.state = {};
        view.attr = {
            swiper: null
        };
    }

    componentDidMount() {
        const view = this;

        // instead of setTimeout, need to fix swiper :(
        view.initSwiper();
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
        return <div>

            <h3 className="section__header">Информация о тренировке</h3>

            <div className={style.input_block}>
                <h3 className={style.input_label}>
                    <span className={style.input_header_icon} style={{backgroundImage: 'url(' + mapPinImage + ')'}}/>
                    Филиал клуба
                </h3>
                <input className={style.input_node} type="text" defaultValue={'Яковопольский переулок, 17'} disabled/>
            </div>
            <div className={style.input_block}>
                <h3 className={style.input_label}>
                    <span className={style.input_header_icon} style={{backgroundImage: 'url(' + trainingImage + ')'}}/>
                    Тренировка
                </h3>
                <input
                    className={style.input_node} type="text"
                    defaultValue={'Пробное занятие по стрип-пластике (60 руб.)'} disabled/>
            </div>
            <div className={style.arrow_block_wrapper}>
                <div className={style.input_block + ' ' + style.input_block__arrow}>
                    <h3 className={style.input_label}>День</h3>
                    <input className={style.input_node} type="text" defaultValue={'7 июня'} disabled/>
                </div>
                <div className={style.input_block + ' ' + style.input_block__arrow}>
                    <h3 className={style.input_label}>Время</h3>
                    <input className={style.input_node} type="text" defaultValue={'20 : 00 '} disabled/>
                </div>
                <div className={style.input_block + ' ' + style.input_block__arrow}>
                    <h3 className={style.input_label}>Кол-во человек</h3>
                    <div className={style.input_node__number}>
                        <div className={style.input_node__number__plus}/>
                        <input
                            className={style.input_node} type="text"
                            defaultValue="1"
                            disabled/>
                        <div className={style.input_node__number__minus}/>
                    </div>
                </div>
            </div>
            <div className={style.navigate_button}>Перейти к личным данным</div>
        </div>;
    }

    renderUserInfo() {
        return <h1>user info</h1>;
    }

    renderPayingInfo() {
        return <h1>paying info</h1>;
    }

    renderCard() {
        return <div className={cardStyle.card}>
            <h3 className={cardStyle.header}>
                <span className={cardStyle.company_name}>
                    <span className={cardStyle.company_name_value + ' ellipsis'}>La Fitness</span>
                </span>
                <span
                    className={cardStyle.company_logo}
                    style={{backgroundImage: 'url(http://via.placeholder.com/115x50)'}}/>
            </h3>
            <h4 className={cardStyle.your_order}>Ваш заказ:</h4>
            <p className={cardStyle.order_data_item}>
                Тренировка: <span>Пробное занятие по стрип-пластике</span>
            </p>
            <p className={cardStyle.order_data_item}>
                Адрес: <span>пр-т Дзержинского, 58 к2</span>
            </p>
            <p className={cardStyle.order_data_item}>
                Дата: <span>7 июня</span>
            </p>
            <p className={cardStyle.order_data_item}>
                Время: <span>20:00</span>
            </p>
            <p className={cardStyle.order_data_item}>
                Кол-во человек: <span>1</span>
            </p>

            <h5 className={cardStyle.full_cost}>Итоговая цена: 60 руб.</h5>

            <span className="hidden">--- FIXME:LINK ---</span>
            <div className={cardStyle.button}>забронировать</div>
            <p className={cardStyle.cash_back}>Бонус:&nbsp;
            <span className={cardStyle.cash_back_value}>+0.00</span>
            </p>
        </div>;
    }

    render() {
        const view = this;
        const {props, state} = view;

        return <div style={{paddingBottom: 1000}}>
            <Tabs className="hug">
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

                {view.renderCard()}

                <TabPanel className={style.tab_panel}>
                    {view.renderOrderInfo()}
                </TabPanel>
                <TabPanel className={style.tab_panel}>
                    {view.renderUserInfo()}
                </TabPanel>
                <TabPanel className={style.tab_panel}>
                    {view.renderPayingInfo()}
                </TabPanel>
            </Tabs>
        </div>;
    }
}

export default connect(
    state => ({
        // auth: state.auth
    }),
    {
        // login: authAction.login,
        // getSessionState: authAction.getSessionState,
        // openPopupPromo: authAction.openPopupPromo
    }
)(Order);
