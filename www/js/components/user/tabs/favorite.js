/* global window, setTimeout, Event */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import style from './../style.m.scss';
import {resolveImagePath} from './../../../helper/path-x';

const appConst = require('./../../../app-const.json');
const Swiper = require('./../../../lib/swiper');
const {fetchX} = require('./../../../helper/fetch-x');

class Favorite extends Component {
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

    componentDidMount() {
        const view = this;

        fetchX(appConst.pageDataUrl.home).then(pageData => view.setState({pageData}, () => view.initSwiper()));
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

        return <div className="hug sale">
            <h3 className="section__header">Избранное</h3>

            <p className={style.favorite__description}>
                Здесь сохранены все Ваши тренировки. Чтобы убрать тренировку из избранного, нажмите
                <span className={style.favorite__description_heart}/>
            </p>

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
                                    <h3 className="sale-swiper-card__header">{promotion.title}</h3>
                                    <p className="sale-swiper-card__description">{promotion.description}</p>
                                    {/* <p className="sale-swiper-card__details">
                                    12&nbsp;абонементов | 3&nbsp;тренировки
                                    </p>*/}
                                    <p className="sale-swiper-card__details">Скидка: {promotion.discount} руб.</p>
                                    <div className="sale-swiper-card__button">Подробнее</div>
                                </div>
                            </Link>)}
                    </div>
                </div>
            </div>
        </div>;
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
        app: state.app,
        auth: state.auth
    }
    ),
    {}
)(Favorite);

