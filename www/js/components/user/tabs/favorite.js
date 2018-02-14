/* global window, requestAnimationFrame, Event */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import style from './../style.m.scss';
import {resolveImagePath} from './../../../helper/path-x';
import TrainingCard from './../../club/training-card';
import SubscriptionCard from './../../club/subscription-card';
import cnx from './../../../helper/cnx';

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

        view.attr.swiper.translate = -144;

        // need to fix swiper
        requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {pageData} = state;
        const {auth} = props;

        if (pageData === null) {
            return null;
        }

        return <div className="hug sale">
            <h3 className="section__header">Избранное</h3>

            {auth.login.data.favorites.length === 0 ?
                <p
                    style={{paddingTop: 100, paddingBottom: 100}}
                    className={style.favorite__description}>
                    Здесь пока нет сохранённых тренировок. Чтобы добавить тренировку в избранное, нажмите
                    <span className={style.favorite__description_heart}/>
                </p> :
                <p className={style.favorite__description}>
                    Здесь сохранены все Ваши тренировки. Чтобы убрать тренировку из избранного, нажмите
                    <span className={style.favorite__description_heart}/>
                </p>}

            <div className="sale-slider">
                <div ref="swiperContainer" className="swiper-container">
                    <div {...cnx('swiper-wrapper', style.favorite_container)} >
                        {auth.login.data.favorites
                            .map((favoriteItem, ii) => {
                                switch (favoriteItem.type) {
                                    case 'training':
                                        return <TrainingCard training={favoriteItem.data} key={ii}/>;
                                    case 'subscription':
                                        return <SubscriptionCard subscription={favoriteItem.data} key={ii}/>;
                                    default:
                                        return null;
                                }
                            })}
                    </div>
                    {/* <div className="swiper__arrow"/>*/}
                </div>
            </div>
        </div>;
    }
}

export default connect(
    state => ({
        app: state.app,
        auth: state.auth
    }),
    {}
)(Favorite);

