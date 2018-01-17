import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';
import HeaderSimple from './../../components/header-simple';
import TopBigBanner from './../../components/top-big-banner';
import BreadCrumbs from './../../components/bread-crumbs';
import ClubsCatalog from './../../components/clubs-catalog';
import Footer from './../../components/footer';
const topBanner = require('./../../../style/images/clubs/top-banner.png');

export default class Clubs extends Component {
    render() {
        const view = this;
        // const {props, state} = view;
        // const {app} = props;

        // const {props, state} = view;

        return <div>
            <HeaderSimple/>
            <TopBigBanner backgroundImage={topBanner}>
                <BreadCrumbs>
                    <Link to="/">Главная</Link>
                    <Link to="/clubs">Клубы</Link>
                </BreadCrumbs>
                <h3 className="section__header">Клубы</h3>
            </TopBigBanner>
            <ClubsCatalog/>
            <Footer/>
        </div>;
    }
}
