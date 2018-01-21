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
import ReviewList from './club-tabs/review-list';
import style from './style.m.scss';
import cnx from '../../helper/cnx';

const Swiper = require('./../../lib/swiper');

export default class UserClub extends Component {
    constructor() {
        super();

        const view = this;

        view.attr = {
            swiper: null
        };

        view.state = {
            pageData: null,
            tabIndex: 1
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
        const {props, state} = view;
        // const {app} = props;

        return <div>
            <Tabs
                // defaultIndex={state.tabIndex}
                selectedIndex={state.tabIndex}
                onSelect={() => console.log('on select')}
                className="section__tabs-wrapper">
                <div ref="swiperContainer" className={'hug swiper-container ' + tabsStyle.tab_wrapper}>
                    <TabList className="swiper-wrapper">
                        <Tab onClick={() => view.setState({tabIndex: 0})}
                            className={classnames('swiper-slide', tabsStyle.tab)}>Новые заявки
                            <span className={tabsStyle.tab_text_mark}>3</span>
                        </Tab>
                        <Tab
                            onClick={() => view.setState({tabIndex: 1})}
                            className={classnames('swiper-slide', tabsStyle.tab)}>Подтвержденные</Tab>
                        <Tab
                            onClick={() => view.setState({tabIndex: 2})}
                            className={classnames('swiper-slide', tabsStyle.tab)}>Отклоненные</Tab>
                        <Tab className="hidden"/>
                    </TabList>
                </div>
                <div className="hug hug--no-clear">
                    <div
                        onClick={() => view.setState({tabIndex: 3})}
                        {...cnx(style.open_review_list_button, {
                            [style.open_review_list_button__active]: state.tabIndex === 3
                        })}>
                        Отзывы
                        <span className={style.open_review_list_button__icon}/>
                        <span {...cnx(style.open_review_list_button__counter, {
                            [style.open_review_list_button__counter__hidden]: state.tabIndex === 3
                        })}>1</span>
                    </div>
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
                <TabPanel>
                    <ReviewList/>
                </TabPanel>
            </Tabs>
        </div>;
    }
}
