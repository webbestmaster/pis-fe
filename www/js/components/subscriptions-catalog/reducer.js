import {combineReducers} from 'redux';

const subscriptionsCatalogConst = require('./const.json');

export default combineReducers({
    sort: (sort = {price: 'asc', name: 'desc', rating: 'desc', activeProperty: 'price'}, {type, payload}) => {
        if (type !== subscriptionsCatalogConst.type.setSort) {
            return sort;
        }

        return Object.assign({}, sort, payload);
    },
    filter: (filter = null, {type, payload}) => {
        if (type !== subscriptionsCatalogConst.type.setFilter) {
            return filter;
        }

        return {...payload};
    },
    search: (search = null, {type, payload}) => {
        if (type !== subscriptionsCatalogConst.type.setSearch) {
            return search;
        }

        return {...payload};
    },
    filterIsOpen: (isOpen = false, {type, payload}) => {
        if (type !== subscriptionsCatalogConst.type.setFilterVisible) {
            return isOpen;
        }

        return payload.isOpen;
    },
    mode: (modeName = 'list', {type, payload}) => {
        if (type !== subscriptionsCatalogConst.type.setResultMode) {
            return modeName;
        }

        return payload.modeName;
    }
});
