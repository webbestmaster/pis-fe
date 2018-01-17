/* global requestAnimationFrame, window, setTimeout, Event */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import tabsStyle from './../../../style/css/tabs.m.scss';
import UserShortInfo from './../../components/user-short-info';
import userShortInfoStyle from './../../components/user-short-info/style.m.scss';

const Swiper = require('./../../lib/swiper');

export default class User extends Component {
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
                        <Tab className={classnames('swiper-slide', tabsStyle.tab)}>Настройки</Tab>
                        <Tab className={classnames('swiper-slide', tabsStyle.tab)}>Мои тренировки</Tab>
                        <Tab className={classnames('swiper-slide', tabsStyle.tab)}>Избранное</Tab>
                    </TabList>
                </div>
                <TabPanel>
                    <h1>1</h1>
                </TabPanel>
                <TabPanel>
                    <h1>2</h1>
                </TabPanel>
                <TabPanel>
                    <h1>3</h1>
                </TabPanel>
            </Tabs>
        </div>;
    }
}
