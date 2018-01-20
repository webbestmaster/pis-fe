/* global requestAnimationFrame, window, setTimeout, Event */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import tabsStyle from './../../../style/css/tabs.m.scss';
import AppliedOrder from './club-tabs/applied-order';
import NewOrder from './club-tabs/new-order';
import RejectedOrder from './club-tabs/rejected-order';

const Swiper = require('./../../lib/swiper');

export default class UserClub extends Component {
    constructor() {
        super();

        const view = this;

        view.attr = {
            swiper: null
        };

        view.state = {
            pageData: null
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

    render() {
        const view = this;
        // const {props, state} = view;
        // const {app} = props;

        return <div>
            <Tabs
                defaultIndex={0}
                className="section__tabs-wrapper">
                <div ref="swiperContainer" className={'hug swiper-container ' + tabsStyle.tab_wrapper}>
                    <TabList className="swiper-wrapper">
                        <Tab className={classnames('swiper-slide', tabsStyle.tab)}>Новые заявки
                            <span className={tabsStyle.tab_text_mark}>3</span>
                        </Tab>
                        <Tab className={classnames('swiper-slide', tabsStyle.tab)}>Подтвержденные</Tab>
                        <Tab className={classnames('swiper-slide', tabsStyle.tab)}>Отклоненные</Tab>
                    </TabList>
                </div>
                <TabPanel>
                    <NewOrder/>
                </TabPanel>
                <TabPanel>
                    <AppliedOrder/>
                </TabPanel>
                <TabPanel>
                    <RejectedOrder/>
                </TabPanel>
            </Tabs>
        </div>;
    }
}
