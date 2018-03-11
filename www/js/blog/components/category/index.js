// @flow
import React, {Component} from 'react';
import type {Node} from 'react';
import {Link, withRouter} from 'react-router-dom';

// const appConst = require('./../../../app-const');
// import * as authAction from "../../../components/auth/action";

import {connect} from 'react-redux';
// import type {AppType} from './../../../types/reducer';
import style from './style.m.scss';
import sectionStyle from './../../style/css/sercion.m.scss';
import articleCardStyle from './../../style/css/article-card.m.scss';
import EyeCounter from './../eye-counter';
import BreadCrumbs from './../bread-crumbs';
import {routeToSectionName} from './../bread-crumbs/helper';
import {fetchX} from '../../../helper/fetch-x';
import {resolveImagePath} from '../../../helper/path-x';
import {dateToHuman} from '../../../helper/date';

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

// type PropsType = {||};

// type StateType = {||};

class Category extends Component<{}, {}> {
    state = {
        pageData: null,
        rowsToShow: 10,
        increaseRowsToShow: 10
    };

    async componentDidMount(): Promise<void> {
        const view = this;

        await view.fetchList();
    }

    componentDidUpdate(prevProps, prevState) {
        const view = this;
        const {state, props} = view;

        if (prevProps.match.params.categoryName === props.match.params.categoryName) {
            return;
        }

        view.fetchList();
    }

    async fetchList(): Promise<void> {
        const view = this;
        const {state, props} = view;
        const {categoryName} = props.match.params;

        const response = await fetchX(appConst.pageDataUrl.host + appConst.pageDataUrl.blog
            .getByCategory.replace('{{categoryName}}', categoryName))
            .catch((): null => null);

        if (response === null) {
            return;
        }

        view.setState({pageData: response});
    }

    render(): Node {
        const view = this;
        const {state, props} = view;
        const {categoryName} = props.match.params;
        const humanCategoryName = routeToSectionName(categoryName);
        const {pageData, rowsToShow} = state;

        const rows = pageData === null ? [] : pageData.data[0];

        return [
            <BreadCrumbs key="bread-crumbs">
                <Link to="/">Главная</Link>
                <Link to={'/category/' + categoryName}>{humanCategoryName}</Link>
            </BreadCrumbs>,

            <section key="page" className={sectionStyle.blog_section}>
                <div className={sectionStyle.blog_section_content}>
                    <h3 className={sectionStyle.blog_section_header}>{humanCategoryName}</h3>

                    <div className={articleCardStyle.block_list + ' ' + articleCardStyle.block_list__separated}>
                        {rows
                            .filter((node: Node, nodeII: number): boolean => nodeII < rowsToShow)
                            .map((row: {}): Node => <Link
                                to={'/article/' + row.id}
                                key={row.id}
                                className={articleCardStyle.block}>
                                <div
                                    className={articleCardStyle.image}
                                    style={{backgroundImage: 'url(' + resolveImagePath(row.image) + ')'}}
                                />
                                <div className={articleCardStyle.text_block}>
                                    <h4 className={articleCardStyle.header + ' section_htdu'}>
                                        {row.title}
                                    </h4>
                                    <div className={articleCardStyle.eye_counter_wrapper}>
                                        <EyeCounter
                                            className={articleCardStyle.eye_counter}
                                            count={288}
                                            date={dateToHuman(row.created_at)}
                                            dateClassName={articleCardStyle.eye_counter__date}
                                        />
                                    </div>
                                    <p className={articleCardStyle.preview_text + ' section_htdu'}>
                                        {row.html}
                                    </p>
                                </div>
                            </Link>)}
                    </div>
                </div>
            </section>,
            <div key="show-more" className={style.show_more_wrapper}>
                {rowsToShow < rows.length ?
                    <div
                        onClick={() => view.setState({rowsToShow: rowsToShow + state.increaseRowsToShow})}
                        className={style.show_more_button}>
                        <span className={style.show_more_icon}/>
                        Показать ещё
                    </div> :
                    null}
            </div>
        ];
    }
}

export default withRouter(
    connect(
        state => ({}),
        {}
    )(Category)
);
