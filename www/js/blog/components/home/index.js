// @flow

/* global window */
import React, {Component} from 'react';
import type {Node} from 'react';
import PromoArticle3 from './../promo-article-3';
import PromoArticleText3 from './../promo-article-text-3';
import PromoArticleRow3 from './../promo-article-row-3';
import sectionStyle from './../../style/css/sercion.m.scss';
import articleCardStyle from './../../style/css/article-card.m.scss';
import adsStyle from './../../style/css/ads.m.scss';
import EyeCounter from './../eye-counter';
// import {Link} from 'react-router-dom';

export default class Home extends Component<{}> {
    render(): Node {
        return <div>

            <PromoArticle3/>

            <section className={sectionStyle.blog_section}>
                <div className={sectionStyle.blog_section_content}>
                    <h3 className={sectionStyle.blog_section_header}>Фитнес</h3>

                    <div className="lt-tablet-width-reverse">
                        <div className={adsStyle.block__type_1}/>

                        <div className={articleCardStyle.block_list + ' ' + articleCardStyle.block_list__ads_padded}>

                            {'012'
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
                                            Lorem Ipsum has been the industry's standard dummy text ever since the
                                            1500s,
                                            when an unknown printer took a galley of type and scrambled it to make a
                                            type specimen book.
                                        </p>
                                    </div>
                                </div>)}

                        </div>

                    </div>

                </div>
            </section>


            <PromoArticleText3/>


            <section className={sectionStyle.blog_section}>
                <div className={sectionStyle.blog_section_content}>
                    <h3 className={sectionStyle.blog_section_header}>Мотивация</h3>
                    <div className="lt-tablet-width-reverse">

                        <div className={adsStyle.block__type_1}/>

                        <div className={articleCardStyle.block_list + ' ' + articleCardStyle.block_list__ads_padded}>

                            {'012'
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
                                            Lorem Ipsum has been the industry's standard dummy text ever since the
                                            1500s,
                                            when an unknown printer took a galley of type and scrambled it to make a
                                            type specimen book.
                                        </p>
                                    </div>
                                </div>)}

                        </div>
                    </div>

                </div>
            </section>


            <PromoArticleRow3/>


            <section className={sectionStyle.blog_section}>
                <div className={sectionStyle.blog_section_content}>
                    <h3 className={sectionStyle.blog_section_header}>Знания</h3>

                    <div className={articleCardStyle.block_list + ' ' + articleCardStyle.block_list__3_in_row}>

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
            </section>

        </div>;
    }
}
