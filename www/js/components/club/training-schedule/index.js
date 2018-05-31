/* global window, setTimeout, Event */
import React, {Component} from 'react';
import classnames from 'classnames';
import cnx from './../../../helper/cnx';
import {Link, withRouter} from 'react-router-dom';
import {resolveImagePath} from './../../../helper/path-x';
import {connect} from 'react-redux';
import * as authAction from './../../auth/action';
import style from './style.m.scss';
import TrainingSchedulePopup from './popup';

const appConst = require('./../../../app-const');
const find = require('lodash/find');
const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

import {getCategoryNameFromRow} from './../../trainings-catalog/helper';

const categoryClassNameMap = {
    yoga: style.category__yoga,
    cardio: style.category__cardio,
    combat: style.category__combat,
    mind: style.category__mind,
    strength: style.category__strength,
    dancing: style.category__dancing,
    games: style.category__games,
    mothers: style.category__mothers
};

function getCategoryClassName(categoryName) {
    if (categoryClassNameMap.hasOwnProperty(categoryName)) {
        return categoryClassNameMap[categoryName];
    }

    return style.category__no_category;
}

const categoryToHide = ['gym', 'after'];

class TrainingSchedule extends Component {
    constructor() {
        super();

        const view = this;

        view.state = {
            selectedDayIndex: view.getFirstActiveTrainingDay(),
            selectedTimeIndex: -1,
            openInfoPopupId: null
        };
    }

    getFirstActiveTrainingDay() {
        const view = this;
        let dayIndex = 0;

        for (; dayIndex < 7; dayIndex += 1) {
            if (view.hasActiveTrainingForDay(dayIndex)) {
                return dayIndex;
            }
        }

        return -1;
    }

    // componentDidMount() {
    //     const view = this;
    //
    // }

    /*
        getTrainingListByWeekDayIndexAndBeginTime(weekDayIndex, beginTime) {
            const view = this;
            const {props, state} = view;
            const {trainings} = props;
            const selectedTrainingList = [];


            trainings.forEach(training => {
                const scheduleList = training.schedule || [];
                scheduleList.forEach(schedule => {


                });
            });

            return selectedTrainingList;
        }
    */

    getTimeList() {
        const view = this;
        const {props, state} = view;
        const {trainings} = props;

        const timeList = [];

        trainings.forEach(training => {
            const scheduleList = training.schedule || [];

            if (categoryToHide.includes(getCategoryNameFromRow(training))) {
                return;
            }

            scheduleList
                .forEach(({time_from, time_to}) => { // eslint-disable-line id-match, camelcase
                    const begin = time_from.split(':').map(timePart => parseInt(timePart, 10)); // eslint-disable-line id-match, camelcase
                    const end = time_to.split(':').map(timePart => parseInt(timePart, 10)); // eslint-disable-line id-match, camelcase

                    timeList
                        .push({
                            begin: {
                                originalTime: time_from, // eslint-disable-line id-match, camelcase
                                hour: begin[0],
                                minute: begin[1]
                            },
                            end: {
                                originalTime: time_to, // eslint-disable-line id-match, camelcase
                                hour: end[0],
                                minute: end[1]
                            }
                        });
                });
        });

        const clearTimeList = [];

        timeList.forEach(trainingTimeData => {
            if (find(clearTimeList, {begin: trainingTimeData.begin})) {
                return;
            }

            clearTimeList.push(trainingTimeData);
        });

        return clearTimeList.sort((timeA, timeB) => {
            return timeA.begin.hour * 60 + timeA.begin.minute - timeB.begin.hour * 60 - timeB.begin.minute;
        });
    }

    getFullTrainingList() {
        const view = this;
        const {props, state} = view;
        const {trainings} = props;

        const fullTrainingList = [];
        const now = Date.now();
        const dateNow = new Date();
        const nowDayIndex = (dateNow.getDay() || 7) - 1;
        const oneDayLength = 24 * 60 * 60 * 1000;

        trainings.forEach(training => {
            const scheduleList = training.schedule || [];

            if (categoryToHide.includes(getCategoryNameFromRow(training))) {
                return;
            }

            scheduleList
                .forEach(schedule => {
                    let dayNumber = 1;

                    for (; dayNumber <= 7; dayNumber += 1) {
                        if (schedule.day & Math.pow(2, dayNumber)) { // eslint-disable-line no-bitwise
                            fullTrainingList.push({
                                training,
                                schedule,
                                time_from: schedule.time_from, // eslint-disable-line id-match, camelcase
                                time_to: schedule.time_to, // eslint-disable-line id-match, camelcase
                                date: new Date(now + (dayNumber - nowDayIndex - 1) * oneDayLength),
                                dayIndex: dayNumber - 1
                            });
                        }
                    }
                });
        });

        return fullTrainingList;
    }

