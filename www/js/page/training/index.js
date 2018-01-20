import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';
import HeaderSimple from './../../components/header-simple';
import TopBigBanner from './../../components/top-big-banner';
import BreadCrumbs from './../../components/bread-crumbs';
import SubscriptionsCatalog from './../../components/subscriptions-catalog';
import Footer from './../../components/footer';
import Training from './../../components/training';
import * as appAction from '../../components/app/action';

const isEqual = require('lodash/isEqual');
const appConst = require('./../../app-const.json');
const {fetchX} = require('./../../helper/fetch-x');
const topBanner = require('./../../../style/images/club/top-banner.png');

export default class TrainingPage extends Component {
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
                <h3 className="section__header section__header--training">Тренировки {fitnessClub.title}
                    <span className="section__header-heart"/></h3>
            </TopBigBanner>
            <Training {...{trainingId}}/>
            <Footer/>
        </div>;
    }
}
