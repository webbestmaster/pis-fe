import React, {Component} from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';
import * as trainingsCatalogAction from './action';

const {fetchX} = require('./../../helper/fetch-x');
const appConst = require('./../../app-const');
const globalAppConst = require('./../../app-const');
const find = require('lodash/find');

import Search from './search';
import {store} from '../../index';

const trainingPeriodOptionList = [
    {value: 'all', from: '07:00', to: '24:00', text: 'Выберите время'},
    {value: 'morning', from: '07:00', to: '11:00', text: 'Утро'},
    {value: 'afternoon', from: '11:00', to: '18:00', text: 'День'},
    {value: 'evening', from: '18:00', to: '24:00', text: 'Вечер'}
];

class Filter extends Component {
    constructor() {
        super();

        const view = this;

        view.initialize();
    }

    getDefaultState() {
        return {
            pageData: null,
            selected: {
                underground: [],
                work: {
                    from: null,
                    to: null
                },
                cost: {
                    from: null,
                    to: null
                }
            },
            additionFilter: {
                isOpen: false,
                comfort: {
                    selected: []
                }
            },
            categoryFilter: {},
            selectedTrainingPeriod: {
                ...trainingPeriodOptionList[0]
            },
            error: {
                workTime: false,
                costRange: false
            }
        };
    }

    componentDidUpdate() {
        const view = this;

        const {state, props} = view;

        props.setFilter(state);
    }

    initialize() {
        const view = this;
        const {filter} = store ? store.getState().trainingsCatalog : {};

        view.state = Object.assign({}, view.getDefaultState(), filter || {});

        fetchX(appConst.pageDataUrl.host + appConst.pageDataUrl.trainings).then(pageData => {
            const categoryFilter = {};

            Object.keys(pageData.data.categoryFilter)
                .forEach(key => Object.assign(categoryFilter,
                    {
                        [key]: {
                            isOpen: false,
                            selected: []
                        }
                    }));

            if (filter && filter.categoryFilter) {
                Object.assign(categoryFilter, filter.categoryFilter);
            }

            view.setState({
                pageData,
                categoryFilter
            });
        });
    }

    onChangeUndergroundSelect() {
        const view = this;
        const {props, state, refs} = view;
        const {value} = refs.selectedUnderground;

        view.setState(prevState => {
            const {underground} = prevState.selected;

            if (underground.indexOf(value) === -1) {
                underground.push(value);
            }
            return prevState;
        });
    }

    onChangeTrainingPeriodSelect() {
        const view = this;
        const {refs} = view;
        const {selectedIndex} = refs.selectedTrainingPeriod;
        const selectedOption = refs.selectedTrainingPeriod.options[selectedIndex];
        const {value} = selectedOption;
        const item = find(trainingPeriodOptionList, {value});

        view.setState(prevState => {
            Object.assign(prevState.selectedTrainingPeriod, item);
            return prevState;
        });
    }

