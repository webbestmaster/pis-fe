/* global window, requestAnimationFrame, Event */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {resolveImagePath} from './../../helper/path-x';

const Swiper = require('./../../lib/swiper');
const appConst = require('./../../app-const');
const {fetchX} = require('./../../helper/fetch-x');

class Sale extends Component {
    constructor() {
        super();

        const view = this;

        view.attr = {
            swiper: null
        };

        view.state = {
            pageData: null
        };
    }

    async componentDidMount() {
        const view = this;

        const pageData = await fetchX(appConst.pageDataUrl.host + appConst.pageDataUrl.home);

        view.setState({pageData}, () => view.initSwiper());
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
        requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {pageData} = state;

        if (pageData === null) {
            return null;
        }

        return <section className="section sale">
            <div className="section__header">
                Акции: <h1 className="seo-header">спорт и фитнес в Минске</h1>
                <Link to={{
                    pathname: '/subscriptions',
                    state: {fromSaleSwiper: true}
                }} className="section__button">Смотреть все акции</Link>
            </div>
            <div className="sale-slider">
                <div ref="swiperContainer" className="swiper-container">
                    <div className="swiper-wrapper">
                        {pageData.data.tabs.promotions.map((promotion, index) =>
                            <Link to={getSaleLink(promotion)} key={index}
                                className="swiper-slide sale-swiper-card">
                                <div className="sale-swiper-card__label">%</div>
                                <div className="sale-swiper-card__content">
                                    <div className="sale-swiper-card__image"
                                        style={{
                                            backgroundImage: 'url(' + resolveImagePath(promotion.image) + ')'
                                        }}/>
                                    <h3 className="sale-swiper-card__header line-cap-2">{promotion.title}</h3>
                                    <p className="sale-swiper-card__description">{promotion.description}</p>
                                    {/* <p className="sale-swiper-card__details">
                                    12&nbsp;абонементов | 3&nbsp;тренировки
                                    </p>*/}
                                    <p className="sale-swiper-card__details">Скидка: {promotion.discount} руб.</p>
                                    <div className="sale-swiper-card__button">Подробнее</div>
                                </div>
                            </Link>)}
                    </div>
                    {/* <div className="swiper__arrow"/>*/}

                </div>
            </div>
            <div className="ta-center mobile-only">
                <Link to="/subscriptions" className="section__button section__button--active">Смотреть все акции</Link>
            </div>
        </section>;
    }
}

function getSaleLink(promotion) {
    if (promotion.fitness_club_subscription_id !== 0) {
        return '/subscription/' + promotion.fitness_club_subscription_id;
    }

    if (promotion.fitness_club_training_id !== 0) {
        return '/training/' + promotion.fitness_club_training_id;
    }

    return '/club/' + promotion.fitness_club_id;
}

export default connect(
    state => ({
        // app: state.app
    }),
    {}
)(Sale);
