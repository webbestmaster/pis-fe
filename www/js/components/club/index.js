/* global requestAnimationFrame, window, setTimeout, Event */
import React, {Component} from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import style from './style.m.scss';
import tabsStyle from './../../../style/css/tabs.m.scss';
import classnames from 'classnames';
import {withRouter} from 'react-router-dom';

import Description from './description';
import Reviews from './reviews';
import Subscriptions from './subscription';
import Trainings from './training';
import Discounts from './discount';
import Gallery from './gallery';

const appConst = require('./../../app-const.json');
const {fetchX} = require('./../../helper/fetch-x');
const Swiper = require('./../../lib/swiper');

/*
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import HeaderSimple from './../../components/header-simple';
import TopBigBanner from './../../components/top-big-banner';
import BreadCrumbs from './../../components/bread-crumbs';
import ClubPage from './../../components/clubs-catalog';
import Footer from './../../components/footer';
import Rating from './../../components/util/rating';
import {plural} from './../../helper/plural';

const topBanner = require('./../../../style/images/club/top-banner.png');
*/

class Club extends Component {
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

    componentDidMount() {
        const view = this;
        const {props, state} = view;
        const {clubId} = props;

        fetchX(appConst.pageDataUrl.club.replace('{{clubId}}', clubId))
            .then(({data}) => view.setState({pageData: data}, () => view.initSwiper()))
            .catch(console.error);
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {pageData} = state;
        const tabIndex = parseInt(props.match.params.tabIndex, 10) || 0;

        if (pageData === null) {
            return null;
        }

        return <Tabs
            defaultIndex={tabIndex}
            className="section__tabs-wrapper">
            <div ref="swiperContainer" className={'hug swiper-container ' + tabsStyle.tab_wrapper}>
                <TabList className="swiper-wrapper">
                    <Tab className={classnames('swiper-slide', tabsStyle.tab)}>Описание</Tab>
                    <Tab className={classnames('swiper-slide', tabsStyle.tab)}>Отзывы</Tab>
                    <Tab className={classnames('swiper-slide', tabsStyle.tab)}>Абонементы</Tab>
                    <Tab className={classnames('swiper-slide', tabsStyle.tab)}>Тренировки</Tab>
                    <Tab className={classnames('swiper-slide', tabsStyle.tab)}>Скидки</Tab>
                    <Tab className={classnames('swiper-slide', tabsStyle.tab)}>Фотогаларея</Tab>
                </TabList>
            </div>
            <TabPanel>
                <Description clubId={props.clubId}/>
            </TabPanel>
            <TabPanel>
                <Reviews clubId={props.clubId}/>
            </TabPanel>
            <TabPanel>
                <Subscriptions clubId={props.clubId}/>
            </TabPanel>
            <TabPanel>
                <Trainings clubId={props.clubId}/>
            </TabPanel>
            <TabPanel>
                <Discounts clubId={props.clubId}/>
            </TabPanel>
            <TabPanel>
                <Gallery clubId={props.clubId}/>
            </TabPanel>
        </Tabs>;
    }
}


export default withRouter(Club);
