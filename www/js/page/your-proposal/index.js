import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import HeaderSimple from './../../components/header-simple';
import TopBigBanner from './../../components/top-big-banner';
import BreadCrumbs from './../../components/bread-crumbs';
import Footer from './../../components/footer';
import {metaTagMaster} from '../../module/meta-tag';
import YourProposal from '../../components/your-proposal';

const topBanner = require('./../../../style/images/your-proposal/top-banner.jpg');

const defaultMetaData = {
    title: 'Ваши предложения'
};

class YourProposalPage extends Component {
    componentDidMount() {
        metaTagMaster.updateByUrl('/your-proposal', defaultMetaData);
    }

    render() {
        const view = this;
        const {props, state} = view;

        return <div>
            <HeaderSimple/>
            <TopBigBanner backgroundImage={topBanner}>
                <BreadCrumbs>
                    <Link to="/">Главная</Link>
                    <Link to="/your-proposal">{defaultMetaData.title}</Link>
                </BreadCrumbs>
                <h1 className="section__header">{defaultMetaData.title}</h1>
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

