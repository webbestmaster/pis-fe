/* global requestAnimationFrame, window, setTimeout, Event */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import cnx from './../../helper/cnx';
import classnames from 'classnames';
// import * as subscriptionsCatalogAction from './action';
import {defaultDateFilter} from './../trainings-catalog/reducer';
import * as trainingsCatalogAction from './../trainings-catalog/action';

const {fetchX} = require('./../../helper/fetch-x');
const {createArray} = require('./../../helper/create');
const {reduceSeconds} = require('./../../helper/date');
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

function getFirstSchedule(schedule1, schedule2) { // eslint-disable-line complexity
    let ii = 0;
    let day1 = null;
    let day2 = null;

    for (; ii < 7; ii += 1) {
        day1 = schedule1[ii] === null || schedule1[ii].inThePast ? null : schedule1[ii];
        day2 = schedule2[ii] === null || schedule2[ii].inThePast ? null : schedule2[ii];

        if (day1 === null && day2 === null) {
            continue; // eslint-disable-line no-continue
        }

        if (day2 === null) {
            return schedule1;
        }

        if (day1 === null) {
            return schedule2;
        }

        return parseFloat(day1.time_from) <= parseFloat(day2.time_from) ?
            schedule1 :
            schedule2;
    }

    return schedule1;
}

export function prepareScheduleList(scheduleList) {
    const scheduleTable = scheduleList
        .map(scheduleItem => defaultItems
            .map(timeItem => {
                const currentDate = new Date(timeItem);

                return scheduleItem.day & weekDaysMap[currentDate.getDay()].day ? // eslint-disable-line no-bitwise
                    scheduleItem :
                    null;
            })
            .map((oldScheduleItem, scheduleItemIi) => {
                if (oldScheduleItem === null) {
                    return oldScheduleItem;
                }

                const currentDate = new Date(defaultItems[scheduleItemIi]);

                const newScheduleItem = Object.assign(
                    {},
                    oldScheduleItem,
                    {inThePast: false},
                    {dayId: oldScheduleItem.day & weekDaysMap[currentDate.getDay()].day} // eslint-disable-line no-bitwise
                );

                if (scheduleItemIi === 0 && parseFloat(newScheduleItem.time_from) <= (new Date()).getHours()) {
                    newScheduleItem.inThePast = true;
                }

                return newScheduleItem;
            })
        );

    let firstSchedule = scheduleTable[0];

    let ii = 1;

    for (; ii < scheduleTable.length; ii += 1) {
        firstSchedule = getFirstSchedule(firstSchedule, scheduleTable[ii]);
    }

    // console.log(firstSchedule);
    // console.log(scheduleTable.indexOf(firstSchedule));

    let firstDayIndex = null;

    firstSchedule.forEach((day, dayIi) => {
        if (firstDayIndex !== null) {
            return;
        }

        if (day === null) {
            return;
        }

        if (dayIi === 0 && parseFloat(day.time_from) <= (new Date()).getHours()) {
            return;
        }

        firstDayIndex = dayIi;
    });

    return {
        scheduleTable,
        firstSchedule,
        firstScheduleItem: firstSchedule[firstDayIndex],
        firstScheduleIndex: scheduleTable.indexOf(firstSchedule),
        firstDayIndex
    };
}

class DateFilter extends Component {
    constructor() {
        super();

        const view = this;

        view.state = {
            pageData: null
        };

        view.attr = {
            swiper: null
        };
    }

    componentDidMount() {
        const view = this;
        const {props, state} = view;
        const {trainingId} = props;

        fetchX(appConst.pageDataUrl.training.replace('{{trainingId}}', trainingId))
            .then(({data}) => view.setState({pageData: data}, () => view.initInteractive()))
            .catch(console.error);
    }

    initInteractive() {
        const view = this;

        // instead of setTimeout, need to fix swiper :(
        requestAnimationFrame(() => view.initSwiper());
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
        const {pageData} = state;

        if (pageData === null) {
            return null;
        }

        const {row} = pageData;
        const {schedule} = row;

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

                        const preparedScheduleList = prepareScheduleList(schedule);

                        return <div
                            key={ii}
                            {...cnx('swiper-slide', 'clubs-catalog-date-filter__date', {
                                'clubs-catalog-date-filter__date--active': ii === 0
                            })}>
                            <p className="clubs-catalog-date-filter__date-day">
                                {weekDaysMap[currentDate.getDay()].name}
                            </p>
                            <p className="clubs-catalog-date-filter__date-date">{dateDate}</p>

                            <div className="clubs-catalog-date-filter__date-content">
                                <div className="clubs-catalog-date-filter__date-time-wrapper">
                                    {schedule.map((scheduleItem, innerIi) =>
                                        scheduleItem.day & weekDaysMap[currentDate.getDay()].day ? // eslint-disable-line no-bitwise
                                            <Link
                                                to={'/order/training/' +
                                                    row.id + '/' +
                                                    scheduleItem.id + '/' +
                                                    (scheduleItem.day & weekDaysMap[currentDate.getDay()].day)} // eslint-disable-line no-bitwise
                                                key={ii + '-' + innerIi} // eslint-disable-line complexity
                                                {...cnx('clubs-catalog-date-filter__date-time', {
                                                    disabled: ii === 0 &&
                                                        parseFloat(scheduleItem.time_from) <= (new Date()).getHours(),
                                                    'clubs-catalog-date-filter__date-time--active':
                                                        preparedScheduleList.firstScheduleIndex === innerIi &&
                                                        preparedScheduleList.firstDayIndex === ii
                                                })}>
                                                {reduceSeconds(scheduleItem.time_from) +
                                                    ' - ' +
                                                    reduceSeconds(scheduleItem.time_to)}
                                            </Link> :
                                            <div
                                                key={ii + '-' + innerIi}
                                                className="clubs-catalog-date-filter__date-time">
                                                <br/>
                                            </div>)}
                                </div>
                            </div>
                        </div>;
                    })}
                </div>
                {/* <div className="swiper__arrow"/>*/}

            </div>
            <div className="clubs-catalog-date-filter__swipe-arrow"/>
        </div>;
    }
}

export default connect(
    state => ({
        // trainingsCatalog: state.trainingsCatalog,
        // app: state.app
    }),
    {
        // setDateFilter: trainingsCatalogAction.setDateFilter
    }
)(DateFilter);
