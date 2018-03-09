// @flow

/* global window */
import React, {Component} from 'react';
import type {Node} from 'react';
import style from './style.m.scss';
import EyeCounter from './../eye-counter';
import sectionStyle from './../../style/css/sercion.m.scss';

export default class PromoArticleText3 extends Component<{}> {
    render(): Node {
        return <div className={style.block}>

            <div className={sectionStyle.blog_section_content}>
                <h3 className={sectionStyle.blog_section_header}>Питание</h3>
            </div>

            <div className={style.block_hug}>
                <div className={style.article_holder}>

                    <div className={style.article_1} style={{backgroundImage: 'url(//picsum.photos/800/600)'}}>
                        <EyeCounter className={style.eye_counter} count={288} date={'1 September 2017'}/>
                        <h3 className={style.article_header}>
                            Ireland’s top Fitness Enthusiasts’ health and fitness tips: Aaron Smyth NUTrition Ireland
                        </h3>
                    </div>

                    <p className={style.text}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>

                    <div className={style.article_2} style={{backgroundImage: 'url(//picsum.photos/800/600)'}}>
                        <EyeCounter className={style.eye_counter} count={288} date={'1 September 2017'}/>
                        <h3 className={style.article_header + ' ellipsis'}>Describe your design process.</h3>
                        <h4 className={style.article_sub_header + ' ellipsis'}>Unlike others in the office services</h4>
                    </div>

                    <div className={style.article_3} style={{backgroundImage: 'url(//picsum.photos/800/600)'}}>
                        <EyeCounter className={style.eye_counter} count={288} date={'1 September 2017'}/>
                        <h3 className={style.article_header + ' ellipsis'}>Describe your design process.</h3>
                        <h4 className={style.article_sub_header + ' ellipsis'}>Unlike others in the office services</h4>
                    </div>


                </div>
            </div>

        </div>;
    }
}
