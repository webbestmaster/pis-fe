/* global window, requestAnimationFrame, Event */
import React, {Component} from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import style from './style.m.scss';
import classnames from 'classnames';
import cnx from './../../helper/cnx';
import Lightbox from 'react-images';
import MapView from './../map';
import MapItemClub from './../map/map-item-club';
import {Link, withRouter} from 'react-router-dom';
import {reduceSeconds} from '../../helper/date';
import {resolveImagePath} from '../../helper/path-x';
import {connect} from 'react-redux';
import * as authAction from '../auth/action';
import TrainingCard from './training-card';
import SubscriptionCard from './subscription-card';

const find = require('lodash/find');
const appConst = require('./../../app-const.json');
const {fetchX} = require('./../../helper/fetch-x');
const Swiper = require('./../../lib/swiper');
const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

class Description extends Component {
    constructor() {
        super();

        const view = this;

        view.attr = {};

        view.state = {
            filials: [],
            pageData: null,
            lightboxGallery: {
                isOpen: false,
                imageIndex: 0
            }
        };
    }

    componentDidMount() {
        const view = this;
        const {props, state} = view;
        const {clubId} = props;

        Promise
            .all([
                fetchX(appConst.pageDataUrl.clubs),
                fetchX(appConst.pageDataUrl.club.replace('{{clubId}}', clubId))
            ])
            .then(([clubData, {data}]) => {
                view.setState({
                    filials: data.filials.map(() => ({isOpenMap: false})),
                    pageData: data,
                    additionalInfo: {
                        comfort: clubData.data.additionFilter.comfort
                    }
                }, () => view.initInteractive());
            })
            .catch(console.error);
    }

    initInteractive() {
        const view = this;
        const {refs} = view;
        const {swiperGallery, swiperSubscription, swiperTrainings} = refs;

        view.attr.swiperGallery = new Swiper(swiperGallery, {
            slidesPerView: 'auto',
            freeMode: true,
            grabCursor: true
            // translate: 300
        });

        // view.attr.swiperGallery.slideTo(0.5, 1000, () => {});

        view.attr.swiperGallery.translate = -300;

        // debugger

        view.attr.swiperSubscription = new Swiper(swiperSubscription, {
            slidesPerView: 'auto',
            freeMode: true
        });

        view.attr.swiperTrainings = new Swiper(swiperTrainings, {
            slidesPerView: 'auto',
            freeMode: true
        });

        // need to fix swiper
        requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
    }

    renderGallery() {
        const view = this;
        const {props, state} = view;
        const {pageData} = state;
        const {images} = pageData;

        if (!images || !images['600x400'] || images['600x400'].length === 0) {
            return null;
        }

        const imagesToShow = images['600x400'];

        return <div className={style.gallery_swiper_full_width_wrapper}>
            <div
                style={{maxWidth: imagesToShow.length * 320}}
                ref="swiperGallery" {...cnx('swiper-container', style.gallery_swiper_container)}>
                <div className="swiper-wrapper">
                    {imagesToShow.map((url, ii) => <div
                        onClick={() => view.setState(prevState => {
                            Object.assign(prevState.lightboxGallery, {
                                isOpen: true,
                                imageIndex: ii
                            });
                            return prevState;
                        })}
                        key={ii}
                        {...cnx('swiper-slide', style.gallery_swiper_slide)}
                        style={{backgroundImage: 'url(' + resolveImagePath(url) + ')'}}
                    />)}
                </div>
            </div>
            <Lightbox
                images={images['1200x800'].map(url => ({src: resolveImagePath(url)}))}
                isOpen={state.lightboxGallery.isOpen}
                currentImage={state.lightboxGallery.imageIndex}
                onClickPrev={() => view.setState(prevState => {
                    Object.assign(prevState.lightboxGallery, {
                        imageIndex: prevState.lightboxGallery.imageIndex - 1
                    });
                    return prevState;
                })}
                onClickNext={() => view.setState(prevState => {
                    Object.assign(prevState.lightboxGallery, {
                        imageIndex: prevState.lightboxGallery.imageIndex + 1
                    });
                    return prevState;
                })}
                imageCountSeparator={' / '}
                onClose={() => view.setState(prevState => {
                    Object.assign(prevState.lightboxGallery, {
                        isOpen: false
                    });
                    return prevState;
                })}
            />
        </div>;
    }

