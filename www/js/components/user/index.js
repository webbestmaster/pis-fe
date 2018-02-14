/* global requestAnimationFrame, window, setTimeout, Event */
import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import tabsStyle from './../../../style/css/tabs.m.scss';
import Favorite from './tabs/favorite';
import MyTrainings from './tabs/my-trainings';
import Settings from './tabs/settings';
import * as authAction from '../auth/action';

const Swiper = require('./../../lib/swiper');

class User extends Component {
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
        const {state, props} = view;

        // instead of setTimeout, need to fix swiper :(
        view.initSwiper();

        props.getUserHomeData(); // .then(data => console.warn(data));
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

    render() {
        const view = this;
        const {props, state} = view;
        const {auth} = props;
        const {login} = auth;
        const defaultIndex = parseInt(props.match.params.tabIndex, 10) || 0;

        return <Tabs
            defaultIndex={defaultIndex}
            className="section__tabs-wrapper">
            <div ref="swiperContainer" className={'hug swiper-container ' + tabsStyle.tab_wrapper}>
                <TabList className="swiper-wrapper">
                    <Tab className={classnames('swiper-slide', tabsStyle.tab)}>Настройки</Tab>
                    <Tab className={classnames('swiper-slide', tabsStyle.tab)}>Мои тренировки</Tab>
                    <Tab className={classnames('swiper-slide', tabsStyle.tab)}>Избранное</Tab>
                </TabList>
            </div>
            <TabPanel>
                <Settings/>
            </TabPanel>
            <TabPanel>
                <MyTrainings/>
            </TabPanel>
            <TabPanel>
                <Favorite/>
            </TabPanel>
        </Tabs>;
    }
}

export default withRouter(connect(
    state => ({
        app: state.app,
        auth: state.auth
    }),
    {
        getUserHomeData: authAction.getUserHomeData
    }
)(User));

