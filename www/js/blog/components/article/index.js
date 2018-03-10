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

const fishText = ['Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
'Asperiores earum minus porro sint vitae? A aliquid assumenda distinctio ea expedita fugiat, ' +
'iure laudantium, molestias nam, odit officia possimus quibusdam saepe.'];

fishText.push(...fishText);
fishText.push(...fishText);
fishText.push(...fishText);

type PropsType = {||};

type StateType = {||};

export default class Article extends Component<PropsType, StateType> {
    renderExtraArticleList(): Node {
        const view = this;

        return <div className={style.extra_article_list}>
            {'012'.split('').map((key: string): Node => <div key={key} className={style.extra_article}>
                <div className={style.extra_article_image} style={{backgroundImage: 'url(//picsum.photos/800/600)'}}/>
                <h4 className={style.extra_article_header}>
                    Ireland’s top Fitness Enthusiasts’ health and fitness tips: Aaron Smyth NUTrition Ireland
                </h4>
                <span className={style.extra_article_date}>
                    1 September 2017
                </span>
            </div>)}
        </div>;
    }

    render(): Node {
        const view = this;

        return [
            <BreadCrumbs key="bread-crumbs">
                <Link to="/">Главная</Link>
                <Link to="/">Фитнес</Link>
                <Link to="/">Новость 1</Link>
            </BreadCrumbs>,

            <section key="page" className={sectionStyle.blog_section + ' ' + sectionStyle.blog_section__article}>
                <div className={sectionStyle.blog_section_content}>
                    <h3 className={sectionStyle.blog_section_header + ' ' + sectionStyle.blog_section_header__article}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                    </h3>

                    <EyeCounter
                        className={style.eye_counter}
                        count={288}
                        date={'1 September 2017'}
                        dateClassName={articleCardStyle.eye_counter__date}/>

                    <div className="lt-desktop-width-reverse">
                        {view.renderExtraArticleList()}
                        <div className={style.article_padded_wrapper}>
                            <img className={style.title_image} src="//picsum.photos/800/600" alt=""/>
                            <div className={style.article_text_wrapper}>
                                <p>{fishText[0]}</p>
                                <p>{fishText[1]}</p>
                                <p>{fishText[2]}</p>
                                <p>{fishText}</p>
                            </div>
                            <div className={style.share}>
                                <p className={style.share_label}>Поделиться:</p>
                                {/* <p className={style.share_label}>Share:</p>*/}
                                <span className={style.share_button}/>
                                <span className={style.share_button}/>
                                <span className={style.share_button}/>
                                <span className={style.share_button}/>
                            </div>
                        </div>
                    </div>


                    {/* <h1>the text of article</h1> */}

                </div>
            </section>
        ];
    }
}
