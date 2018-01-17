import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import classnames from 'classnames';
import {headerMaxHeight} from './index';
import {resolveImagePath} from './../../helper/path-x';

const {search} = require('./api/search');

const backSlideImage = require('./../../../style/images/header/search.jpg');
const leftSlideImage = require('./../../../style/images/header/clubs.jpg');
const centerSlideImage = require('./../../../style/images/header/subscriptions.jpg');
const rightSlideImage = require('./../../../style/images/header/trainings.jpg');
const globalAppConst = require('./../../app-const.json');


/* global document, setTimeout, location */

// const {SearchPage} = require('./search-page');

function normalizeString(string) {
    return string.trim().replace(/\s+/g, ' ');
}

class Search extends Component {
    constructor() {
        super();

        const view = this;

        view.state = {
            query: '',
            result: {},
            isInProgress: false,
            hasFocus: false
        };
    }

    renderList() {
        const view = this;
        const {state} = view;
        const {result, hasFocus, query} = state;

        if (!hasFocus || !query || query.length < 3) {
            return null;
        }

        if (result.data.rows.length === 0) {
            return <div className="header-slider__search-result-list header-slider__search-result-list--search-empty">
                По запросу<span className="bold"> "{query}" </span>ничего не найдено
            </div>;
        }

        return <div className="header-slider__search-result-list">
            {result.data.rows.map(row => view.renderResultItem(row))}
        </div>;
    }

    renderResultItem(item) {
        switch (item.category) {
            case 'fitness_clubs':
                return <Link
                    to={'/club/' + item.id}
                    key={item.title + item.image}
                    className="header-slider__search-result-item">
                    <div
                        className="header-slider__search-result-image"
                        style={{
                            backgroundImage:
                            'url(' + resolveImagePath(item.image) + ')'
                        }}/>
                    <h4 className="header-slider__search-result-name">{item.title}</h4>
                    <div className="header-slider__result-description" dangerouslySetInnerHTML={{
                        __html: item.description // eslint-disable-line id-match
                    }}/>
                </Link>;

            default:
                return null;
        }
    }

    onSearchInput() {
        const view = this;
        const {searchInput} = view.refs;
        const query = normalizeString(searchInput.value);

        view.setState({isInProgress: true});

        search(query)
            .then(searchResult => {
                if (query !== normalizeString(searchInput.value)) {
                    return;
                }

                view.setState({result: searchResult, query, isInProgress: false});
            });
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {isInProgress} = state;

        return <div style={{display: 'block', height: '100%'}}>
            <input
                ref="searchInput"
                type="text"
                className="header-slider__search-input"
                placeholder="Введите название клуба"
                onInput={() => view.onSearchInput()}
                onFocus={() => {
                    view.onSearchInput();
                    view.setState({hasFocus: true});
                }}
                onBlur={() => setTimeout(() => view.setState({hasFocus: false}), 300)}
            />
            <button
                key="button"
                type="submit"
                className="header-slider__search-button"
                style={{opacity: isInProgress ? 0.5 : 1}}>
                Поиск клуба
            </button>
            <div className="header-slider__search-result-list-wrapper">
                {view.renderList()}
            </div>
        </div>;
    }
}

export default connect(
    state => ({
        app: state.app
    }),
    {}
)(Search);
