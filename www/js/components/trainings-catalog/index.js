import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';
import Sort from './sort';
import Filter from './filter';
import Search from './search';
import List from './list';
import DateFilter from './date-filter';
import * as trainingsCatalogAction from './action';
// import TopBigBanner from './../components/top-big-banner';

// const topBanner = require('./../../style/images/clubs/top-banner.png');
const globalAppConst = require('./../../app-const.json');

class TrainingsCatalog extends Component {
    renderMobileFilter() {
        const view = this;
        const {props, state} = view;
        const {children, app, trainingsCatalog} = props;

        return trainingsCatalog.filterIsOpen ?
            [
                <div onClick={() => props.setFilterVisible(false)} key="fade" className="header-mobile-menu__fade"/>,
                <Filter key="filter"/>
            ] :
            null;
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {children, app, trainingsCatalog} = props;

        return <div className="clubs-catalog subscriptions-catalog trainings-catalog hug">
            <Sort/>
            {app.screen.width > globalAppConst.tabletWidth ?
                <div className="clubs-catalog__left-part">
                    <Filter/>
                </div> :
                view.renderMobileFilter()}
            <div className="clubs-catalog__right-part">
                {app.screen.width > globalAppConst.tabletWidth ?
                    <Search/> :
                    null}
                <DateFilter/>
                <List/>
            </div>
        </div>;
    }
}

export default connect(
    state => ({
        trainingsCatalog: state.trainingsCatalog,
        app: state.app
    }),
    {
        setFilterVisible: trainingsCatalogAction.setFilterVisible
    }
)(TrainingsCatalog);