    drawDesktopColumnCell(fullTrainingDataList, dayIndex, timeDataIndex) {
        const view = this;
        const {props, state} = view;
        const {selectedDayIndex, selectedTimeIndex} = state;
        const className = classnames(style.td, {
            [style.td_selected]: fullTrainingDataList
                .some((data, dataIndex) => view.isPopupOpen(data, dayIndex, dataIndex)),
            [style.selected_in_line]:
            selectedDayIndex === dayIndex ||
            selectedTimeIndex === timeDataIndex
        });

        if (fullTrainingDataList.length === 0) {
            return <td className={className} key={dayIndex}/>;
        }

        return <td
            className={className}
            key={dayIndex}>
            {fullTrainingDataList.map((data, dataIndex) => <div
                onClick={() => view.changeInfoPopup(data, dayIndex, dataIndex)}
                className={classnames(
                    style.schedule_item,
                    getCategoryClassName(getCategoryNameFromRow(data.training)),
                    {[style.schedule_item__selected]: view.isPopupOpen(data, dayIndex, dataIndex)}
                )}
                key={dataIndex}>
                {data.training.title}
                {view.isPopupOpen(data, dayIndex, dataIndex) ?
                    <TrainingSchedulePopup
                        data={data}
                        onClickClose={() => view.changeInfoPopup(data, dayIndex, dataIndex)}/> :
                    null}
            </div>)}
        </td>;
    }

    drawMobileColumnCell(fullTrainingDataList, dayIndex, timeDataIndex) {
        const view = this;
        const {props, state} = view;
        const {selectedDayIndex, selectedTimeIndex} = state;
        const className = classnames(style.td, style.td_mobile_item_list, {
            [style.td_selected]: fullTrainingDataList
                .some((data, dataIndex) => view.isPopupOpen(data, dayIndex, dataIndex)),
            [style.selected_in_line]:
            selectedDayIndex === dayIndex ||
            selectedTimeIndex === timeDataIndex
        });

        if (fullTrainingDataList.length === 0) {
            return <div className={className} key={dayIndex}/>;
        }

        return <div
            className={className}
            key={dayIndex}>
            {fullTrainingDataList.map((data, dataIndex) => <div
                onClick={() => view.changeInfoPopup(data, dayIndex, dataIndex)}
                className={classnames(
                    style.schedule_item,
                    getCategoryClassName(getCategoryNameFromRow(data.training)),
                    {[style.schedule_item__selected]: view.isPopupOpen(data, dayIndex, dataIndex)}
                )}
                key={dataIndex}>
                {data.training.title}
                {view.isPopupOpen(data, dayIndex, dataIndex) ?
                    <TrainingSchedulePopup
                        data={data}
                        onClickClose={() => view.changeInfoPopup(data, dayIndex, dataIndex)}/> :
                    null}
            </div>)}
        </div>;
    }

    changeInfoPopup(data, dayIndex, dataIndex) {
        const view = this;
        const newOpenInfoPopupId = view.getTableItemId(data, dayIndex, dataIndex);

        view.setState({openInfoPopupId: view.isPopupOpen(data, dayIndex, dataIndex) ? null : newOpenInfoPopupId});
    }

    getTableItemId(data, dayIndex, dataIndex) {
        return [data.time_from, data.dayIndex, dayIndex, dataIndex].join('--');
    }

    isPopupOpen(data, dayIndex, dataIndex) {
        const view = this;
        const {state} = view;

        return state.openInfoPopupId === view.getTableItemId(data, dayIndex, dataIndex);
    }

    drawDesktopTimeCell(timeData, indexTimeData) {
        const view = this;
        const {state} = view;
        const {selectedTimeIndex} = state;

        return <td
            onClick={() => view.setState({selectedTimeIndex: indexTimeData})}
            className={classnames(style.time_cell, style.td, {
                [style.time_cell__selected]: selectedTimeIndex === indexTimeData
            })}>
            <span className={style.time_cell__line}/>
            <span className={style.time_cell__diamond}/>
            {String(timeData.begin.hour).padStart(2, '0')}
            :
            {String(timeData.begin.minute).padStart(2, '0')}
        </td>;
    }

    drawMobileTimeCell(timeData, indexTimeData) {
        const view = this;
        const {state} = view;
        const {selectedTimeIndex} = state;

        return <div
            onClick={() => view.setState({selectedTimeIndex: indexTimeData})}
            className={classnames(style.time_cell, style.td, {
                [style.time_cell__selected]: selectedTimeIndex === indexTimeData
            })}>
            <span className={style.time_cell__line}/>
            <span className={style.time_cell__diamond}/>
            {String(timeData.begin.hour).padStart(2, '0')}
            :
            {String(timeData.begin.minute).padStart(2, '0')}
        </div>;
    }

    hasActiveTrainingForDay(dayIndex) {
        // const view = this;
        // const fullTrainingList = view.getFullTrainingList();
        // const timeList = view.getTimeList();
        const dateNow = new Date();

        const nowDayIndex = (dateNow.getDay() || 7) - 1;

        return dayIndex >= nowDayIndex;
    }

