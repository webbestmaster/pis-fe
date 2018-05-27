/* global window, setTimeout, Event */
import React, {Component} from 'react';
import classnames from 'classnames';
import cnx from './../../../helper/cnx';
import {Link, withRouter} from 'react-router-dom';
import {resolveImagePath} from './../../../helper/path-x';
import {connect} from 'react-redux';
import * as authAction from './../../auth/action';
import style from './style.m.scss';

const appConst = require('./../../../app-const');
const find = require('lodash/find');
const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

class TrainingSchedule extends Component {
    constructor() {
        super();

        const view = this;

        view.state = {
            selectedDayIndex: view.getFirstActiveTrainingDay(),
            selectedTimeIndex: -1
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

        trainings.forEach(training => {
            const scheduleList = training.schedule || [];

            scheduleList
                .forEach(schedule => {
                    let dayNumber = 1;

                    for (; dayNumber <= 7; dayNumber += 1) {
                        if (schedule.day & Math.pow(2, dayNumber)) { // eslint-disable-line no-bitwise
                            fullTrainingList.push({
                                training,
                                time_from: schedule.time_from, // eslint-disable-line id-match, camelcase
                                dayIndex: dayNumber - 1
                            });
                        }
                    }
                });
        });

        return fullTrainingList;
    }

    drawDesktopColumnCell(fullTrainingDataList, nodeKey) {
        if (fullTrainingDataList.length === 0) {
            return <td key={nodeKey}/>;
        }

        return <td key={nodeKey}>{fullTrainingDataList.map((data, dataIndex) => <div key={dataIndex}>
            {data.training.title}
        </div>)}</td>;
    }

    drawDesktopTimeCell(timeData, indexTimeData) {
        const view = this;
        const {state} = view;
        const {selectedTimeIndex} = state;

        return <td
            onClick={() => view.setState({selectedTimeIndex: indexTimeData})}
            className={classnames(style.time_cell, {
                [style.time_cell__selected]: selectedTimeIndex === indexTimeData
            })}>
            {String(timeData.begin.hour).padStart(2, '0')}
            :
            {String(timeData.begin.minute).padStart(2, '0')}
        </td>;
    }

    hasActiveTrainingForDay(dayIndex) {
        // TODO: implement this!!!
        // const view = this;
        // const fullTrainingList = view.getFullTrainingList();
        // const timeList = view.getTimeList();
        const dateNow = new Date();

        const nowDayIndex = (dateNow.getDay() || 7) - 1;

        return dayIndex >= nowDayIndex;
    }

    getPropsCell(dayIndex) {
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
            className: classnames(style.head_cell, {
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
                <tr>
                    <td className={classnames(style.head_cell, style.head_cell__empty)}>
                    &nbsp;
                    </td>
                    <td {...view.getPropsCell(0)}>
                    Понедельник
                    </td>
                    <td {...view.getPropsCell(1)}>
                    Вторник
                    </td>
                    <td {...view.getPropsCell(2)}>
                    Среда
                    </td>
                    <td {...view.getPropsCell(3)}>
                    Четверг
                    </td>
                    <td {...view.getPropsCell(4)}>
                    Пятница
                    </td>
                    <td {...view.getPropsCell(5)}>
                    Суббота
                    </td>
                    <td {...view.getPropsCell(6)}>
                    Воскресенье
                    </td>
                </tr>
            </thead>

            <tbody>
                {timeList.map((timeData, indexTimeData) => <tr

                    key={indexTimeData}>
                    {view.drawDesktopTimeCell(timeData, indexTimeData)}

                    {[0, 1, 2, 3, 4, 5, 6]
                        .map(dayIndex => view.drawDesktopColumnCell(
                            fullTrainingList
                                .filter(fullTraining => fullTraining.dayIndex === dayIndex &&
                                timeData.begin.originalTime === fullTraining.time_from),
                            dayIndex
                        ))
                    }
                </tr>)}

            </tbody>

        </table>;
    }

    renderMobile() {
        const view = this;
        const {props, state} = view;
        const {trainings} = props;

        return <div>
            mobile table
        </div>;
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
