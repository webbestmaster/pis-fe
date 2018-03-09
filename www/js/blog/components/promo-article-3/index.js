// @flow

/* global window */
import React, {Component} from 'react';
import type {Node} from 'react';
import style from './style.m.scss';
import EyeCounter from './../eye-counter';

export default class PromoArticle3 extends Component<{}> {
    render(): Node {
        return <div className={style.block}>
            <div className={style.block_hug}>
                <div className={style.article_holder} style={{width: '100%', maxWidth: '100%'}}>

                    <div className={style.article_1} style={{backgroundImage: 'url(//picsum.photos/800/600)'}}>
                        <EyeCounter className={style.eye_counter} count={288} date={'1 September 2017'}/>
                        <h3 className={style.article_header}>Describe your design process.</h3>
                        <h4 className={style.article_sub_header + ' ellipsis'}>Unlike others in the office services</h4>
                    </div>

                    <div className={style.article_2} style={{backgroundImage: 'url(//picsum.photos/800/600)'}}>
                        <EyeCounter className={style.eye_counter} count={288} date={'1 September 2017'}/>
                        <h3 className={style.article_header}>Describe your design process.</h3>
                        <h4 className={style.article_sub_header + ' ellipsis'}>Unlike others in the office services</h4>
                    </div>

                    <div className={style.article_3} style={{backgroundImage: 'url(//picsum.photos/800/600)'}}>
                        <EyeCounter className={style.eye_counter} count={288} date={'1 September 2017'}/>
                        <h3 className={style.article_header}>Describe your design process.</h3>
                        <h4 className={style.article_sub_header + ' ellipsis'}>Unlike others in the office services</h4>
                    </div>

                </div>
            </div>
        </div>;
    }
}
