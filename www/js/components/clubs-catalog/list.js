import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';
// import * as clubsCatalogAction from './action';
import ListItem from './list-item';
import MapView from './../map';
import MapItemClub from './../map/map-item-club';

const globalAppConst = require('./../../app-const.json');
const get = require('lodash/get');
const {fetchX} = require('./../../helper/fetch-x');
// const {createArray} = require('./../../helper/create');
const appConst = require('./../../app-const.json');
// import HeaderSimple from './../components/header-simple';
// import TopBigBanner from './../components/top-big-banner';

// const topBanner = require('./../../style/images/clubs/top-banner.png');

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
        const searchUrl = appConst.searchUrl.club + '?';
        const params = [];
        const {clubsCatalog} = props;

        const selected = get(clubsCatalog, 'filter.selected', null);
        const additionFilter = get(clubsCatalog, 'filter.additionFilter', null);
        const categoryFilter = get(clubsCatalog, 'filter.categoryFilter', null);
        // const error = get(clubsCatalog, 'filter.error', null);
        const search = get(clubsCatalog, 'search', null);

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

            if (selected.underground && selected.underground.length) {
                selected.underground.forEach(station => params.push('where[underground][]=' + station));
                params.push('where[distance][from]=0');
                params.push('where[distance][to]=5');
            }
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

        fetchX(view.getSearchLink()).then(({data}) => view.setState({rows: data.rows}));
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

    sortRowsCallback(rowA, rowB) {
        const view = this;
        const {props} = view;
        const {clubsCatalog} = props;
        const {sort} = clubsCatalog;
        const sortQ = sort[sort.activeProperty] === 'asc' ? 1 : -1;

        switch (sort.activeProperty) {
            case 'name':
                return rowA.title > rowB.title ? sortQ : -sortQ;
            case 'rating':
                return (rowB.rating - rowA.rating) * sortQ;
            default:
                console.error('WAT? You should use rating or name!');
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

        itemDataList.forEach(({location_lat, location_lng}) => { // eslint-disable-line id-match, camelcase
            lat += parseFloat(location_lat); // eslint-disable-line id-match, camelcase
            lng += parseFloat(location_lng); // eslint-disable-line id-match, camelcase
        });

        lat /= itemDataList.length;
        lng /= itemDataList.length;

        return <div className="clubs-catalog-map">
            <MapView defaultCenter={{lat, lng}}
                defaultOptions={{
                    fullscreenControl: false
                }}
                pointList={itemDataList.map((item, ii) => <MapItemClub
                    key={ii}
                    lat={parseFloat(item.location_lat)}
                    lng={parseFloat(item.location_lng)}
                    data={item}
                />)}
            />
        </div>;
    }

    renderList() {
        const view = this;
        const {state} = view;
        const {rows, rowsToShow} = state;

        const itemDataList = rows
            .sort((rowA, rowB) => view.sortRowsCallback(rowA, rowB));

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
        const {clubsCatalog, app} = props;

        if (rows === null) {
            return <div className="section__spinner"/>;
        }

        if (rows.length === 0) {
            return <p className="section__no-search-result">По вашему запросу нет результатов.</p>;
        }

        if (clubsCatalog.mode === 'list' || app.screen.width <= globalAppConst.tabletWidth) {
            return view.renderList();
        }

        if (clubsCatalog.mode === 'map') {
            return view.renderMap();
        }

        return <h1>Выберите карту или список.</h1>;
    }
}

export default connect(
    state => ({
        clubsCatalog: state.clubsCatalog,
        app: state.app
    }),
    {}
)(List);
