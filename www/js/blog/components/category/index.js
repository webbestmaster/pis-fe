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

export default class Category extends Component<PropsType, StateType> {
    render(): Node {
        const view = this;

        return [
            <BreadCrumbs key="bread-crumbs">
                <Link to="/">Главная</Link>
                <Link to="/">Фитнес</Link>
            </BreadCrumbs>,

            <section key="page" className={sectionStyle.blog_section}>
                <div className={sectionStyle.blog_section_content}>
                    <h3 className={sectionStyle.blog_section_header}>Фитнес</h3>

                    <div className={articleCardStyle.block_list + ' ' + articleCardStyle.block_list__separated}>

                        {'012345'
                            .split('')
                            .map((key: string): Node => <div key={key} className={articleCardStyle.block}>
                                <div
                                    className={articleCardStyle.image}
                                    style={{backgroundImage: 'url(//picsum.photos/800/600)'}}
                                />
                                <div className={articleCardStyle.text_block}>
                                    <h4 className={articleCardStyle.header}>
                                        Ireland’s top Fitness Enthusiasts’ health and fitness tips:
                                        Aaron Smyth NUTrition Ireland
                                    </h4>
                                    <div className={articleCardStyle.eye_counter_wrapper}>
                                        <EyeCounter
                                            className={articleCardStyle.eye_counter}
                                            count={288}
                                            date={'1 September 2017'}
                                            dateClassName={articleCardStyle.eye_counter__date}
                                        />
                                    </div>
                                    <p className={articleCardStyle.preview_text}>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                        when an unknown printer took a galley of type and scrambled it to make a
                                        type specimen book.
                                    </p>
                                </div>
                            </div>)}

                    </div>
                </div>
            </section>,
            <div key="show-more" className={style.show_more_wrapper}>
                <div className={style.show_more_button}>
                    <span className={style.show_more_icon}/>
                    Показать ещё
                </div>
            </div>
        ];
    }
}
