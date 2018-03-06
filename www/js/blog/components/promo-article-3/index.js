// @flow

/* global window */
import React, {Component} from 'react';
import type {Node} from 'react';
import style from './style.m.scss';

export default class PromoArticle3 extends Component<{}> {
    render(): Node {
        return <div className={style.block}>
            <div className={style.block_hug}>
                <div className={style.article_holder}>
                    <div className={style.article_1}>1</div>
                    <div className={style.article_2}>2</div>
                    <div className={style.article_3}>3</div>
                </div>
            </div>
        </div>;
    }
}
