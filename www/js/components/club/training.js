import React, {Component} from 'react';
// import cnx from '../../helper/cnx';
import TrainingCard from './training-card';
import TrainingSchedule from './training-schedule/';
import SwitchButtonRowsTable from './../ui/switch-button-rows-table';

const appConst = require('./../../app-const');
const {fetchX} = require('./../../helper/fetch-x');

// const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

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

        fetchX(appConst.pageDataUrl.host + appConst.pageDataUrl.club.replace('{{clubId}}', clubId))
            .then(({data}) => view.setState({pageData: data}))
            .catch(console.error);
    }

    /*
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
    */

    renderCardList() {
        const view = this;
        const {props, state} = view;
        const {pageData} = state;

        if (pageData === null) {
            return null;
        }

        const {trainings} = pageData;

        return <div className="sale-card-container">
            {trainings.map((training, ii) => <TrainingCard training={training} key={ii}/>)}
        </div>;
    }

    renderSchedule() {
        const view = this;
        const {props, state} = view;
        const {pageData} = state;

        if (pageData === null) {
            return null;
        }

        const {trainings} = pageData;

        return <TrainingSchedule trainings={trainings}/>;
    }

    render() {
        const view = this;
        const {props} = view;
        const {openAs, setOpenAs} = props;

        return <div className="hug sale hug--section">
            <h3 className="section__header section__header--with-switcher">
                <SwitchButtonRowsTable
                    activeButton={openAs === 'schedule' ? 'list' : 'table'}
                    setTable={() => setOpenAs('card')}
                    setList={() => setOpenAs('schedule')}
                />
                Тренировки
            </h3>

            {openAs === 'card' ? view.renderCardList() : null}
            {openAs === 'schedule' ? view.renderSchedule() : null}
        </div>;
    }
}
