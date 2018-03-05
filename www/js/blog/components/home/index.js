// @flow

/* global window */
import React, {Component} from 'react';
import type {Node} from 'react';
import PromoArticle3 from './../promo-article-3';
// import {Link} from 'react-router-dom';

export default class Home extends Component<{}> {
    render(): Node {
        return [
            <PromoArticle3 key="promo-article-3"/>
        ];
    }
}
