import {combineReducers} from 'redux';

const trainingsCatalogConst = require('./const.json');

const today = new Date();

const defaultDateFilter = Number(new Date(today.getFullYear(), today.getMonth(), today.getDate()));

export {defaultDateFilter};

export default combineReducers({
    sort: (sort = {price: 'asc', name: 'desc', rating: 'desc', activeProperty: 'price'}, {type, payload}) => {
        if (type !== trainingsCatalogConst.type.setSort) {
            return sort;
        }

        return Object.assign({}, sort, payload);
    },
    filter: (filter = null, {type, payload}) => {
        if (type !== trainingsCatalogConst.type.setFilter) {
            return filter;
        }

        return {...payload};
    },
    search: (search = null, {type, payload}) => {
        if (type !== trainingsCatalogConst.type.setSearch) {
            return search;
        }

        return {...payload};
    },
    filterIsOpen: (isOpen = false, {type, payload}) => {
        if (type !== trainingsCatalogConst.type.setFilterVisible) {
            return isOpen;
        }

        return payload.isOpen;
    },
    dateFilter: (dateFilter = defaultDateFilter, {type, payload}) => {
        if (type !== trainingsCatalogConst.type.setDateFilter) {
            return dateFilter;
        }

        return payload.dateFilter;
    },
    mode: (modeName = 'list', {type, payload}) => {
        if (type !== trainingsCatalogConst.type.setResultMode) {
            return modeName;
        }

        return payload.modeName;
    }
});
