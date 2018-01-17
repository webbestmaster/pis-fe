/* global requestAnimationFrame, window, setTimeout, Event */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';
// import * as subscriptionsCatalogAction from './action';
import {defaultDateFilter} from './reducer';
import * as trainingsCatalogAction from './action';

const {fetchX} = require('./../../helper/fetch-x');
const {createArray} = require('./../../helper/create');
const appConst = require('./../../app-const.json');
const Swiper = require('./../../lib/swiper');
// import HeaderSimple from './../components/header-simple';
// import TopBigBanner from './../components/top-big-banner';

// const topBanner = require('./../../style/images/clubs/top-banner.png');

const defaultItems = [defaultDateFilter];
const millisecondsInOneDay = 24 * 60 * 60 * 1000;

while (defaultItems.length < 7) {
    defaultItems.push(defaultItems[defaultItems.length - 1] + millisecondsInOneDay);
}

const weekDaysMap = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
    .map((dayName, ii) => ({name: dayName, day: Math.pow(2, ii || 7)}));

const yearMonthsMap = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];
const today = 'сегодня';
const tomorrow = 'завтра';

class DateFilter extends Component {
    constructor() {
        super();

        const view = this;

        view.attr = {
            swiper: null
        };
    }

    componentDidMount() {
        const view = this;

        // instead of setTimeout, need to fix swiper :(
        requestAnimationFrame(() => view.initSwiper());
        // need to fix swiper
        setTimeout(() => window.dispatchEvent(new Event('resize')), 1e3);
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
        // const {pageData, selected} = state;

        return <div className="clubs-catalog-date-filter">
            <div ref="swiperContainer" className="swiper-container">
                <div className="swiper-wrapper">
                    {defaultItems.map((timeItem, ii) => {
                        const currentDate = new Date(timeItem);
                        let dateDate = null;

                        switch (ii) {
                            case 0:
                                dateDate = today;
                                break;
                            case 1:
                                dateDate = tomorrow;
                                break;

                            default:
                                dateDate = currentDate.getDate() + ' ' + yearMonthsMap[currentDate.getMonth()];
                        }

                        return <div
                            key={ii}
                            onClick={() => props.setDateFilter(timeItem)}
                            className={classnames('swiper-slide clubs-catalog-date-filter__date', {
                                'clubs-catalog-date-filter__date--active':
                                timeItem === props.trainingsCatalog.dateFilter
                            })}>
                            <p className="clubs-catalog-date-filter__date-day">
                                {weekDaysMap[currentDate.getDay()].name}
                            </p>
                            <p className="clubs-catalog-date-filter__date-date">{dateDate}</p>
                        </div>;
                    })}
                </div>
            </div>
            <div className="clubs-catalog-date-filter__swipe-arrow"/>
        </div>;
    }
}

export default connect(
    state => ({
        trainingsCatalog: state.trainingsCatalog,
        app: state.app
    }),
    {
        setDateFilter: trainingsCatalogAction.setDateFilter
    }
)(DateFilter);
