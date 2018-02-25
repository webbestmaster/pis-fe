/* global window, requestAnimationFrame, Event */
import React, {Component} from 'react';
import style from './style.m.scss';
import cnx from './../../helper/cnx';
import {plural} from './../../helper/plural';
import Rating from './../util/rating';
import {connect} from 'react-redux';
import DateFilter, {prepareScheduleList} from './date-filter';
import {resolveImagePath} from './../../helper/path-x';
import {defaultDateFilter} from '../trainings-catalog/reducer';
import {Link} from 'react-router-dom';
import TrainingCard from './../club/training-card';
import TextCap from '../util/text-cap';
import TextEllipsis from '../util/text-ellipsis';

const globalAppConst = require('./../../app-const');
const appConst = require('./../../app-const');
const {fetchX} = require('./../../helper/fetch-x');
const {capitalizeFirstLetter} = require('./../../helper/string');
const {reduceSeconds} = require('./../../helper/date');
const Swiper = require('./../../lib/swiper');
const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

const defaultItems = [defaultDateFilter];
const millisecondsInOneDay = 24 * 60 * 60 * 1000;

while (defaultItems.length < 7) {
    defaultItems.push(defaultItems[defaultItems.length - 1] + millisecondsInOneDay);
}

const yearMonthsMap = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];
const today = 'сегодня';
const tomorrow = 'завтра';


