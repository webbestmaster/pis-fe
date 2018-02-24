import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import HeaderSimple from './../../components/header-simple';
import TopBigBanner from './../../components/top-big-banner';
import BreadCrumbs from './../../components/bread-crumbs';
import Footer from './../../components/footer';
import Rating from './../../components/util/rating';
import {plural} from './../../helper/plural';
import Club from './../../components/club';
import * as appAction from './../../components/app/action';
import {metaTagMaster} from '../../module/meta-tag';

const isEqual = require('lodash/isEqual');
const appConst = require('./../../app-const');
const {fetchX} = require('./../../helper/fetch-x');
const topBanner = require('./../../../style/images/club/top-banner.png');

export default class ClubPage extends Component {
    constructor() {
        super();

        const view = this;

        view.state = {
            pageData: null
        };
    }

    componentDidUpdate(prevProps) {
        const view = this;
        const {props, state} = view;

        if (!prevProps.match) {
            return;
        }

        if (isEqual(props.match.params, prevProps.match.params)) {
            return;
        }

        view.componentDidMount().then(() => view.setState({pageData: null}, () => view.componentDidMount()));
    }

    componentDidMount() {
        metaTagMaster.updateByUrl('/club');

        const view = this;
        const {props, state} = view;
        const {clubId} = props.match.params;

        appAction.scrollToTop();

        return fetchX(appConst.pageDataUrl.host + appConst.pageDataUrl.club.replace('{{clubId}}', clubId))
            .then(({data}) => view.setState({pageData: data})).catch(console.error);
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {clubId} = props.match.params;
        const {pageData} = state;

        if (pageData === null) {
            return null;
        }

        const {row} = pageData;

        console.log('/club/' + row.id);

        return <div>
            <HeaderSimple/>
            <TopBigBanner backgroundImage={topBanner}>
                <BreadCrumbs>
                    <Link to="/">Главная</Link>
                    <Link to="/clubs">Клубы</Link>
                    <Link to={'/club/' + row.id}>{row.title}</Link>
                </BreadCrumbs>
                <h3 className="section__header section__header--club">{row.title}</h3>
                <div className="club-header-rating">
                    <Rating
                        rating={row.rating}
                        className="club-header-rating__stars"
                        star="club-header-rating__star"
                        activeStar="club-header-rating__star-active"/>
                    <div className="club-header-reviews">{plural(row.feedbacksCount, 'отзыв')}</div>
                </div>
                <div className="club-header__services">
                    <div className="club-header__service club-header__service--subscriptions">
                        Абонементы: {row.subscriptionsCount}&nbsp;шт.
                    </div>
                    <div className="club-header__service club-header__service--trainings">
                        Тренировки: {row.trainingsCount}&nbsp;шт.
                    </div>
                </div>
            </TopBigBanner>
            <Club {...{clubId}}/>
            <Footer/>
        </div>;
    }
}
