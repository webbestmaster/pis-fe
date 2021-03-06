import React, {Component} from 'react';
import {connect} from 'react-redux';
import Sort from './sort';
import Filter from './filter';
import Search from './search';
import List from './list';
import * as subscriptionsCatalogAction from './action';

const globalAppConst = require('./../../app-const');

class SubscriptionsCatalog extends Component {
    renderMobileFilter() {
        const view = this;
        const {props, state} = view;
        const {children, app, subscriptionsCatalog} = props;

        return subscriptionsCatalog.filterIsOpen ?
            [
                <div onClick={() => props.setFilterVisible(false)} key="fade" className="header-mobile-menu__fade"/>,
                <Filter key="filter"/>
            ] :
            null;
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {children, app, subscriptionsCatalog} = props;

        return <div className="clubs-catalog subscriptions-catalog hug">
            <Filter isHidden={true}/>
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
                <List/>
            </div>
        </div>;
    }
}

export default connect(
    state => ({
        subscriptionsCatalog: state.subscriptionsCatalog,
        app: state.app
    }),
    {
        setFilterVisible: subscriptionsCatalogAction.setFilterVisible
    }
)(SubscriptionsCatalog);
