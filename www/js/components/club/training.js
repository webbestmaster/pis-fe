import React, {Component} from 'react';
import cnx from '../../helper/cnx';
import {resolveImagePath} from '../../helper/path-x';
import {Link} from 'react-router-dom';
import TrainingCard from './training-card';

const appConst = require('./../../app-const.json');
const {fetchX} = require('./../../helper/fetch-x');

const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

export default class Trainings extends Component {
    constructor() {
        super();

        const view = this;

        view.state = {
            pageData: null
        };
    }

    componentDidMount() {
        const view = this;
        const {props, state} = view;
        const {clubId} = props;

        fetchX(appConst.pageDataUrl.club.replace('{{clubId}}', clubId))
            .then(({data}) => view.setState({pageData: data}))
            .catch(console.error);
    }

    renderTrainingSchedule(training) {
        const includedDays = weekDays.map(() => false);

        training.schedule
            .forEach(schedule => weekDays
                .forEach((dayName, dayIi) => Object
                    .assign(includedDays,
                        {[dayIi]: Boolean(schedule.day & Math.pow(2, dayIi + 1)) || includedDays[dayIi]} // eslint-disable-line no-bitwise
                    )
                )
            );

        return <div className="sale-swiper-card__week-schedule">
            {weekDays.map((dayName, dayIi) => <span
                key={dayIi} {...cnx('sale-swiper-card__week-day', {
                    'sale-swiper-card__week-day--active': includedDays[dayIi]
                })}>{dayName}</span>)}
        </div>;
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {pageData} = state;

        if (pageData === null) {
            return null;
        }

        const {trainings} = pageData;

        // trainings.push(...trainings);
        // trainings.push(...trainings);
        // trainings.push(...trainings);

        return <div className="hug sale hug--section">
            <h3 className="section__header">Тренировки</h3>

            <div className="sale-card-container">
                {trainings.map((training, ii) => <TrainingCard training={training} key={ii}/>)}
            </div>
        </div>;
    }
}
