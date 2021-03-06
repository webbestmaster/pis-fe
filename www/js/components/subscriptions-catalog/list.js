import React, {Component} from 'react';
import {connect} from 'react-redux';
import ListItem from './list-item';
import MapView from './../map';
import MapItemSubscription from './../map/map-item-subscription';

const globalAppConst = require('./../../app-const');
const get = require('lodash/get');
const {fetchX} = require('./../../helper/fetch-x');
const appConst = require('./../../app-const');

class List extends Component {
    constructor() {
        super();

        const view = this;

        view.attr = {
            lastLink: null
        };

        view.state = {
            rowsToShow: 10,
            rows: null
        };
    }

    getSearchLink() { // eslint-disable-line complexity, max-statements
        const view = this;
        const {props, state} = view;
        const searchUrl = appConst.searchUrl.subscriptions;
        const params = [];
        const {subscriptionsCatalog} = props;

        const selected = get(subscriptionsCatalog, 'filter.selected', null);
        const additionFilter = get(subscriptionsCatalog, 'filter.additionFilter', null);
        const categoryFilter = get(subscriptionsCatalog, 'filter.categoryFilter', null);
        // const error = get(subscriptionsCatalog, 'filter.error', null);
        const search = get(subscriptionsCatalog, 'search', null);

        // get search by title (top search input)
        const searchTitle = search && search.query && search.query.trim();

        if (searchTitle && searchTitle.length >= 3) {
            params.push('where[title]=' + searchTitle);
        }

        // get work, underground
        if (selected) {
            if (selected.work.from) {
                params.push('where[work][from]=' + selected.work.from);
            }

            if (selected.work.to) {
                params.push('where[work][to]=' + selected.work.to);
            }

            if (selected.cost.from) {
                params.push('where[price][from]=' + selected.cost.from);
            }

            if (selected.cost.to) {
                params.push('where[price][to]=' + selected.cost.to);
            }

            if (selected.underground && selected.underground.length) {
                selected.underground.forEach(station => params.push('where[underground][]=' + station));
                params.push('where[distance][from]=0');
                params.push('where[distance][to]=1');
            }
        }

        if (subscriptionsCatalog.filter && subscriptionsCatalog.filter.selectedSubscriptionPeriod.value !== 0) {
            params.push('where[period_type]=' + 3); // const PERIOD_MONTHS = 3;
            params.push('where[period_amount]=' + subscriptionsCatalog.filter.selectedSubscriptionPeriod.value);
        }

        // get by category filter and addition filter
        const categoryData = Object.assign({}, categoryFilter, additionFilter);

        Object.keys(categoryData).forEach(categoryName => {
            const selectedList = categoryData[categoryName].selected;

            if (selectedList && selectedList.length) {
                params.push('where[' + categoryName + ']=' +
                    selectedList.reduce((prevItem, curItem) => prevItem + parseInt(curItem, 10), 0));
            }
        });

        return searchUrl + params.join('&');
    }

    fetchList() {
        const view = this;

        fetchX(view.getSearchLink()).then(({data}) => view.setState({rows: data.rows})).catch(console.error);
    }

    componentDidUpdate(prevProps, prevState) {
        const view = this;
        const searchLink = view.getSearchLink();

        if (view.attr.lastLink === searchLink) {
            return;
        }

        view.attr.lastLink = searchLink;
        view.fetchList();
    }

    componentDidMount() {
        const view = this;

        view.fetchList();
    }

    sortRowsCallback(rowA, rowB) { // eslint-disable-line complexity
        const view = this;
        const {props} = view;
        const {subscriptionsCatalog} = props;
        const {sort} = subscriptionsCatalog;
        const sortQ = sort[sort.activeProperty] === 'asc' ? 1 : -1;

        switch (sort.activeProperty) {
            case 'name':
                return rowA.title > rowB.title ? sortQ : -sortQ;
            case 'rating':
                return (rowB.fitnessClub.rating - rowA.fitnessClub.rating) * sortQ;
            case 'price':
                return (rowB.price - rowA.price) * sortQ;
            default:
                console.error('WAT? You should use rating or name or price!');
        }

        return 1;
    }

    renderMap() {
        const view = this;
        const {state} = view;
        const {rows} = state;

        let lat = 0;
        let lng = 0;

        const itemDataList = rows
            .sort((rowA, rowB) => view.sortRowsCallback(rowA, rowB));

        itemDataList.forEach(item => {
            lat += parseFloat(item.fitnessClub.location_lat); // eslint-disable-line id-match, camelcase
            lng += parseFloat(item.fitnessClub.location_lng); // eslint-disable-line id-match, camelcase
        });

        lat /= itemDataList.length;
        lng /= itemDataList.length;

        return <div className="clubs-catalog-map">
            <MapView defaultCenter={{lat, lng}}
                defaultOptions={{
                    fullscreenControl: false
                }}
                pointList={itemDataList.map((item, ii) => <MapItemSubscription
                    key={ii}
                    lat={parseFloat(item.fitnessClub.location_lat)}
                    lng={parseFloat(item.fitnessClub.location_lng)}
                    data={item}
                />)}
            />
        </div>;
    }

    renderList() {
        const view = this;
        const {props, state} = view;
        const {subscriptionsCatalog} = props;
        const {isSpecPriceAtFirst} = subscriptionsCatalog.filter;
        const {rows, rowsToShow} = state;
        const rowsWithSpecPrice = [];
        const rowsWithOutSpecPrice = [];

        rows.forEach(row => isSpecPriceAtFirst && row.promotion && parseFloat(row.promotion.discount) ?
            rowsWithSpecPrice.push(row) :
            rowsWithOutSpecPrice.push(row)
        );

        const itemDataList = [].concat(
            rowsWithSpecPrice.sort((rowA, rowB) => view.sortRowsCallback(rowA, rowB)),
            rowsWithOutSpecPrice.sort((rowA, rowB) => view.sortRowsCallback(rowA, rowB))
        );

        return <div className="clubs-catalog-list">
            {itemDataList
                .filter((data, ii) => ii < rowsToShow)
                .map((data, ii) => <ListItem key={ii} data={data}/>)}

            {rows.length <= rowsToShow ?
                null :
                <div onClick={() => view.setState({rowsToShow: rowsToShow + 10})}
                    className="clubs-catalog-list__load-more">Загрузить</div>}
        </div>;
    }

    render() { // eslint-disable-line complexity
        const view = this;
        const {props, state} = view;
        const {rows} = state;
        const {subscriptionsCatalog, app} = props;

        if (rows === null) {
            return <div className="section__spinner"/>;
        }

        if (rows.length === 0) {
            return <p className="section__no-search-result">По вашему запросу нет результатов.</p>;
        }

        if (subscriptionsCatalog.mode === 'list' || app.screen.width <= globalAppConst.tabletWidth) {
            return view.renderList();
        }

        if (subscriptionsCatalog.mode === 'map') {
            return view.renderMap();
        }

        return <h1>Выберите карту или список.</h1>;
    }
}

export default connect(
    state => ({
        subscriptionsCatalog: state.subscriptionsCatalog,
        app: state.app
    }),
    {}
)(List);
