/* global window, requestAnimationFrame, Event */
import React, {Component} from 'react';
// import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import style from './style.m.scss';
// import classnames from 'classnames';
import cnx from './../../helper/cnx';
// import Lightbox from 'react-images';
// import MapView from './../map';
// import MapItemClub from './../map/map-item-club';
import {plural} from './../../helper/plural';
import {reduceSeconds, getTimePeriodName} from './../../helper/date';
import Rating from './../util/rating';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {resolveImagePath} from '../../helper/path-x';
import SubscriptionCard from './../club/subscription-card';
import TextCap from '../util/text-cap';

const globalAppConst = require('./../../app-const');
const appConst = require('./../../app-const');
const {fetchX} = require('./../../helper/fetch-x');
const Swiper = require('./../../lib/swiper');

// const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

class Description extends Component {
    constructor() {
        super();

        const view = this;

        view.attr = {};

        view.state = {
            pageData: null
        };
    }

    componentDidMount() {
        const view = this;
        const {props, state} = view;
        const {subscriptionId} = props;

        fetchX(appConst.pageDataUrl.host + appConst.pageDataUrl.subscription
            .replace('{{subscriptionId}}', subscriptionId))
            .then(({data}) => view.setState({pageData: data}, () => view.initInteractive()))
            .catch(console.error);
    }

    initInteractive() {
        const view = this;
        const {refs} = view;
        const {swiperSubscription} = refs;

        view.attr.swiperSubscription = new Swiper(swiperSubscription, {
            slidesPerView: 'auto',
            freeMode: true
        });

        view.attr.swiperSubscription.translate = -144;

        // need to fix swiper
        requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
    }

    renderCard() { // eslint-disable-line complexity
        const view = this;
        const {props, state} = view;
        const {pageData} = state;
        const {host} = appConst.pageDataUrl;
        const {row} = pageData;
        const promotion = row.promotion instanceof Array || !row.promotion ? null : row.promotion; // yes, if promotion is not exist: row.promotion === []

        return <div {...cnx(style.card, {
            [style.card__no_promotion]: !promotion
        })}>
            {promotion && <div className={style.card_percent}>%</div>}
            <div className={style.card_short_info_wrapper}>
                <p className={style.card_short_info_number}>{row.period_amount}</p>
                <p className={style.card_short_info_description}>
                    Абонемент на&nbsp;
                    {plural(row.period_amount, getTimePeriodName(row.period_type))}
                </p>
            </div>

            {promotion && <p className={style.card_short_additional_info}>Предложение ограничено</p>}

            {promotion ?
                <div>
                    <p
                        className={style.card_cost}>Цена со скидкой:&nbsp;
                        {(row.price - promotion.discount).toFixed(2)} руб.
                    </p>
                    <p className={style.card_old_cost}>&nbsp;&nbsp;{row.price}&nbsp;&nbsp;</p>
                </div> :
                <div>
                    <p className={style.card_cost}>Цена: {row.price}</p>
                    <br/>
                </div>}

            <Link to={'/order/subscription/' + pageData.row.id} className={style.card_button}>забронировать</Link>
            <p className={style.card_cash_back}>Бонус:&nbsp;
            <span className={style.card_cash_back_value}>+{parseFloat(row.cashback).toFixed(2)}</span>
            </p>
        </div>;
    }

    render() { // eslint-disable-line complexity
        const view = this;
        const {props, state} = view;
        const {pageData} = state;
        const {host} = appConst.pageDataUrl;

        if (pageData === null) {
            return null;
        }

        const {row, similarSubscriptions = []} = pageData;
        const {fitnessClub} = row;

        return <div className="hug">
            {/* this wrapper need for sticky card */}
            <div>
                <h3 className="section__header">{row.title}</h3>

                {props.app.screen.width > globalAppConst.mobileWidth ? view.renderCard() : null}

                <div className={style.description}>
                    <div className={style.description_image}
                        style={{backgroundImage: 'url(' + resolveImagePath(row.image) + ')'}}/>

                    <div className={style.description_short_info}>
                        <div {...cnx(style.description_short_info_icon, style.description_short_info_icon__time)}/>
                        <div className={style.description_info_item}>
                            <h3 className={style.description_info_item_header}>Время действия:</h3>
                            <p className={style.description_info_item_text}>
                                Пн-Пт: {reduceSeconds(row.work_from)} - {reduceSeconds(row.work_to)},
                                Сб-Вс: {reduceSeconds(row.weekend_work_from)} - {reduceSeconds(row.weekend_work_to)}
                            </p>
                        </div>
                    </div>

                    <div className={style.description_short_info}>
                        <div {...cnx(style.description_short_info_icon, style.description_short_info_icon__map)}/>
                        <div className={style.description_info_item}>
                            <h3 className={style.description_info_item_header}>Адрес тренировки:</h3>
                            <p className={style.description_info_item_text}>
                                {fitnessClub.address}
                            </p>
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

                <div className={style.description_text}>
                    <TextCap lineCap={10}>
                        {row.description}
                    </TextCap>
                </div>

                {props.app.screen.width <= globalAppConst.mobileWidth ? view.renderCard() : null}

                <div className="section__with-sticky-card">
                    <h3 className="section__header">Информация о клубе</h3>

                    <div {...cnx('clubs-catalog-list-item', 'clear-full', style.club_info)}>
                        <div
                            className="clubs-catalog-list-item__image"
                            style={{backgroundImage: 'url(' + (host + fitnessClub.image) + ')'}}/>
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

            <div className="sale hug--section clear-full">
                <h2 className="section__header section__header--plus-swiper">Другие абонементы этого клуба</h2>

                <div className="sale-slider">
                    <div
                        ref="swiperSubscription"
                        className="swiper-container">
                        <div className="swiper-wrapper">

                            {similarSubscriptions.filter((item, ii) => ii <= 3)
                                .map((subscription, ii) => <SubscriptionCard subscription={subscription} key={ii}/>)}
                        </div>
                    </div>
                </div>
            </div>
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
