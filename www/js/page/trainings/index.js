import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';
import HeaderSimple from './../../components/header-simple';
import TopBigBanner from './../../components/top-big-banner';
import BreadCrumbs from './../../components/bread-crumbs';
import TrainingsCatalog from './../../components/trainings-catalog';
import Footer from './../../components/footer';
const topBanner = require('./../../../style/images/trainings/top-banner.png');

export default class Trainings extends Component {
    render() {
        const view = this;
        // const {props, state} = view;
        // const {app} = props;

        return <div>
            <HeaderSimple/>
            <TopBigBanner backgroundImage={topBanner}>
                <BreadCrumbs>
                    <Link to="/">Главная</Link>
                    <Link to="/trainings">Тренировки</Link>
                </BreadCrumbs>
                <h3 className="section__header">Тренировки</h3>
            </TopBigBanner>
            <TrainingsCatalog/>
            <Footer/>
        </div>;
    }
}