    renderFilials() {
        const view = this;
        const {props, state} = view;
        const {pageData, additionalInfo} = state;
        const filials = pageData.filials.sort((filA, filB) => filB.id - filA.id);

        const currentFilialId = pageData.row.id;

        const currentFilial = find(filials, {id: currentFilialId});
        const currentFilialIndex = filials.indexOf(currentFilial);

        return <div className="hug">
            <h3 className="section__header">Филиалы</h3>
            {/* {JSON.stringify(pageData)} */}
            <Tabs defaultIndex={currentFilialIndex} className={style.filial_info_wrapper}>
                <TabList className={style.filial_list + ' scroll-bar'}>
                    {filials.map((filial, ii) => <Tab key={ii} className={style.filial_list_item}>
                        <Link className="section__block-link" to={'/club/' + filial.id}>
                            <h3 className={style.filial_list_item_h}>Филиал {ii + 1}:</h3>
                            <p className={style.filial_list_item_p}>{filial.address}</p>
                        </Link>
                    </Tab>)}
                </TabList>

                {filials
                    .map((filial, ii) => <TabPanel key={ii} className={style.filial_details_wrapper + ' clear-self'}>
                        <div
                            onClick={() => view.setState(prevState => {
                                const filialData = prevState.filials[ii];

                                Object.assign(filialData, {isOpenMap: !filialData.isOpenMap});

                                return prevState;
                            })}

                            {...cnx('clubs-catalog-sort__button-colored', {
                                'clubs-catalog-sort__button-colored--active': state.filials[ii].isOpenMap
                            })}>
                            На карте
                            <span {...cnx('clubs-catalog-sort__button-colored-icon',
                                'clubs-catalog-sort__button-colored-icon--map-pin')}/>
                        </div>
                        <h4 className={style.filial_info_header}>{filial.title}</h4>
                        {state.filials[ii].isOpenMap ?
                            <div className={style.filial_details_map}>
                                <MapView
                                    defaultCenter={{
                                        lat: parseFloat(filial.location_lat),
                                        lng: parseFloat(filial.location_lng)
                                    }}
                                    defaultOptions={{
                                        fullscreenControl: false
                                    }}
                                    pointList={[<MapItemClub
                                        key={ii}
                                        lat={parseFloat(filial.location_lat)}
                                        lng={parseFloat(filial.location_lng)}
                                        data={filial}
                                    />]}
                                />
                            </div> :
                            [<div
                                key="title"
                                className={style.filial_info_image}
                                style={{backgroundImage: 'url(' + resolveImagePath(filial.image) + ')'}}/>,
                            <div
                                key="info"
                                className={style.filial_details_block_wrapper}>
                                <div className={style.filial_details_block}>
                                    <h3 className={style.filial_details_block_h}>Адрес:</h3>
                                    <p className={style.filial_details_block_p}>{filial.address}</p>
                                </div>
                                <div className={style.filial_details_block}>
                                    <h3 className={style.filial_details_block_h}>Время работы:</h3>
                                    <p className={style.filial_details_block_p}>
                                            Пн-Пт:&nbsp;
                                        {reduceSeconds(filial.work_from)}
                                        &nbsp;-&nbsp;
                                        {reduceSeconds(filial.work_to)}
                                        <br/>
                                            Сб-Вс:&nbsp;
                                        {reduceSeconds(filial.work_weekend_from)}
                                        &nbsp;-&nbsp;
                                        {reduceSeconds(filial.work_weekend_to)}
                                    </p>
                                </div>
                                <div className={style.filial_details_block__w100}>
                                    <h3 className={style.filial_details_block_h}>Удобства/услуги:</h3>
                                    <div className={style.filial_details_block_ul}>
                                        {Object
                                            .keys(additionalInfo.comfort.items)
                                            .map(key => <p
                                                key={key}
                                                {...cnx(style.filial_details_block_li, {
                                                    [style.filial_details_block_li__active]:
                                                            Boolean(filial.attributes.comfort & Number(key)) // eslint-disable-line no-bitwise
                                                })}>{additionalInfo.comfort.items[key]}</p>)}
                                    </div>
                                </div>
                            </div>]}
                    </TabPanel>)}
            </Tabs>
        </div>;
    }

    renderSubscriptions() {
        const view = this;
        const {props, state} = view;
        const {pageData} = state;
        const {subscriptions} = pageData;


        return <div className="hug sale hug--section">
            <h2 className="section__header section__header--plus-swiper">
                Абонементы
                <Link to={'/club/' + props.clubId + '/tab-index/2'} className="section__button">
                    Смотреть все абонементы
                </Link>
            </h2>

            <div className="sale-slider">
                <div ref="swiperSubscription"
                    className="swiper-container">
                    <div className="swiper-wrapper">
                        {subscriptions.filter((item, ii) => ii <= 3)
                            .map((subscription, ii) => <SubscriptionCard subscription={subscription} key={ii}/>)}
                    </div>
                    {/* <div className="swiper__arrow"/>*/}

                </div>
            </div>
        </div>;
    }

    renderTrainings() {
        const view = this;
        const {props, state} = view;
        const {pageData} = state;
        const {trainings} = pageData;

        return <div className="hug sale hug--section">
            <h2 className="section__header section__header--plus-swiper">
                Тренировки
                <Link to={'/club/' + props.clubId + '/tab-index/3'} className="section__button">
                    Смотреть все тренировки
                </Link>
            </h2>

            <div className="sale-slider">
                <div ref="swiperTrainings"
                    className="swiper-container swiper-container-horizontal swiper-container-free-mode">
                    <div className="swiper-wrapper">
                        {trainings.map((training, ii) => <TrainingCard training={training} key={ii}/>)}
                    </div>
                    {/* <div className="swiper__arrow"/>*/}
                </div>
            </div>
        </div>;
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {pageData} = state;

        if (pageData === null) {
            return null;
        }

        const {row} = pageData;

        return <div>
            <div className="hug">
                <h3 className="section__header">Описание клуба</h3>
                <div className="section__text-wrapper" dangerouslySetInnerHTML={{
                    __html: row.description // eslint-disable-line id-match
                }}/>
            </div>
            {view.renderGallery()}
            {view.renderFilials()}
            {view.renderSubscriptions()}
            {view.renderTrainings()}
        </div>;
    }
}

export default withRouter(connect(
    state => ({
        auth: state.auth
    }),
    {
        // closePopup: authAction.closePopup,
        // openPopupRegister: authAction.openPopupRegister,
        // openPopupRestore: authAction.openPopupRestore,
        // addToFavoriteClub: authAction.addToFavoriteClub,
        // addToFavoriteTraining: authAction.addToFavoriteTraining,
        // addToFavoriteSubscription: authAction.addToFavoriteSubscription
    }
)(Description));
