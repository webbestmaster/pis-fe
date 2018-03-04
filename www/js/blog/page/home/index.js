// @flow
import React, {Component} from 'react';
import {metaTagMaster} from './../../../module/meta-tag';
import Header from './../../components/header';
import TopBanner from './../../components/top-banner';

/*
import Sale from './../../components/sale';
import PromoSteps from './../../components/promo-steps';
import OurPartners from './../../components/our-partners';
import PromoInstagram from './../../components/promo-instagram';
import Footer from './../../components/footer';
*/

export default class Home extends Component<{}> {
    componentDidMount() {
        metaTagMaster.updateByUrl('/blog/index');
    }

    render() {
        const view = this;
        // const {props, state} = view;
        // debugger
        // const {app} = props;

        return <div>
            <TopBanner/>
            <Header/>
            <h1>home</h1>
        </div>;
    }
}
