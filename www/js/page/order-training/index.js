import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import HeaderSimple from './../../components/header-simple';
import TopBigBanner from './../../components/top-big-banner';
import BreadCrumbs from './../../components/bread-crumbs';
import Footer from './../../components/footer';
import OrderTraining from './../../components/order-training';
import {metaTagMaster} from '../../module/meta-tag';

const topBanner = require('./../../../style/images/order/top-banner.jpg');

const defaultMetaData = {
    title: 'Стать партнером'
};

class OrderPage extends Component {
    componentDidMount() {
        metaTagMaster.updateByUrl('/make-order', defaultMetaData);
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {app} = props;
        const {auth, match} = props;

        return <div>
            <HeaderSimple/>
            <TopBigBanner backgroundImage={topBanner}>
                <BreadCrumbs>
                    <Link to="/">Главная</Link>
                    <Link to="/trainings">Тренировки</Link>
                    <Link to={match.url}>{defaultMetaData.title}</Link>
                </BreadCrumbs>
                <h1 className="section__header">{defaultMetaData.title}</h1>
            </TopBigBanner>

            <OrderTraining/>

            <Footer/>
        </div>;
    }
}

export default connect(
    state => ({
        app: state.app,
        auth: state.auth
    }),
    {}
)(OrderPage);

