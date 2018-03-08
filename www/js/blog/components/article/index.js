// @flow
import React, {Component} from 'react';
import type {Node} from 'react';
import {Link} from 'react-router-dom';

// const appConst = require('./../../../app-const');
// import * as authAction from "../../../components/auth/action";

// import {connect} from 'react-redux';
// import type {AppType} from './../../../types/reducer';
import style from './style.m.scss';
import sectionStyle from './../../style/css/sercion.m.scss';
import articleCardStyle from './../../style/css/article-card.m.scss';
import EyeCounter from './../eye-counter';
import BreadCrumbs from './../bread-crumbs';

// import {metaTagMaster} from './../../../module/meta-tag';

/*
import Header from './../../components/header';
import Sale from './../../components/sale';
import PromoSteps from './../../components/promo-steps';
import OurPartners from './../../components/our-partners';
import PromoInstagram from './../../components/promo-instagram';
import Footer from './../../components/footer';
*/

type PropsType = {||};

type StateType = {||};

export default class Article extends Component<PropsType, StateType> {
    render(): Node {
        const view = this;

        return [
            <BreadCrumbs key="bread-crumbs">
                <Link to="/">Главная</Link>
                <Link to="/">Фитнес</Link>
                <Link to="/">Новость 1</Link>
            </BreadCrumbs>,

            <section key="page" className={sectionStyle.blog_section}>
                <div className={sectionStyle.blog_section_content}>
                    <h3 className={sectionStyle.blog_section_header}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                    </h3>

                    <h1>the text of article</h1>

                </div>
            </section>
        ];
    }
}