    getHeaderPropsCell(dayIndex) {
        const view = this;
        const {state} = view;
        const {selectedDayIndex} = state;

        return {
            onClick: () => {
                if (!view.hasActiveTrainingForDay(dayIndex)) {
                    return;
                }
                view.setState({selectedDayIndex: dayIndex});
            },
            className: classnames(style.head_cell, style.td, {
                [style.head_cell__disabled]: !view.hasActiveTrainingForDay(dayIndex),
                [style.head_cell__selected]: selectedDayIndex === dayIndex
            })
        };
    }

    renderDesktop() {
        const view = this;
        // const {state} = view;
        // const {selectedDayIndex} = state;
        const fullTrainingList = view.getFullTrainingList();
        const timeList = view.getTimeList();

        return <table className={style.wrapper}>
            <thead>
                <tr className={style.tr}>
                    <td className={classnames(style.head_cell, style.head_cell__empty, style.td)}>
                    &nbsp;
                    </td>
                    <td {...view.getHeaderPropsCell(0)}>
                        <span className={style.head_cell__line}/>
                        <span className={style.head_cell__diamond}/>
                    Понедельник
                    </td>
                    <td {...view.getHeaderPropsCell(1)}>
                        <span className={style.head_cell__line}/>
                        <span className={style.head_cell__diamond}/>
                    Вторник
                    </td>
                    <td {...view.getHeaderPropsCell(2)}>
                        <span className={style.head_cell__line}/>
                        <span className={style.head_cell__diamond}/>
                    Среда
                    </td>
                    <td {...view.getHeaderPropsCell(3)}>
                        <span className={style.head_cell__line}/>
                        <span className={style.head_cell__diamond}/>
                    Четверг
                    </td>
                    <td {...view.getHeaderPropsCell(4)}>
                        <span className={style.head_cell__line}/>
                        <span className={style.head_cell__diamond}/>
                    Пятница
                    </td>
                    <td {...view.getHeaderPropsCell(5)}>
                        <span className={style.head_cell__line}/>
                        <span className={style.head_cell__diamond}/>
                    Суббота
                    </td>
                    <td {...view.getHeaderPropsCell(6)}>
                        <span className={style.head_cell__line}/>
                        <span className={style.head_cell__diamond}/>
                    Воскресенье
                    </td>
                </tr>
            </thead>

            <tbody className={style.tbody}>
                {timeList.map((timeData, timeDataIndex) => <tr
                    className={style.tr}
                    key={timeDataIndex}>
                    {view.drawDesktopTimeCell(timeData, timeDataIndex)}

                    {[0, 1, 2, 3, 4, 5, 6]
                        .map(dayIndex => view.drawDesktopColumnCell(
                            fullTrainingList
                                .filter(fullTraining => fullTraining.dayIndex === dayIndex &&
                                timeData.begin.originalTime === fullTraining.time_from),
                            dayIndex, timeDataIndex
                        ))
                    }
                </tr>)}

            </tbody>

        </table>;
    }

    renderMobile() {
        const view = this;
        const fullTrainingList = view.getFullTrainingList();
        const timeList = view.getTimeList();

        return <div className={style.wrapper}>
            {['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
                .map((dayName, dayIndex) => view.renderMobileDay(dayName, dayIndex, fullTrainingList, timeList))}
        </div>;
    }

    renderMobileDay(dayName, dayIndex, fullTrainingList, timeList) {
        const view = this;

        return [
            <div key={dayName + '__thead'} className={style.tr}>
                <div {...view.getHeaderPropsCell(dayIndex)}>
                    <span className={style.head_cell__line}/>
                    <span className={style.head_cell__diamond}/>
                    {dayName}
                </div>
            </div>,
            <div key={dayName + '__tbody'} className={style.tbody}>
                {timeList.map((timeData, timeDataIndex) => {
                    const trainingListForDay = fullTrainingList
                        .filter(fullTraining => fullTraining.dayIndex === dayIndex &&
                            timeData.begin.originalTime === fullTraining.time_from);

                    if (trainingListForDay.length === 0) {
                        return null;
                    }

                    return <div
                        className={classnames(style.tr, style.tr_mobile_item_list)}
                        key={timeDataIndex}>
                        {view.drawMobileTimeCell(timeData, timeDataIndex)}
                        {view.drawMobileColumnCell(trainingListForDay, dayIndex, timeDataIndex)}
                    </div>;
                })}
            </div>
        ];
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {trainings, app} = props;

        return app.screen.width > appConst.tabletWidth ? view.renderDesktop() : view.renderMobile();
    }
}

export default connect(
    state => ({
        app: state.app
        // auth: state.auth
    }),
    {
        // closePopup: authAction.closePopup,
        // openPopupLogin: authAction.openPopupLogin,
        // openPopupRestore: authAction.openPopupRestore,
        // addToFavoriteClub: authAction.addToFavoriteClub,
        // removeFromFavorite: authAction.removeFromFavorite,
        // addToFavoriteTraining: authAction.addToFavoriteTraining,
        // addToFavoriteSubscription: authAction.addToFavoriteSubscription
    }
)(TrainingSchedule);
