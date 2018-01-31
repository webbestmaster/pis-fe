/* global window, setTimeout, Event */
import React, {Component} from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import style from './style.m.scss';
import classnames from 'classnames';
import cnx from './../../helper/cnx';
import Lightbox from 'react-images';
import MapView from './../map';
import MapItemClub from './../map/map-item-club';
import {plural} from './../../helper/plural';
import Rating from './../util/rating';
import {connect} from 'react-redux';
import DateFilter, {prepareScheduleList} from './date-filter';
import {resolveImagePath} from './../../helper/path-x';
import {defaultDateFilter} from '../trainings-catalog/reducer';
import {Link} from 'react-router-dom';
import TrainingCard from './../club/training-card';

const globalAppConst = require('./../../app-const.json');
const appConst = require('./../../app-const.json');
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

        fetchX(appConst.pageDataUrl.training.replace('{{trainingId}}', trainingId))
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

        // need to fix swiper
        setTimeout(() => window.dispatchEvent(new Event('resize')), 1e3);
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
        const {schedule} = row;

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
            <span className="hidden">--- FIXME:LINK ---</span>
            <Link to={'###'} className={style.card_button}>забронировать</Link>
            <p className={style.card_cash_back}>Бонус:&nbsp;
            <span className={style.card_cash_back_value}>+0.00</span>
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

        const {host} = appConst.pageDataUrl;
        const {row} = pageData;
        const {fitnessClub} = row;

        return <div className="hug">
            {/* this wrapper need for sticky card */}
            <div>
                <h3 className="section__header">Описание тренировки</h3>

                {props.app.screen.width > globalAppConst.mobileWidth ? view.renderCard() : null}

                <div className={style.description}>
                    <div className={style.description_image}
                        style={{backgroundImage: 'url(' + resolveImagePath(row.image) + ')'}}/>
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

                <div className={style.description_text} dangerouslySetInnerHTML={{
                    __html: row.description // eslint-disable-line id-match
                }}/>

                {props.app.screen.width <= globalAppConst.mobileWidth ? view.renderCard() : null}

                <div className="section__with-sticky-card">
                    <h3 className="section__header">Информация о клубе</h3>

                    <div {...cnx('clubs-catalog-list-item', 'clear-full', style.club_info)}>
                        <div className="clubs-catalog-list-item__image"
                            style={{backgroundImage: 'url(' + resolveImagePath(fitnessClub.image) + ')'}}/>
                        <div className="clubs-catalog-list-item__info">
                            <h4 className="clubs-catalog-list-item__header">{fitnessClub.title}</h4>
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
                            <div className="clubs-catalog-list-item__description" dangerouslySetInnerHTML={{
                                __html: fitnessClub.description // eslint-disable-line id-match
                            }}/>
                        </div>
                    </div>

                </div>
            </div>

            {pageData.similarTrainings.length > 0 ?
                <div className="sale hug--section clear-full">
                    <h2 className="section__header section__header--plus-swiper">Похожие тренировки этого клуба</h2>

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
