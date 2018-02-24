/* global setTimeout */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {resolveImagePath} from './../../helper/path-x';

const {search} = require('./api/search');

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
                    <div className="header-slider__result-description">
                        {item.description.substr(0, 300)}
                    </div>
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
                onBlur={() => setTimeout(() => view.setState({hasFocus: false}), 500)}
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