    render() { // eslint-disable-line complexity
        const view = this;
        const {props, state} = view;
        const {pageData, selected} = state;
        const {app} = props;

        if (pageData === null) {
            return null;
        }

        const {mainFilter, additionFilter, categoryFilter} = pageData.data;

        return <div className="clubs-catalog-filter">

            {app.screen.width > globalAppConst.tabletWidth ?
                null :
                [
                    <h3 key="header" className="clubs-catalog-filter__mobile-header">Фильтры</h3>,
                    <div key="close-filter"
                        onClick={() => props.setFilterVisible(false)}
                        className="clubs-catalog-filter__mobile-close-filter"/>,
                    <Search key="search"/>
                ]}

            <div className="clubs-catalog-filter__short-form">
                <h3 className="clubs-catalog-filter__header">Станция метро</h3>
                <label className="clubs-catalog-filter__select">
                    <p className="clubs-catalog-filter__select-placeholder">Ближайшее метро</p>
                    <span className="clubs-catalog-filter__input-plus"/>
                    <select
                        ref="selectedUnderground"
                        onChange={() => view.onChangeUndergroundSelect()}
                        className="clubs-catalog-filter__select-node">
                        {selected.underground.length === 0 ?
                            <option key="no-selected-metro" value="0">
                                Выберите станцию метро
                            </option> :
                            null}
                        {Object.keys(mainFilter.underground)
                            .map(key => <option
                                key={key} value={key}>
                                {key}: {mainFilter.underground[key]}
                            </option>)}
                    </select>
                </label>

                {selected.underground.length > 0 ?
                    <div className="clubs-catalog-filter__selected-item-list">
                        {selected.underground.map(key => <div key={key} className="clubs-catalog-filter__selected-item">
                            <span
                                onClick={() => view.setState(prevState => {
                                    view.refs.selectedUnderground.value = null;

                                    prevState.selected.underground
                                        .splice(prevState.selected.underground.indexOf(key), 1);

                                    return prevState;
                                })}
                                className="clubs-catalog-filter__remove-selected-item"/>
                            {mainFilter.underground[key]}
                        </div>)}
                    </div> :
                    null
                }

                <h3 className="clubs-catalog-filter__header">Часы действия</h3>
                <label className="clubs-catalog-filter__select">
                    <p className="clubs-catalog-filter__select-placeholder">{state.selectedTrainingPeriod.text}</p>
                    <span className="clubs-catalog-filter__input-drop-down"/>
                    <select
                        ref="selectedTrainingPeriod"
                        defaultValue={state.selectedTrainingPeriod.value}
                        onChange={() => view.onChangeTrainingPeriodSelect()}
                        className="clubs-catalog-filter__select-node">
                        {trainingPeriodOptionList
                            .map(({value, text}) => <option key={value} value={value}>{text}</option>)}
                    </select>
                </label>

                <h3 className="clubs-catalog-filter__header">Цена</h3>
                <div className={classnames('clubs-catalog-filter__double-input-wrapper', {
                    'error-input': state.error.costRange
                })}>
                    {[{name: 'from', defaultValue: 'от', refName: 'costRangeFrom'},
                        {name: 'to', defaultValue: 'до', refName: 'costRangeTo'}]
                        .map(({name, defaultValue, refName}) => <div
                            key={name}
                            className="clubs-catalog-filter__double-input-input-wrapper">
                            <input
                                defaultValue={state.selected.cost[name]}
                                onChange={() => view.setState(prevState => {
                                    prevState.selected.cost[name] = parseInt(view.refs[refName].value, 10); // eslint-disable-line no-param-reassign

                                    const {from, to} = prevState.selected.cost;

                                    if (from !== null && to !== null) {
                                        prevState.error.costRange = parseInt(from, 10) >= parseInt(to, 10); // eslint-disable-line no-param-reassign
                                    }

                                    return prevState;
                                })}
                                ref={refName}
                                className="section__input"
                                min="0"
                                placeholder={defaultValue}
                                type="number"/>
                        </div>)}
                </div>
            </div>

            <div className="clubs-catalog-filter__additional-parameters-form clear-full">
                <div className="ta-center">
                    <h3 onClick={() => view.setState(prevState => {
                        prevState.additionFilter.isOpen = !prevState.additionFilter.isOpen; // eslint-disable-line no-param-reassign
                        return prevState;
                    })} className="clubs-catalog-filter__open-additional-parameters">Дополнительные параметры</h3>
                </div>
                {state.additionFilter.isOpen ?
                    <div className="clubs-catalog-filter__additional-parameters clear-full">
                        {Object.keys(additionFilter.comfort.items).map(key => <div
                            key={key}
                            className="clubs-catalog-filter__additional-item">
                            <label className="section__checkbox">
                                <input
                                    defaultChecked={state.additionFilter.comfort.selected.indexOf(key) !== -1}
                                    ref={'additionFilter.comfort' + key}
                                    onChange={() => view.setState(prevState => {
                                        const isChecked = view.refs['additionFilter.comfort' + key].checked;
                                        const currentCheckedList = prevState.additionFilter.comfort.selected;

                                        if (isChecked) {
                                            currentCheckedList.push(key);
                                        } else {
                                            currentCheckedList.splice(currentCheckedList.indexOf(key), 1);
                                        }

                                        return prevState;
                                    })}
                                    className="section__checkbox-node" type="checkbox"/>
                                <span className="section__checkbox-state"/>
                                {additionFilter.comfort.items[key]}
                            </label>
                        </div>)}
                    </div> :
                    null}
            </div>

            <div className="clubs-catalog-filter__main-parameters-form">
                <h3 className="clubs-catalog-filter__header">Основные категории</h3>

                {Object.keys(categoryFilter).map(key => [
                    <h3
                        onClick={() => view.setState(prevState => {
                            prevState.categoryFilter[key].isOpen = !prevState.categoryFilter[key].isOpen; // eslint-disable-line no-param-reassign

                            return prevState;
                        })}
                        key={key + 'clubs-catalog-filter__header'}
                        className="clubs-catalog-filter__header clubs-catalog-filter__header--interactive">
                        <span className={'clubs-catalog-filter__header-icon ' +
                        'clubs-catalog-filter__header-icon--' + key}/>
                        {categoryFilter[key].title}
                        <span className={classnames('clubs-catalog-filter__header-opener', {
                            'clubs-catalog-filter__header-opener--open': state.categoryFilter[key].isOpen
                        })}/>
                    </h3>,
                    state.categoryFilter[key].isOpen ?
                        <div key={key + 'clubs-catalog-filter__sub-category-wrapper'}
                            className="clubs-catalog-filter__sub-category-wrapper">
                            {Object.keys(categoryFilter[key].items)
                                .map(innerKey => <label key={key + innerKey} className="section__checkbox">
                                    <input
                                        defaultChecked={state.categoryFilter[key].selected.indexOf(innerKey) !== -1}
                                        ref={key + innerKey}
                                        onChange={() => view.setState(prevState => {
                                            const isChecked = view.refs[key + innerKey].checked;
                                            const currentCheckedList = prevState.categoryFilter[key].selected;

                                            if (isChecked) {
                                                currentCheckedList.push(innerKey);
                                            } else {
                                                currentCheckedList.splice(currentCheckedList.indexOf(innerKey), 1);
                                            }

                                            return prevState;
                                        })}
                                        className="section__checkbox-node" type="checkbox"/>
                                    <span className="section__checkbox-state"/>
                                    {categoryFilter[key].items[innerKey]}
                                </label>)}
                        </div> :
                        null
                ])}
            </div>
            <div className="clubs-catalog-filter__clear-filter"
                onClick={() => view.setState(view.getDefaultState(), () => view.initialize())}>Очистить фильтр
            </div>
        </div>;
    }
}

export default connect(
    state => ({
        app: state.app
    }),
    {
        setFilter: trainingsCatalogAction.setFilter,
        setFilterVisible: trainingsCatalogAction.setFilterVisible
    }
)(Filter);
