// @flow

/* global window */
import React, {Component} from 'react';
import type {Node} from 'react';
import style from './style.m.scss';
import EyeCounter from './../eye-counter';
import sectionStyle from './../../style/css/sercion.m.scss';
import {resolveImagePath} from '../../../helper/path-x';
import {dateToHuman} from '../../../helper/date';
import {Link} from 'react-router-dom';

export default class PromoArticleText3 extends Component<{}> {
    render(): Node {
        const view = this;
        const {props} = view;
        const {list, header} = props;
        const [article1, article2 = list[0], article3 = list[0]] = list;

        return <div className={style.block}>

            <div className={sectionStyle.blog_section_content}>
                {header}
            </div>

            <div className={style.block_hug}>
                <div className={style.article_holder}>

                    <Link
                        to={'/article/' + article1.category + '/' + article1.id}
                        className={style.article_1}
                        style={{backgroundImage: 'url(' + resolveImagePath(article1.image) + ')'}}>
                        <EyeCounter
                            className={style.eye_counter}
                            count={article1.views}
                            date={dateToHuman(article1.created_at)}/>
                        <h3 className={style.article_header}>
                            {article1.title}
                        </h3>
                    </Link>

                    <Link
                        to={'/article/' + article1.category + '/' + article1.id}
                        className={style.text + ' section_htdu'}>
                        {article1.html}
                    </Link>

                    <Link
                        to={'/article/' + article2.category + '/' + article2.id}
                        className={style.article_2}
                        style={{backgroundImage: 'url(' + resolveImagePath(article2.image) + ')'}}>
                        <EyeCounter
                            className={style.eye_counter}
                            count={article2.views}
                            date={dateToHuman(article2.created_at)}/>
                        <h3 className={style.article_header + ' ellipsis'}>
                            {article2.title}
                        </h3>
                        <h4 className={style.article_sub_header + ' ellipsis'}>
                            {article2.html}
                        </h4>
                    </Link>

                    <Link
                        to={'/article/' + article3.category + '/' + article3.id}
                        className={style.article_3}
                        style={{backgroundImage: 'url(' + resolveImagePath(article3.image) + ')'}}>
                        <EyeCounter
                            className={style.eye_counter}
                            count={article3.views}
                            date={dateToHuman(article3.created_at)}/>
                        <h3 className={style.article_header + ' ellipsis'}>
                            {article3.title}
                        </h3>
                        <h4 className={style.article_sub_header + ' ellipsis'}>
                            {article3.html}
                        </h4>
                    </Link>
                </div>
            </div>
        </div>;
    }
}
