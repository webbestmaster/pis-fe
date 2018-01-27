import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';
import HeaderSimple from './../../components/header-simple';
import TopBigBanner from './../../components/top-big-banner';
import BreadCrumbs from './../../components/bread-crumbs';
import SubscriptionsCatalog from './../../components/subscriptions-catalog';
import Footer from './../../components/footer';
import Training from './../../components/training';
import * as appAction from '../../components/app/action';
import * as authAction from '../../components/auth/action';
const find = require('lodash/find');

const isEqual = require('lodash/isEqual');
const appConst = require('./../../app-const.json');
const {fetchX} = require('./../../helper/fetch-x');
const topBanner = require('./../../../style/images/club/top-banner.png');

class TrainingPage extends Component {
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
        const view = this;
        const {props, state} = view;
        const {trainingId} = props.match.params;

        appAction.scrollToTop();

        return fetchX(appConst.pageDataUrl.training.replace('{{trainingId}}', trainingId))
            .then(({data}) => view.setState({pageData: data})).catch(console.error);
    }

    addToFavorite(trainingId) {
        const view = this;
        const {props, state} = view;

        props.addToFavoriteTraining(trainingId);
    }

    removeFromFavorite(trainingId) {
        const view = this;
        const {props, state} = view;
        const {auth} = props;
        const {favorites = []} = auth.login.data;
        const favoriteItem = find(favorites, {type: 'training', item_id: trainingId});// eslint-disable-line camelcase, id-match

        if (!favoriteItem) {
            console.warn('CAN NOT find favorite training with trainingId:', trainingId);
            return;
        }

        props.removeFromFavorite(favoriteItem.id);
    }

    isFavorite(trainingId) {
        const view = this;
        const {props, state} = view;
        const {auth} = props;
        const {favorites = []} = auth.login.data;

        return Boolean(find(favorites, {type: 'training', item_id: trainingId})); // eslint-disable-line camelcase, id-match
    }

    renderFavoriteMark() { // eslint-disable-line complexity
        const view = this;
        const {props, state} = view;
        const {auth} = props;

        const trainingId = state.pageData.row.id;

        if (!auth.login.isLogin) {
            return <div
                onClick={evt => {
                    evt.stopPropagation();
                    evt.preventDefault();
                    props.openPopupLogin();
                }}
                className="section__header-heart"/>;
        }

        if (view.isFavorite(trainingId)) {
            return <div
                onClick={evt => {
                    evt.stopPropagation();
                    evt.preventDefault();
                    view.removeFromFavorite(trainingId);
                }}
                className="section__header-heart section__header-heart--marked"/>;
        }

        return <div
            onClick={evt => {
                evt.stopPropagation();
                evt.preventDefault();
                view.addToFavorite(trainingId);
            }}
            className="section__header-heart"/>;
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {trainingId} = props.match.params;
        const {pageData} = state;

        if (pageData === null) {
            return null;
        }

        const {fitnessClub} = pageData.row;

        return <div>
            {/* <div className="json">{JSON.stringify(pageData)}</div> */}
            <HeaderSimple/>
            <TopBigBanner backgroundImage={topBanner}>
                <BreadCrumbs>
                    <Link to="/">Главная</Link>
                    <Link to="/trainings">Тренировки</Link>
                    <Link to={'/club/' + fitnessClub.id}>{fitnessClub.title}</Link>
                </BreadCrumbs>
                <h3 className="section__header section__header--training">
                    Тренировки {fitnessClub.title}
                    {view.renderFavoriteMark()}
                </h3>
            </TopBigBanner>
            <Training {...{trainingId}}/>
            <Footer/>
        </div>;
    }
}

export default connect(
    state => ({
        auth: state.auth
    }),
    {
        // closePopup: authAction.closePopup,
        openPopupLogin: authAction.openPopupLogin,
        // openPopupRestore: authAction.openPopupRestore,
        // addToFavoriteClub: authAction.addToFavoriteClub,
        removeFromFavorite: authAction.removeFromFavorite,
        addToFavoriteTraining: authAction.addToFavoriteTraining,
        addToFavoriteSubscription: authAction.addToFavoriteSubscription
    }
)(TrainingPage);
