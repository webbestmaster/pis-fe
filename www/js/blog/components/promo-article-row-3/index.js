// @flow

/* global window */
import React, {Component} from 'react';
import type {Node} from 'react';
import style from './style.m.scss';
import EyeCounter from './../eye-counter';
import sectionStyle from './../../style/css/sercion.m.scss';

export default class PromoArticleRow3 extends Component<{}> {
    render(): Node {
        return <div className={style.block}>

            <div className={sectionStyle.blog_section_content}>
                <h3 className={sectionStyle.blog_section_header}>События</h3>
            </div>

            <div className={style.block_hug}>
                <div className={style.article_holder}>

                    <div className={style.article_1} style={{backgroundImage: 'url(//via.placeholder.com/100x100)'}}>
                        <EyeCounter className={style.eye_counter} count={288} date={''}/>
                        <h3 className={style.article_header}>
                            Ireland’s top Fitness Enthusiasts’ health and fitness tips: Aaron Smyth NUTrition Ireland
                        </h3>
                        <p className={style.article_sub_header}>1 September 2017</p>
                    </div>

                    <div className={style.article_2} style={{backgroundImage: 'url(//via.placeholder.com/100x100)'}}>
                        <EyeCounter className={style.eye_counter} count={288} date={''}/>
                        <h3 className={style.article_header}>
                            Ireland’s top Fitness Enthusiasts’ health and fitness tips: Aaron Smyth NUTrition Ireland
                        </h3>
                        <p className={style.article_sub_header}>1 September 2017</p>
                    </div>

                    <div className={style.article_3} style={{backgroundImage: 'url(//via.placeholder.com/100x100)'}}>
                        <EyeCounter className={style.eye_counter} count={288} date={''}/>
                        <h3 className={style.article_header}>
                            Ireland’s top Fitness Enthusiasts’ health and fitness tips: Aaron Smyth NUTrition Ireland
                        </h3>
                        <p className={style.article_sub_header}>1 September 2017</p>
                    </div>

                </div>
            </div>
        </div>;
    }
}
