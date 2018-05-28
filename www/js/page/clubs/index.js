import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import HeaderSimple from './../../components/header-simple';
import TopBigBanner from './../../components/top-big-banner';
import BreadCrumbs from './../../components/bread-crumbs';
import ClubsCatalog from './../../components/clubs-catalog';
import Footer from './../../components/footer';
import {metaTagMaster} from '../../module/meta-tag';
const topBanner = require('./../../../style/images/clubs/top-banner.jpg');

export default class Clubs extends Component {
    componentDidMount() {
        metaTagMaster.updateByUrl('/clubs');
    }

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
                <h1 className="section__header">Фитнес-клубы Минска</h1>
            </TopBigBanner>
            <ClubsCatalog/>
            <Footer/>
        </div>;
    }
}
