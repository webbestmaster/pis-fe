import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import classnames from 'classnames';
import {headerMaxHeight} from './index';
import Search from './search';

const backSlideImage = require('./../../../style/images/header/search.jpg');
const leftSlideImage = require('./../../../style/images/header/clubs.jpg');
const centerSlideImage = require('./../../../style/images/header/subscriptions.jpg');
const rightSlideImage = require('./../../../style/images/header/trainings.jpg');
const globalAppConst = require('./../../app-const');

class Slider extends Component {
    constructor() {
        super();

        const view = this;

        view.state = {
            activeSlide: null
        };
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {app} = props;
        const deltaTop = app.screen.width > globalAppConst.tabletWidth ?
            Math.min(Math.round((app.screen.height - headerMaxHeight) / 2 * 1.5), 0) :
            0;

        return <div className="header-slider">
            <div className={classnames('header-slider__slide', 'header-slider__slide--back')}>
                <div className="header-slider__slide-image" style={{backgroundImage: 'url(' + backSlideImage + ')'}}/>
            </div>
            {/* slides begin */}
            <div className={classnames('header-slider__slide', {
                'header-slider__slide--active': state.activeSlide === 'leftSlide'
            })}>
                {/* className="header-slider__slide header-slider__slide--left hidden" */}
                <div className="header-slider__slide-image" style={{backgroundImage: 'url(' + leftSlideImage + ')'}}/>
            </div>
            <div className={classnames('header-slider__slide', {
                'header-slider__slide--active': state.activeSlide === 'rightSlide'
            })}>
                {/* <div className="header-slider__slide header-slider__slide--right hidden">*/}
                <div className="header-slider__slide-image" style={{backgroundImage: 'url(' + rightSlideImage + ')'}}/>
            </div>
            <div className={classnames('header-slider__slide', {
                'header-slider__slide--active': state.activeSlide === 'centerSlide'
            })}>
                {/* <div className="header-slider__slide header-slider__slide--center hidden">*/}
                <div className="header-slider__slide-image" style={{backgroundImage: 'url(' + centerSlideImage + ')'}}/>
            </div>
            {/* slides end */}

            <div className="header-slider__slide-pattern"/>

            {/* navigation begin */}
            {app.screen.width > globalAppConst.tabletWidth ?
                <div className="header-slider__navigation" style={{marginTop: deltaTop}}>
                    <div className="header-slider__navigation-hug">
                        <Link
                            to="/clubs"
                            onMouseOver={() => view.setState({activeSlide: 'leftSlide'})}
                            onMouseOut={() => view.setState({activeSlide: null})}
                            className="slider-navigation-item slider-navigation-item--left">
                            Клубы
                            <span className="slider-navigation-item__button">Подробнее</span>
                        </Link>
                        <Link
                            to="/trainings"
                            onMouseOver={() => view.setState({activeSlide: 'rightSlide'})}
                            onMouseOut={() => view.setState({activeSlide: null})}
                            className="slider-navigation-item slider-navigation-item--right">
                            Тренировки
                            <span className="slider-navigation-item__button">Подробнее</span>
                        </Link>
                        <Link
                            to="/subscriptions"
                            onMouseOver={() => view.setState({activeSlide: 'centerSlide'})}
                            onMouseOut={() => view.setState({activeSlide: null})}
                            className="slider-navigation-item slider-navigation-item--center">
                            Абонементы
                            <span className="slider-navigation-item__button">Подробнее</span>
                        </Link>
                    </div>
                </div> :
                <div className="header-slider__navigation header-slider__navigation--mobile"
                    style={{marginTop: deltaTop}}>
                    <div className="header-slider__navigation-hug">
                        <div
                            onClick={() => state.activeSlide === 'leftSlide' ?
                                view.setState({activeSlide: null}) :
                                view.setState({activeSlide: 'leftSlide'})
                            }
                            className={classnames('slider-navigation-item slider-navigation-item--left', {
                                'slider-navigation-item--active': state.activeSlide === 'leftSlide'
                            })}>
                            Клубы
                            <Link className="slider-navigation-item__button" to="/clubs">Подробнее</Link>
                        </div>
                        <div
                            onClick={() => state.activeSlide === 'rightSlide' ?
                                view.setState({activeSlide: null}) :
                                view.setState({activeSlide: 'rightSlide'})}
                            className={classnames('slider-navigation-item slider-navigation-item--right', {
                                'slider-navigation-item--active': state.activeSlide === 'rightSlide'
                            })}>
                            Тренировки
                            <Link className="slider-navigation-item__button" to="/trainings">Подробнее</Link>
                        </div>
                        <div
                            onClick={() => state.activeSlide === 'centerSlide' ?
                                view.setState({activeSlide: null}) :
                                view.setState({activeSlide: 'centerSlide'})}
                            className={classnames('slider-navigation-item slider-navigation-item--center', {
                                'slider-navigation-item--active': state.activeSlide === 'centerSlide'
                            })}>
                            Абонементы
                            <Link className="slider-navigation-item__button" to="/subscriptions">Подробнее</Link>
                        </div>
                    </div>
                </div>}
            {/* navigation end */}

            {/* texts begin */}
            <div className={classnames('header-slider__promo-texts', {
                'header-slider__promo-texts--mobile': !(app.screen.width > globalAppConst.tabletWidth)
            })}
            style={{marginTop: deltaTop * 0.9}}>
                <div className="header-slider__promo-texts-hug">
                    <h2 className={classnames('header-slider__promo-text', {
                        'header-slider__promo-text--active': state.activeSlide === 'leftSlide'
                    })}>
                        Сетевые клубы рядом<br className="header-slider__promo-text-br"/>с домом и работой
                        <Link className="slider-navigation-item__button" to="/clubs">Подобрать</Link>
                    </h2>
                    <h2 className={classnames('header-slider__promo-text', {
                        'header-slider__promo-text--active': state.activeSlide === 'rightSlide'
                    })}>
                        Попробуй прежде чем<br className="header-slider__promo-text-br"/>купить
                        <Link className="slider-navigation-item__button" to="/trainings">Подобрать</Link>
                    </h2>
                    <h2 className={classnames('header-slider__promo-text', {
                        'header-slider__promo-text--active': state.activeSlide === 'centerSlide'
                    })}>
                        Специальные цены при<br className="header-slider__promo-text-br"/>бронировании с сайта
                        <Link className="slider-navigation-item__button" to="/subscriptions">Подобрать</Link>
                    </h2>
                </div>
            </div>
            {/* texts end */}

            {/* search, show only for backSlide, e. g. activeSlide: null */}
            <div className={classnames('header-slider__search', {
                'header-slider__search--active': state.activeSlide === null
            })}
            style={{marginTop: deltaTop}}>
                <Search />
            </div>
        </div>;
    }
}

export default connect(
    state => ({
        app: state.app
    }),
    {}
)(Slider);
