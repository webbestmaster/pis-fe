import React, {Component} from 'react';
import {metaTagMaster} from './../../../module/meta-tag';
import appMetaData from './../../../module/meta-tag/const';
import TopBanner from './../../components/top-banner';
import Footer from './../../components/footer';
import Header from './../../components/header';
import Article from '../../components/article';
import {fetchX} from './../../../helper/fetch-x';

const appConst = require('./../../../app-const');

const defaultMetaData = {
    ...appMetaData.default
};

export default class ArticlePage extends Component<{}> {
    updateMetaData() {
        const view = this;
        const {props, state} = view;
        const {articleId} = props.match.params;

        fetchX(appConst.pageDataUrl.host + appConst.pageDataUrl.blog.article
            .replace('{{articleId}}', articleId))
            .then(response => {
                defaultMetaData.title = response.data[0].title;
                metaTagMaster.updateByUrl('/blog/article/' + articleId, defaultMetaData);
            })
            .catch(() => null);
    }

    componentDidUpdate(prevProps, prevState) {
        const view = this;
        const {props, state} = view;

        if (prevProps.match.params.articleId !== props.match.params.articleId) {
            view.updateMetaData();
        }
    }

    componentDidMount() {
        const view = this;

        view.updateMetaData();
    }

    render() {
        const view = this;
        // const {props, state} = view;
        // debugger
        // const {app} = props;

        return <div>
            <TopBanner/>
            <Header/>
            <Article/>
            <Footer/>
        </div>;
    }
}
