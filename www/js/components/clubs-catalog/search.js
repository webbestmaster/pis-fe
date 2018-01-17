import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';
import * as clubsCatalogAction from './action';
// import HeaderSimple from './../components/header-simple';
// import TopBigBanner from './../components/top-big-banner';

// const topBanner = require('./../../style/images/clubs/top-banner.png');

class Search extends Component {
    onInput() {
        const view = this;
        const {props, state, refs} = view;
        const {input} = refs;
        const query = input.value.trim();

        props.setSearch({query});
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {clubsCatalog} = props;

        return <div className="clubs-catalog-search">
            <input
                defaultValue={clubsCatalog.search && clubsCatalog.search.query}
                ref="input"
                onInput={() => view.onInput()}
                className="clubs-catalog-search__input" placeholder="Введите название клуба" type="text"/>
            <div className="clubs-catalog-search__input-icon"/>
        </div>;
    }
}


export default connect(
    state => ({
        clubsCatalog: state.clubsCatalog
    }),
    {
        setSearch: clubsCatalogAction.setSearch
    }
)(Search);
