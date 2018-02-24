import React, {Component} from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';
import * as clubsCatalogAction from './action';

const globalAppConst = require('./../../app-const');

class Sort extends Component {
    render() {
        const view = this;
        const {props, state} = view;
        const {clubsCatalog, app} = props;

        return <div className="clubs-catalog-sort">
            {app.screen.width > globalAppConst.tabletWidth ? null :
                <div className="clubs-catalog-sort__open-filter"
                    onClick={() => props.setFilterVisible(true)}>Фильтры</div>}

            <p className="clubs-catalog-sort__text">Сортировать:</p>
            <div
                onClick={() => props.setSort({
                    activeProperty: 'name',
                    name: clubsCatalog.sort.name === 'desc' ? 'asc' : 'desc',
                    rating: clubsCatalog.sort.rating
                })}
                className={classnames('clubs-catalog-sort__button', {
                    'clubs-catalog-sort__button--active': clubsCatalog.sort.activeProperty === 'name'
                })}>
                по названию<span
                    className={classnames('clubs-catalog-sort__button-arrow', {
                        'clubs-catalog-sort__button-arrow--down': clubsCatalog.sort.name === 'asc'
                    })}
                />
            </div>
            <div
                onClick={() => props.setSort({
                    activeProperty: 'rating',
                    name: clubsCatalog.sort.name,
                    rating: clubsCatalog.sort.rating === 'desc' ? 'asc' : 'desc'
                })}
                className={classnames('clubs-catalog-sort__button', {
                    'clubs-catalog-sort__button--active': clubsCatalog.sort.activeProperty === 'rating'
                })}>
                по рейтингу<span
                    className={classnames('clubs-catalog-sort__button-arrow', {
                        'clubs-catalog-sort__button-arrow--down': clubsCatalog.sort.rating === 'asc'
                    })}
                />
            </div>

            {app.screen.width > globalAppConst.tabletWidth ?
                [
                    <div key="map"
                        onClick={() => props.setResultMode('map')}
                        className={classnames('clubs-catalog-sort__button-colored', {
                            'clubs-catalog-sort__button-colored--active': clubsCatalog.mode === 'map'
                        })}>
                        На карте<span className="clubs-catalog-sort__button-colored-icon
                clubs-catalog-sort__button-colored-icon--map-pin"/>
                    </div>,
                    <div key="list"
                        onClick={() => props.setResultMode('list')}
                        className={classnames('clubs-catalog-sort__button-colored', {
                            'clubs-catalog-sort__button-colored--active': clubsCatalog.mode === 'list'
                        })}>
                        Список<span className="clubs-catalog-sort__button-colored-icon
                clubs-catalog-sort__button-colored-icon--list"/>
                    </div>
                ] :
                null}
        </div>;
    }
}

export default connect(
    state => ({
        clubsCatalog: state.clubsCatalog,
        app: state.app
    }),
    {
        setSort: clubsCatalogAction.setSort,
        setFilterVisible: clubsCatalogAction.setFilterVisible,
        setResultMode: clubsCatalogAction.setResultMode
    }
)(Sort);
