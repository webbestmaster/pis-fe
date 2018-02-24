import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import HeaderSimple from './../../components/header-simple';
import TopBigBanner from './../../components/top-big-banner';
import BreadCrumbs from './../../components/bread-crumbs';
import SubscriptionsCatalog from './../../components/subscriptions-catalog';
import Footer from './../../components/footer';
import {metaTagMaster} from '../../module/meta-tag';
const topBanner = require('./../../../style/images/subscriptions/top-banner.png');

export default class Subscriptions extends Component {
    componentDidMount() {
        metaTagMaster.updateByUrl('/subscriptions');
    }

    render() {
        const view = this;
        // const {props, state} = view;
        // const {app} = props;

        return <div>
            <HeaderSimple/>
            <TopBigBanner backgroundImage={topBanner}>
                <BreadCrumbs>
                    <Link to="/">Главная</Link>
                    <Link to="/subscriptions">Абонементы</Link>
                </BreadCrumbs>
                <h3 className="section__header">Абонементы</h3>
            </TopBigBanner>
            <SubscriptionsCatalog/>
            <Footer/>
        </div>;
    }
}
