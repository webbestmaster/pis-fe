import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import HeaderSimple from './../../components/header-simple';
import TopBigBanner from './../../components/top-big-banner';
import BreadCrumbs from './../../components/bread-crumbs';
import Footer from './../../components/footer';
import {metaTagMaster} from '../../module/meta-tag';
import YourProposal from '../../components/your-proposal';

const topBanner = require('./../../../style/images/order/top-banner.png');

class YourProposalPage extends Component {
    componentDidMount() {
        metaTagMaster.updateByUrl('/your-proposal');
    }

    render() {
        const view = this;
        const {props, state} = view;

        return <div>
            <HeaderSimple/>
            <TopBigBanner backgroundImage={topBanner}>
                <BreadCrumbs>
                    <Link to="/">Главная</Link>
                    <Link to="/your-proposal">Ваши предложения</Link>
                    {/* <Link to="/trainings">Мой заказ</Link>*/}
                </BreadCrumbs>
                <h3 className="section__header">Ваши предложения</h3>
            </TopBigBanner>

            <YourProposal/>

            <Footer/>
        </div>;
    }
}

export default connect(
    state => ({}),
    {}
)(YourProposalPage);

