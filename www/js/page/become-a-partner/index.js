import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import HeaderSimple from './../../components/header-simple';
import TopBigBanner from './../../components/top-big-banner';
import BreadCrumbs from './../../components/bread-crumbs';
import Footer from './../../components/footer';
import {metaTagMaster} from '../../module/meta-tag';
import BecomeAPartner from './../../components/become-a-partner';

const topBanner = require('./../../../style/images/become-a-partner/top-banner.jpg');

class BecomeAPartnerPage extends Component {
    componentDidMount() {
        metaTagMaster.updateByUrl('/become-a-partner');
    }

    render() {
        const view = this;
        const {props, state} = view;

        return <div>
            <HeaderSimple/>
            <TopBigBanner backgroundImage={topBanner}>
                <BreadCrumbs>
                    <Link to="/">Главная</Link>
                    <Link to="/become-a-partner">Стать партнером</Link>
                    {/* <Link to="/trainings">Мой заказ</Link>*/}
                </BreadCrumbs>
                <h1 className="section__header">Стать партнером</h1>
            </TopBigBanner>

            <BecomeAPartner/>

            <Footer/>
        </div>;
    }
}

export default connect(
    state => ({}),
    {}
)(BecomeAPartnerPage);

