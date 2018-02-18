import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';
import * as subscriptionsCatalogAction from './action';

const globalAppConst = require('./../../app-const');
// import HeaderSimple from './../components/header-simple';
// import TopBigBanner from './../components/top-big-banner';

class Sort extends Component {
    render() {
        const view = this;
        const {props, state} = view;
        const {subscriptionsCatalog, app} = props;

        return <div className="clubs-catalog-sort">
            {app.screen.width > globalAppConst.tabletWidth ? null :
                <div className="clubs-catalog-sort__open-filter"
                    onClick={() => props.setFilterVisible(true)}>Фильтры</div>}

            <p className="clubs-catalog-sort__text">Сортировать:</p>
            <div
                onClick={() => props.setSort({
                    activeProperty: 'price',
                    price: subscriptionsCatalog.sort.price === 'desc' ? 'asc' : 'desc',
                    name: subscriptionsCatalog.sort.name,
                    rating: subscriptionsCatalog.sort.rating
                })}
                className={classnames('clubs-catalog-sort__button', {
                    'clubs-catalog-sort__button--active': subscriptionsCatalog.sort.activeProperty === 'price'
                })}>
                по цене<span
                    className={classnames('clubs-catalog-sort__button-arrow', {
                        'clubs-catalog-sort__button-arrow--down': subscriptionsCatalog.sort.price === 'asc'
                    })}
                />
            </div>
            <div
                onClick={() => props.setSort({
                    activeProperty: 'name',
                    price: subscriptionsCatalog.sort.price,
                    name: subscriptionsCatalog.sort.name === 'desc' ? 'asc' : 'desc',
                    rating: subscriptionsCatalog.sort.rating
                })}
                className={classnames('clubs-catalog-sort__button', {
                    'clubs-catalog-sort__button--active': subscriptionsCatalog.sort.activeProperty === 'name'
                })}>
                по названию<span
                    className={classnames('clubs-catalog-sort__button-arrow', {
                        'clubs-catalog-sort__button-arrow--down': subscriptionsCatalog.sort.name === 'asc'
                    })}
                />
            </div>
            <div
                onClick={() => props.setSort({
                    activeProperty: 'rating',
                    price: subscriptionsCatalog.sort.price,
                    name: subscriptionsCatalog.sort.name,
                    rating: subscriptionsCatalog.sort.rating === 'desc' ? 'asc' : 'desc'
                })}
                className={classnames('clubs-catalog-sort__button', {
                    'clubs-catalog-sort__button--active': subscriptionsCatalog.sort.activeProperty === 'rating'
                })}>
                по рейтингу<span
                    className={classnames('clubs-catalog-sort__button-arrow', {
                        'clubs-catalog-sort__button-arrow--down': subscriptionsCatalog.sort.rating === 'asc'
                    })}
                />
            </div>

            {app.screen.width > globalAppConst.tabletWidth ?
                [
                    <div key="map"
                        onClick={() => props.setResultMode('map')}
                        className={classnames('clubs-catalog-sort__button-colored', {
                            'clubs-catalog-sort__button-colored--active': subscriptionsCatalog.mode === 'map'
                        })}>
                        На карте<span className="clubs-catalog-sort__button-colored-icon
                clubs-catalog-sort__button-colored-icon--map-pin"/>
                    </div>,
                    <div key="list"
                        onClick={() => props.setResultMode('list')}
                        className={classnames('clubs-catalog-sort__button-colored', {
                            'clubs-catalog-sort__button-colored--active': subscriptionsCatalog.mode === 'list'
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
        subscriptionsCatalog: state.subscriptionsCatalog,
        app: state.app
    }),
    {
        setSort: subscriptionsCatalogAction.setSort,
        setFilterVisible: subscriptionsCatalogAction.setFilterVisible,
        setResultMode: subscriptionsCatalogAction.setResultMode
    }
)(Sort);
