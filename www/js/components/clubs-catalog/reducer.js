import {combineReducers} from 'redux';

const clubsCatalogConst = require('./const.json');

export default combineReducers({
    sort: (sort = {name: 'asc', rating: 'desc', activeProperty: 'name'}, {type, payload}) => {
        if (type !== clubsCatalogConst.type.setSort) {
            return sort;
        }

        return Object.assign({}, sort, payload);
    },
    filter: (filter = null, {type, payload}) => {
        if (type !== clubsCatalogConst.type.setFilter) {
            return filter;
        }

        return {...payload};
    },
    search: (search = null, {type, payload}) => {
        if (type !== clubsCatalogConst.type.setSearch) {
            return search;
        }

        return {...payload};
    },
    filterIsOpen: (isOpen = false, {type, payload}) => {
        if (type !== clubsCatalogConst.type.setFilterVisible) {
            return isOpen;
        }

        return payload.isOpen;
    },
    mode: (modeName = 'list', {type, payload}) => {
        if (type !== clubsCatalogConst.type.setResultMode) {
            return modeName;
        }

        return payload.modeName;
    }
});
