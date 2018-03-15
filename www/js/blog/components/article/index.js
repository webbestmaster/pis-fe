// @flow
/* global requestAnimationFrame, location */
import React, {Component} from 'react';
import type {Node} from 'react';
import {Link, withRouter} from 'react-router-dom';

// const appConst = require('./../../../app-const');
// import * as authAction from "../../../components/auth/action";

// import {connect} from 'react-redux';
// import type {AppType} from './../../../types/reducer';
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
import * as appAction from '../../../components/app/action';

import {
    FacebookShareButton,
    GooglePlusShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    PinterestShareButton,
    VKShareButton,
    OKShareButton,
    RedditShareButton,
    TumblrShareButton,
    LivejournalShareButton,
    EmailShareButton
} from 'react-share';

const appConst = require('./../../../app-const');

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

type PropsType = {};

type StateType = {};

class Article extends Component<PropsType, StateType> {
    state = {
        pageData: null,
        indexResponse: null
    };

    async componentDidMount(): Promise<void> {
        const view = this;

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
        const url = location.href;

        return <div className={style.share}>
            <p className={style.share_label}>Поделиться:</p>
            {/* <p className={style.share_label}>Share:</p>*/}
            <span className={style.share_button}/>
            <span className={style.share_button}/>
            <span className={style.share_button}/>
            <span className={style.share_button}/>

            {/*
            <FacebookShareButton url={url}>
                <br/>
                <br/>
                <br/>
                fb
                <br/>
                <br/>
                <br/>
                <br/>
            </FacebookShareButton>
*/}

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
            {[article1, article2, article3].map((article: {}): Node => <Link
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
                        count={288}
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
