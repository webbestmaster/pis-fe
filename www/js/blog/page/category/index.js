import React, {Component} from 'react';
import {metaTagMaster} from './../../../module/meta-tag';
import appMetaData from './../../../module/meta-tag/const';
import TopBanner from './../../components/top-banner';
import Footer from './../../components/footer';
import Header from './../../components/header';
import Category from './../../components/category';
import {routeToSectionName} from './../../components/bread-crumbs/helper';

const defaultMetaData = {
    ...appMetaData.default
};

export default class CategoryPage extends Component<{}> {
    updateMetaData() {
        const view = this;
        const {props, state} = view;
        const {categoryName} = props.match.params;

        defaultMetaData.title = routeToSectionName(categoryName);
        metaTagMaster.updateByUrl('/blog/category/' + categoryName, defaultMetaData);
    }

    componentDidUpdate(prevProps, prevState) {
        const view = this;
        const {props, state} = view;

        if (prevProps.match.params.categoryName !== props.match.params.categoryName) {
            view.updateMetaData();
        }
    }

    componentDidMount() {
        const view = this;

        view.updateMetaData();
    }

    render() {
        const view = this;

        return <div>
            <TopBanner/>
            <Header/>
            <Category/>
            <Footer/>
        </div>;
    }
}
