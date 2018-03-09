// @flow
import React, {Component} from 'react';
import type {Node} from 'react';
import style from './style.m.scss';
import {fetchX} from './../../../helper/fetch-x';
import {Link} from 'react-router-dom';
// import {metaTagMaster} from './../../../module/meta-tag';

/*
import Header from './../../components/header';
import Sale from './../../components/sale';
import PromoSteps from './../../components/promo-steps';
import OurPartners from './../../components/our-partners';
import PromoInstagram from './../../components/promo-instagram';
import Footer from './../../components/footer';
*/

type StateType = {|
    url: string
|};

export default class TopBanner extends Component<{}, StateType> {
    state = {
        url: ''
    };

    async componentDidMount(): Promise<void> {
        const view = this;

        const bannerData = await fetchX('/api/get-blog-top-banner-data').catch((): null => null);

        console.log(bannerData);

        view.setState({url: '//picsum.photos/800/600'});
    }

    render(): Node {
        const view = this;
        const {props, state} = view;

        return <Link
            to={'/'}
            target="_blank"
            className={style.block}
            style={{backgroundImage: 'url(' + state.url + ')'}}
        />;
    }
}
