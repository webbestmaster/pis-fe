/* global window, setTimeout, Event */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import cnx from './../../helper/cnx';
import style from './style.m.scss';

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
        return <h1>order info</h1>;
    }

    renderUserInfo() {
        return <h1>user info</h1>;
    }

    renderPayingInfo() {
        return <h1>paying info</h1>;
    }

    render() {
        const view = this;
        const {props, state} = view;

        return <div style={{paddingBottom: 1000}}>
            <Tabs>
                <div className={style.tab_wrapper + ' hug swiper-container'} ref="swiperContainer">
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
                <TabPanel>
                    {view.renderOrderInfo()}
                </TabPanel>
                <TabPanel>
                    {view.renderUserInfo()}
                </TabPanel>
                <TabPanel>
                    {view.renderPayingInfo()}
                </TabPanel>
            </Tabs>
            <div>
                <h1>
                    here is card
                </h1>
            </div>
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
