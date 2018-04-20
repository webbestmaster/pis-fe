// @flow
/* global requestAnimationFrame, location, window, VK */
import React, {Component} from 'react';
import type {Node} from 'react';
import {Link, withRouter} from 'react-router-dom';
import style from './style.m.scss';
import sectionStyle from './../../style/css/sercion.m.scss';
import articleCardStyle from './../../style/css/article-card.m.scss';
import EyeCounter from './../eye-counter';
import BreadCrumbs from './../bread-crumbs';
import {connect} from 'react-redux';
import {routeToSectionName} from '../bread-crumbs/helper';
import {fetchX} from '../../../helper/fetch-x';
import {dateToHuman} from '../../../helper/date';
import {resolveImagePath} from '../../../helper/path-x';
import {FacebookShareButton, VKShareButton, OKShareButton} from 'react-share';
import {FacebookIcon, VKIcon, OKIcon} from 'react-share';
import * as appAction from '../../../components/app/action';

const vkButton = require('./i/social/vk.svg.raw');

const appConst = require('./../../../app-const');

type PropsType = {
    match: {
        params: {
            articleId: string,
            categoryName: string
        }
    }
};

type StateType = {
    pageData: null | {
        data: {}
    },
    indexResponse: null | {
        data: {
            indexRows: {
                [key: string]: Array<{
                    id: string,
                    image: string,
                    title: string,
                    created_at: string
                }>
            }
        }
    }
};

class Article extends Component<PropsType, StateType> {
    state = {
        pageData: null,
        indexResponse: null,
        isVkLoad: false
    };

    async componentDidMount(): Promise<void> {
        const view = this;

        (function wait() {
            if (window.VK) {
                view.setState({isVkLoad: true});
                return;
            }
            window.setTimeout(wait, 100);
        })();

        return view.fetchArticle().then(() => {
            appAction.scrollToTop();
        });
    }

    async fetchArticle(): Promise<void> {
        const view = this;
        const {state, props} = view;
        const {articleId} = props.match.params;

        const response = await fetchX(appConst.pageDataUrl.host + appConst.pageDataUrl.blog.article
            .replace('{{articleId}}', articleId))
            .catch((): null => null);

        if (response !== null) {
            view.setState({pageData: response});
        }

        const indexResponse = await fetchX(appConst.pageDataUrl.host + appConst.pageDataUrl.blog.home)
            .catch((): null => null);

        if (indexResponse !== null) {
            view.setState({indexResponse});
        }
    }

    renderShare(): Node {
        const view = this;
        const {props, state} = view;
        const url = location.href;

        const {pageData, isVkLoad} = state;

        if (pageData === null || isVkLoad === false) {
            return null;
        }

        const data = pageData.data[0];

        return <div className={style.share}>

            {/*
            <p className={style.share_label}>Share:</p>
            <span className={style.share_button}/>
            <span className={style.share_button}/>
            <span className={style.share_button}/>
            <span className={style.share_button}/>
            */}

            <p className={style.share_label}>Поделиться:</p>

            <FacebookShareButton
                title={data.title}
                image={appConst.pageDataUrl.host + data.image}
                url={url}
                className={style.share_button}>
                <FacebookIcon size={52} round={true}/>
            </FacebookShareButton>

            <div
                className={style.share_button}
                dangerouslySetInnerHTML={{
                    __html: VK.Share.button( // eslint-disable-line id-match
                        {
                            url,
                            title: data.title,
                            image: appConst.pageDataUrl.host + data.image,
                            noparse: false
                        },
                        {
                            type: 'custom',
                            text: vkButton
                        })
                }}/>

            {/*
            <VKShareButton
                title={data.title}
                image={appConst.pageDataUrl.host + data.image}
                url={url}
                className={style.share_button}>
                <VKIcon size={52} round={true}/>
            </VKShareButton>
            */}

            <OKShareButton
                title={data.title}
                image={appConst.pageDataUrl.host + data.image}
                url={url}
                className={style.share_button}>
                <OKIcon size={52} round={true}/>
            </OKShareButton>

        </div>;
    }

    renderExtraArticleList(): Node {
        const view = this;
        const {state, props} = view;
        const {indexResponse} = state;

        if (indexResponse === null) {
            return null;
        }

        const {categoryName} = props.match.params;
        const allIndexArticleList = indexResponse.data.indexRows[categoryName];
        const [article1, article2 = allIndexArticleList[0], article3 = allIndexArticleList[0]] = allIndexArticleList;

        return <div className={style.extra_article_list}>
            {[article1, article2, article3].map((article: {
                id: string,
                image: string,
                title: string,
                created_at: string
            }): Node => <Link
                to={'/article/' + categoryName + '/' + article.id}
                key={article.id}
                onClick={() => {
                    requestAnimationFrame(() => {
                        view.componentDidMount();
                    });
                }}
                className={style.extra_article}>
                <div
                    className={style.extra_article_image}
                    style={{backgroundImage: 'url(' + resolveImagePath(article.image) + ')'}}/>
                <h4 className={style.extra_article_header + ' section_htdu'}>{article.title}</h4>
                <span className={style.extra_article_date}>{dateToHuman(article.created_at)}</span>
            </Link>)}
        </div>;
    }

    render(): Node {
        const view = this;
        const {state, props} = view;
        const {categoryName, articleId} = props.match.params;
        const humanCategoryName = routeToSectionName(categoryName);
        const {pageData} = state;

        if (pageData === null) {
            return null;
        }

        const article = pageData.data[0];

        return [
            <BreadCrumbs key="bread-crumbs">
                <Link to="/">Главная</Link>
                <Link to={'/category/' + categoryName}>{humanCategoryName}</Link>
                {/* <Link to={'/article/' + categoryName + '/' + articleId}>*/}
                {/* {article.title}*/}
                {/* </Link>*/}
            </BreadCrumbs>,

            <section key="page" className={sectionStyle.blog_section + ' ' + sectionStyle.blog_section__article}>
                <div className={sectionStyle.blog_section_content}>
                    <h2 className={sectionStyle.blog_section_header + ' ' + sectionStyle.blog_section_header__article}>
                        {article.title}
                    </h2>

                    <EyeCounter
                        className={style.eye_counter}
                        count={article.views}
                        date={dateToHuman(article.created_at)}
                        dateClassName={articleCardStyle.eye_counter__date}/>

                    <div className="lt-desktop-width-reverse">
                        {view.renderExtraArticleList()}
                        <div className={style.article_padded_wrapper}>
                            <img className={style.title_image} src={resolveImagePath(article.image)} alt=""/>
                            <div
                                className={style.article_text_wrapper}
                                dangerouslySetInnerHTML={{
                                    __html: article.html // eslint-disable-line id-match
                                }}
                            />
                            {/* {article.html}*/}
                            {view.renderShare()}
                        </div>
                    </div>
                </div>
            </section>
        ];
    }
}

export default withRouter(
    connect(
        (): {} => ({}),
        {}
    )(Article)
);
