import React, {Component} from 'react';
import cnx from '../../helper/cnx';
import {resolveImagePath} from '../../helper/path-x';
import {Link} from 'react-router-dom';

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

                {/* <div className="sale-slider">*/}
                {/* <div ref="swiperTrainings"*/}
                {/* className="swiper-container swiper-container-horizontal swiper-container-free-mode">*/}
                {/* <div className="swiper-wrapper">*/}

                {trainings.map((training, ii) => {
                    const promotion = training.promotion instanceof Array || !training.promotion ?
                        null :
                        training.promotion; // yes, if promotion is not exist: row.promotion === []

                    return <Link to={'/training/' + (promotion ?
                        promotion.fitness_club_training_id :
                        training.id)} key={ii} className="swiper-slide sale-swiper-card">
                        <div className="sale-swiper-card__label sale-swiper-card__label--line-only"/>
                        <div className="sale-swiper-card__static-content">
                            <div className="sale-swiper-card__training-image"
                                style={{backgroundImage: 'url(' + resolveImagePath(training.image) + ')'}}/>
                            <div className="sale-swiper-card__subscription-data">
                                <p className="sale-swiper-card__subscription-single-header">{training.title}</p>
                            </div>
                            {view.renderTrainingSchedule(training)}
                            <div className="sale-swiper-card__subscription-training-description"
                                dangerouslySetInnerHTML={{
                                    __html: training.description // eslint-disable-line id-match
                                }}/>
                            <p className="sale-swiper-card__subscription-cost">{promotion ?
                                (training.price - promotion.discount).toFixed(2) :
                                training.price} <span
                                className="sale-swiper-card__subscription-cost-currency">руб.</span></p>
                            <div className="sale-swiper-card__button">Забронировать</div>
                        </div>
                    </Link>;
                })}
                {/* </div>*/}
                {/* </div>*/}
                {/* </div>*/}
            </div>
        </div>;
    }
}
