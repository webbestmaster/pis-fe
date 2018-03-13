// @flow
import React, {Component} from 'react';
import type {Node} from 'react';
import style from './style.m.scss';
import {fetchX} from './../../../helper/fetch-x';
import {resolveImagePath} from '../../../helper/path-x';
import {resolveUrlToHttp} from '../../../components/our-partners';

const find = require('lodash/find');
const appConst = require('./../../../app-const');
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
    ads: {
        data: Array<{}>
    }
|};

export default class TopBanner extends Component<{}, StateType> {
    state = {
        ads: {
            data: [[]]
        }
    };

    async componentDidMount(): Promise<void> {
        const view = this;

        // const bannerData = await fetchX('/api/get-blog-top-banner-data').catch((): null => null);

        // console.log(bannerData);
        const ads = await fetchX(appConst.pageDataUrl.host + appConst.pageDataUrl.blog.ads
            .replace('{{category}}', 'index'))
            .catch((): null => null);

        view.setState({ads});
    }

    render(): Node {
        const view = this;
        const {props, state} = view;
        const {ads} = state;

        if (ads === null) {
            return null;
        }

        const adsItem = find(ads.data[0], {size: '1920x90'}) || null;

        if (adsItem === null) {
            return null;
        }

        return <a
            href={resolveUrlToHttp(adsItem.external_link)}
            target="_blank"
            style={{backgroundImage: 'url(' + resolveImagePath(adsItem.image) + ')'}}
            className={style.block}/>;
    }
}
