import React, {Component} from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import tabsStyle from './../../../style/css/tabs.m.scss';
import classnames from 'classnames';
import Description from './description';
import Reviews from './reviews';

const appConst = require('./../../app-const');
const {fetchX} = require('./../../helper/fetch-x');

export default class Training extends Component {
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
        const {props, state} = view;
        const {trainingId} = props;

        fetchX(appConst.pageDataUrl.host + appConst.pageDataUrl.training.replace('{{trainingId}}', trainingId))
            .then(({data}) => view.setState({pageData: data}))
            .catch(console.error);
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {pageData} = state;

        if (pageData === null) {
            return null;
        }

        return <Tabs
            defaultIndex={0}
            className="section__tabs-wrapper">
            <div ref="swiperContainer" className={'hug swiper-container ' + tabsStyle.tab_wrapper}>
                <TabList className="swiper-wrapper">
                    <Tab className={classnames('swiper-slide', tabsStyle.tab)}>Описание</Tab>
                    <Tab className={classnames('swiper-slide', tabsStyle.tab)}>Отзывы</Tab>
                </TabList>
            </div>
            <TabPanel>
                <Description trainingId={props.trainingId}/>
            </TabPanel>
            <TabPanel>
                <Reviews clubId={pageData.row.fitnessClub.id}/>
            </TabPanel>
        </Tabs>;
    }
}