class Description extends Component {
    constructor() {
        super();

        const view = this;

        view.attr = {};

        view.state = {
            isShowFullDescription: false,
            pageData: null
        };
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

    componentDidMount() {
        const view = this;
        const {props, state} = view;
        const {trainingId} = props;

        fetchX(appConst.pageDataUrl.host + appConst.pageDataUrl.training.replace('{{trainingId}}', trainingId))
            .then(({data}) => view.setState({pageData: data}, () => view.initInteractive()))
            .catch(console.error);
    }

    initInteractive() {
        const view = this;
        const {refs} = view;
        const {swiperTrainings} = refs;

        view.attr.swiperSubscription = new Swiper(swiperTrainings, {
            slidesPerView: 'auto',
            freeMode: true
        });

        view.attr.swiperSubscription.translate = -144;

        // need to fix swiper
        requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
    }

    renderCard() { // eslint-disable-line complexity
        const view = this;
        const {state} = view;
        const {pageData} = state;

        if (pageData === null) {
            return null;
        }

        const {row} = pageData;
        const promotion = row.promotion instanceof Array || !row.promotion ? null : row.promotion; // yes, if promotion is not exist: row.promotion === []
        const schedule = row.schedule
            .sort((scheduleA, scheduleB) => parseFloat(scheduleA.time_from) - parseFloat(scheduleB.time_from));
        const preparedScheduleList = prepareScheduleList(schedule);
        const {firstSchedule, firstDayIndex} = preparedScheduleList;
        const currentDate = new Date(defaultItems[firstDayIndex]);
        const dayData = firstSchedule[firstDayIndex];
        let dateDate = null;

        switch (firstDayIndex) {
            case 0:
                dateDate = today;
                break;
            case 1:
                dateDate = tomorrow;
                break;

            default:
                dateDate = currentDate.getDate() + ' ' + yearMonthsMap[currentDate.getMonth()];
        }

        return <div className={style.card}>
            <p className={style.card__time}>{capitalizeFirstLetter(dateDate)}:&nbsp;
            {reduceSeconds(dayData.time_from)} - {reduceSeconds(dayData.time_to)}</p>
            {/* <div className={style.card_percent}>%</div>*/}
            <div className={style.card_short_info_wrapper}>
                <div className={style.card_short_info_icon + ' clubs-catalog-filter__header-icon--' + row.category}/>
                <p className={style.card_short_info_description}>{row.title}</p>
            </div>

            {promotion ?
                <div>
                    <p className={style.card_cost}>Цена со скидкой:&nbsp;
                    {(row.price - promotion.discount).toFixed(2)} руб.
                    </p>
                    <p className={style.card_old_cost}>&nbsp;&nbsp;{row.price}&nbsp;&nbsp;</p>
                </div> :
                <div>
                    <p className={style.card_cost}>Цена: {row.price}</p>
                    <br/>
                </div>}

            <p className={style.card_short_additional_info}>Цена действительна при бронировании на&nbsp;сайте</p>
            <br/>
            {/* <p className={style.card_old_cost}>&nbsp;&nbsp;80 руб.&nbsp;&nbsp;</p>*/}
            <Link
                to={'/order/training/' +
                row.id + '/' +
                firstSchedule[firstDayIndex].id + '/' +
                firstSchedule[firstDayIndex].dayId + '/'}
                className={style.card_button}>
                забронировать
            </Link>
            <p className={style.card_cash_back}>Бонус:&nbsp;
            <span className={style.card_cash_back_value}>+{parseFloat(row.cashback).toFixed(2)}</span>
            </p>
        </div>;
    }

    render() { // eslint-disable-line complexity
        const view = this;
        const {props, state} = view;
        const {pageData} = state;

        if (pageData === null) {
            return null;
        }

        const {row} = pageData;
        const {fitnessClub} = row;
        const promotion = row.promotion instanceof Array || !row.promotion ? null : row.promotion; // yes, if promotion is not exist: row.promotion === []

        return <div className="hug">
            {/* this wrapper need for sticky card */}
            <div>
                <h3 className="section__header">{row.title}</h3>

                {props.app.screen.width > globalAppConst.mobileWidth ? view.renderCard() : null}

                <div className={style.description}>
                    <div
                        className={style.description_image}
                        style={{
                            backgroundImage: 'url(' +
                            resolveImagePath(promotion ? promotion.image : row.image) +
                            ')'
                        }}/>
                    <br/>
                    <br/>

                    <div className={style.description_short_info}>
                        <div {...cnx(style.description_short_info_icon, style.description_short_info_icon__map)}/>
                        <div className={style.description_info_item}>
                            <h3 className={style.description_info_item_header}>Адрес тренировки:</h3>
                            <p className={style.description_info_item_text}>{fitnessClub.address}</p>
                        </div>
                    </div>

                    <div className={style.description_short_info}>
                        <div {...cnx(style.description_short_info_icon, style.description_short_info_icon__metro)}/>
                        <div className={style.description_info_item}>
                            <h3 className={style.description_info_item_header}>Метро:</h3>
                            <p className={style.description_info_item_text}>
                                {fitnessClub.attributes.comfort & 2 ? // eslint-disable-line no-bitwise
                                    'Есть метро' :
                                    'Нет метро'}
                            </p>
                        </div>
                    </div>

                    <div className={style.description_short_info}>
                        <div {...cnx(style.description_short_info_icon, style.description_short_info_icon__parking)}/>
                        <div className={style.description_info_item}>
                            <h3 className={style.description_info_item_header}>Парковка:</h3>
                            <p className={style.description_info_item_text}>
                                {fitnessClub.attributes.comfort & 1024 ? // eslint-disable-line no-bitwise
                                    'Есть парковка' :
                                    'Нет парковки'}
                            </p>
                        </div>
                    </div>

                </div>

                <div className="section__with-sticky-card">
                    <div className={style.training_date_filter}>
                        <DateFilter trainingId={props.trainingId}/>
                    </div>
                </div>

                <div className={style.description_text}>
                    <TextEllipsis
                        charCap={state.isShowFullDescription ? row.description.length : 1000}
                        readMore={<span
                            key="read-more"
                            className="section__show-more"
                            onClick={() => view.setState({isShowFullDescription: true})}>ещё&hellip;</span>}>
                        {row.description}
                    </TextEllipsis>
                </div>

                {props.app.screen.width <= globalAppConst.mobileWidth ? view.renderCard() : null}

                <div className="section__with-sticky-card">
                    <h3 className="section__header">Информация о клубе</h3>

                    <div {...cnx('clubs-catalog-list-item', 'clear-full', style.club_info)}>
                        <div
                            className="clubs-catalog-list-item__image"
                            style={{backgroundImage: 'url(' + resolveImagePath(fitnessClub.image) + ')'}}/>
                        <div className="clubs-catalog-list-item__info">
                            <Link
                                target="_blank"
                                to={'/club/' + fitnessClub.id}
                                className="clubs-catalog-list-item__header section_htdu">
                                {fitnessClub.title}
                            </Link>
                            <p className="clubs-catalog-list-item__address">{fitnessClub.address}</p>

                            <div className={style.club_info_rating + ' clear-self'}>
                                <Rating
                                    rating={fitnessClub.rating}
                                    className="clubs-catalog-list-item__rating-stars"
                                    star="clubs-catalog-list-item__rating-star"
                                    activeStar="clubs-catalog-list-item__rating-star--active"/>

                                <Link to={'/club/' + fitnessClub.id + '/tab-index/1'}
                                    className="clubs-catalog-list-item__reviews-count">
                                    {plural(fitnessClub.feedbacksCount, 'отзыв')}
                                </Link>
                            </div>
                            <div className="clubs-catalog-list-item__description">
                                <TextCap lineCap={8}>
                                    {fitnessClub.description}
                                </TextCap>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {pageData.similarTrainings.length > 0 ?
                <div className="sale hug--section clear-full">
                    <h2 className="section__header section__header--plus-swiper">Другие тренировки этого клуба</h2>

                    <div className="sale-slider">
                        <div
                            ref="swiperTrainings"
                            className="swiper-container">

                            <div className="swiper-wrapper">
                                {pageData.similarTrainings
                                    .map((training, ii) => <TrainingCard training={training} key={ii}/>)}
                            </div>
                            {/* <div className="swiper__arrow"/>*/}
                        </div>
                    </div>
                </div> :
                null}
        </div>;
    }
}


export default connect(
    state => ({
        // trainingsCatalog: state.trainingsCatalog,
        app: state.app
    }),
    {}
)(Description);
