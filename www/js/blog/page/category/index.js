// @flow
import React, {Component} from 'react';
import type {Node} from 'react';
import {metaTagMaster} from './../../../module/meta-tag';
import TopBanner from './../../components/top-banner';
import Footer from './../../components/footer';
import Header from './../../components/header';

/*
import Sale from './../../components/sale';
import PromoSteps from './../../components/promo-steps';
import OurPartners from './../../components/our-partners';
import PromoInstagram from './../../components/promo-instagram';
import Footer from './../../components/footer';
*/

export default class CategoryPage extends Component<{}> {
    componentDidMount() {
        metaTagMaster.updateByUrl('/blog/index');
    }

    render(): Node {
        const view = this;
        // const {props, state} = view;
        // debugger
        // const {app} = props;

        return <div>
            <TopBanner/>
            <Header/>
            <h1>category</h1>
            <Footer/>
        </div>;
    }
}