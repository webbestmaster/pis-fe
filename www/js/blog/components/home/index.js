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
import {fetchX} from '../../../helper/fetch-x';
import {resolveImagePath} from '../../../helper/path-x';
import {dateToHuman} from '../../../helper/date';
import {Link} from 'react-router-dom';
import {resolveUrlToHttp} from './../../../components/our-partners';

const find = require('lodash/find');
const findLast = require('lodash/findLast');
const appConst = require('./../../../app-const');
// import {Link} from 'react-router-dom';

type StateType = {
    pageData: mixed,
    ads: {
        data: Array<{}>
    }
};

export default class Home extends Component<{}, StateType> {
    state = {
        pageData: null,
        ads: {
            data: [[]]
        }
    };

    async componentDidMount(): Promise<void> {
        const view = this;

        const response = await fetchX(appConst.pageDataUrl.host + appConst.pageDataUrl.blog.home)
            .catch((): null => null);

        if (response !== null) {
            view.setState({pageData: response});
        }

        const ads = await fetchX(appConst.pageDataUrl.host + appConst.pageDataUrl.blog.ads
            .replace('{{category}}', 'index'))
            .catch((): null => null);

        if (response !== null) {
            view.setState({ads});
        }
    }

    renderList(articleList: Array<{}>, data: {}, ads?: {}): Node {
        const view = this;
        const {state} = view;
        const [
            article1,
            article2 = articleList[0],
            article3 = articleList[0]
        ] = articleList;

        return <section className={sectionStyle.blog_section}>
            <div className={sectionStyle.blog_section_content}>
                {data.header}
                {/* <h3 className={sectionStyle.blog_section_header}>{data.header}</h3>*/}

                <div className="lt-tablet-width-reverse">
                    {ads ?
                        <a
                            href={resolveUrlToHttp(ads.external_link)}
                            target="_blank"
                            style={{backgroundImage: 'url(' + resolveImagePath(ads.image) + ')'}}
                            className={adsStyle.block__type_1}/> :
                        null}

                    <div className={articleCardStyle.block_list + ' ' + articleCardStyle.block_list__ads_padded}>

                        {[article1, article2, article3]
                            .map((article: {}): Node => <Link
                                to={'/article/' + article.category + '/' + article.id}
                                key={article.id}
                                className={articleCardStyle.block}>
                                <div
                                    className={articleCardStyle.image}
                                    style={{backgroundImage: 'url(' + resolveImagePath(article.image) + ')'}}
                                />
                                <div className={articleCardStyle.text_block}>
                                    <h4 className={articleCardStyle.header + ' section_htdu'}>
                                        {article.title}
                                    </h4>
                                    <div className={articleCardStyle.eye_counter_wrapper}>
                                        <EyeCounter
                                            className={articleCardStyle.eye_counter}
                                            count={article.views}
                                            date={dateToHuman(article.created_at)}
                                            dateClassName={articleCardStyle.eye_counter__date}
                                        />
                                    </div>
                                    <p className={articleCardStyle.preview_text + ' section_htdu'}>
                                        {article.html}
                                    </p>
                                </div>
                            </Link>)}

                    </div>

                </div>

            </div>
        </section>;
    }

    renderRow(articleList: Array<{}>, data: {}): Node {
        const view = this;
        const {state} = view;
        const [
            article1,
            article2 = articleList[0],
            article3 = articleList[0],
            article4 = articleList[0],
            article5 = articleList[0],
            article6 = articleList[0]
        ] = articleList;

        return <section className={sectionStyle.blog_section}>
            <div className={sectionStyle.blog_section_content}>
                {data.header}

                <div className={articleCardStyle.block_list + ' ' + articleCardStyle.block_list__3_in_row}>

                    {[article1, article2, article3, article4, article5, article6]
                        .map((article: {}): Node => <Link
                            to={'/article/' + article.category + '/' + article.id}
                            key={article.id}
                            className={articleCardStyle.block}>
                            <div
                                className={articleCardStyle.image}
                                style={{backgroundImage: 'url(' + resolveImagePath(article.image) + ')'}}
                            />
                            <div className={articleCardStyle.text_block}>
                                <h4 className={articleCardStyle.header + ' section_htdu'}>
                                    {article.title}
                                </h4>
                                <div className={articleCardStyle.eye_counter_wrapper}>
                                    <EyeCounter
                                        className={articleCardStyle.eye_counter}
                                        count={article.views}
                                        date={dateToHuman(article.created_at)}
                                        dateClassName={articleCardStyle.eye_counter__date}
                                    />
                                </div>
                                <p className={articleCardStyle.preview_text + ' section_htdu'}>
                                    {article.html}
                                </p>
                            </div>
                        </Link>)}
                </div>
            </div>
        </section>;
    }

    render(): Node {
        const view = this;
        const {state} = view;
        const {pageData, ads} = state;

        if (pageData === null) {
            return null;
        }

        return <div>
            <PromoArticle3 list={pageData.data.promoRows}/>

            {view.renderList(
                pageData.data.indexRows.fitness,
                {
                    header: <h2 className={sectionStyle.blog_section_header}>
                        <Link className={sectionStyle.blog_section_header_link} to="/category/fitness">
                            Фитнес
                        </Link>
                    </h2>
                },
                find(ads.data[0], {size: '300x600'})
            )}

            <PromoArticleText3
                header={<h2 className={sectionStyle.blog_section_header}>
                    <Link className={sectionStyle.blog_section_header_link} to="/category/food">Питание</Link>
                </h2>}
                list={pageData.data.indexRows.food}/>

            {view.renderList(
                pageData.data.indexRows.motivation,
                {
                    header: <h2 className={sectionStyle.blog_section_header}>
                        <Link className={sectionStyle.blog_section_header_link} to="/category/motivation">
                            Мотивация
                        </Link>
                    </h2>
                },
                findLast(ads.data[0], {size: '300x600'})
            )}

            <PromoArticleRow3
                header={<h2 className={sectionStyle.blog_section_header}>
                    <Link className={sectionStyle.blog_section_header_link} to="/category/event">События</Link>
                </h2>}
                list={pageData.data.indexRows.event}/>

            {view.renderRow(pageData.data.indexRows.knowledge, {
                header: <h2 className={sectionStyle.blog_section_header}>
                    <Link className={sectionStyle.blog_section_header_link} to="/category/knowledge">
                        Знания
                    </Link>
                </h2>
            })}

        </div>;
    }
}
