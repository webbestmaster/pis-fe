import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {metaTagMaster} from './../../module/meta-tag';

import Header from './../../components/header';
import Sale from './../../components/sale';
import PromoSteps from './../../components/promo-steps';
import OurPartners from './../../components/our-partners';
import PromoInstagram from './../../components/promo-instagram';
import Footer from './../../components/footer';

export default class Home extends Component {
    componentDidMount() {
        metaTagMaster.updateByUrl('/index');
    }

    render() {
        const view = this;
        // const {props, state} = view;
        // debugger
        // const {app} = props;

        return <div>
            <Header/>
            <Sale/>
            <PromoSteps/>
            <OurPartners/>
            <PromoInstagram/>
            <Footer/>
        </div>;
    }
}
