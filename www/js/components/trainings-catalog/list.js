import React, {Component} from 'react';
import {connect} from 'react-redux';
import ListItem from './list-item';
import MapView from './../map';
import MapItemTraining from './../map/map-item-training';

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
        const searchUrl = appConst.searchUrl.trainings;
        const params = [];
        const {trainingsCatalog} = props;

        const selected = get(trainingsCatalog, 'filter.selected', null);
        const additionFilter = get(trainingsCatalog, 'filter.additionFilter', null);
        const categoryFilter = get(trainingsCatalog, 'filter.categoryFilter', null);
        // const error = get(trainingsCatalog, 'filter.error', null);
        const search = get(trainingsCatalog, 'search', null);

        // get search by title (top search input)
        const searchTitle = search && search.query && search.query.trim();

        if (searchTitle && searchTitle.length >= 3) {
            params.push('where[title]=' + searchTitle);
        }

        if (trainingsCatalog.dateFilter) {
            params.push('where[day]=' + Math.pow(2, new Date(trainingsCatalog.dateFilter).getDay() || 7));
        }

        // get work, underground
        if (selected) {
            if (selected.cost.from) {
                params.push('where[price][from]=' + selected.cost.from);
            }

            if (selected.cost.to) {
                params.push('where[price][to]=' + selected.cost.to);
            }

            if (selected.underground && selected.underground.length) {
                selected.underground.forEach(station => params.push('where[underground][]=' + station));
                params.push('where[distance][from]=0');
                params.push('where[distance][to]=5');
            }
        }

        if (trainingsCatalog.filter && trainingsCatalog.filter.selectedTrainingPeriod.value !== 'all') {
            params.push('where[time][from]=' + trainingsCatalog.filter.selectedTrainingPeriod.from);
            params.push('where[time][to]=' + trainingsCatalog.filter.selectedTrainingPeriod.to);
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

    sortRowsCallback(rowA, rowB) { // eslint-disable-line complexity
        const view = this;
        const {props} = view;
        const {trainingsCatalog} = props;
        const {sort} = trainingsCatalog;
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
                pointList={itemDataList.map((item, ii) => <MapItemTraining
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
        const {trainingsCatalog, app} = props;

        if (rows === null) {
            return <div className="section__spinner"/>;
        }

        if (rows.length === 0) {
            return <p className="section__no-search-result">По вашему запросу нет результатов.</p>;
        }

        if (trainingsCatalog.mode === 'list' || app.screen.width <= globalAppConst.tabletWidth) {
            return view.renderList();
        }

        if (trainingsCatalog.mode === 'map') {
            return view.renderMap();
        }

        return <h1>Выберите карту или список.</h1>;
    }
}

export default connect(
    state => ({
        trainingsCatalog: state.trainingsCatalog,
        app: state.app
    }),
    {}
)(List);

