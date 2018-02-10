/* global requestAnimationFrame, window, setTimeout, Event */
import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
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
import * as authAction from '../auth/action';

const Swiper = require('./../../lib/swiper');

class UserClub extends Component {
    constructor() {
        super();

        const view = this;

        view.attr = {
            swiper: null
        };

        view.state = {
            pageData: null,
            tabIndex: 0
        };
    }

    componentDidMount() {
        const view = this;
        const {state, props} = view;

        // instead of setTimeout, need to fix swiper :(
        view.initSwiper();

        // here is two undepended async methods
        props.getClubHomeData(); // .then(data => console.warn(data));
        props.getClubFeedbackList(); // .then(data => console.warn(data));
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

    getNewFeedbackCount() {
        const view = this;
        const {props, state} = view;
        const {auth} = props;

        if (!auth.clubFeedback.data) {
            return 0;
        }

        const createdFeedbackList = auth.clubFeedback.data.created || [];

        return createdFeedbackList.filter(createdFeedback => !createdFeedback.answer).length;
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {auth} = props;

        const newFeedbackCount = view.getNewFeedbackCount();

        return <div>
            <Tabs
                // defaultIndex={state.tabIndex}
                selectedIndex={state.tabIndex}
                onSelect={() => console.log('on select')}
                className="section__tabs-wrapper">
                <div ref="swiperContainer" className={'hug swiper-container ' + tabsStyle.tab_wrapper}>
                    <TabList className="swiper-wrapper">
                        <Tab
                            onClick={() => view.setState({tabIndex: 0})}
                            className={classnames('swiper-slide', tabsStyle.tab)}>Новые заявки
                            <span className="hidden">FIXME</span>
                            <span className={tabsStyle.tab_text_mark + ' hidden'}>3</span>
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
                            [style.open_review_list_button__counter__hidden]:
                            state.tabIndex === 3 || newFeedbackCount === 0
                        })}>{newFeedbackCount}</span>
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

export default withRouter(connect(
    state => ({
        app: state.app,
        auth: state.auth
    }),
    {
        getClubHomeData: authAction.getClubHomeData,
        getClubFeedbackList: authAction.getClubFeedbackList
    }
)(UserClub));
