const trainingsCatalogConst = require('./const.json');

export function setSort({price, name, rating, activeProperty}) {
    return {
        type: trainingsCatalogConst.type.setSort,
        payload: {
            price,
            name,
            rating,
            activeProperty
        }
    };
}

export function setFilter(filter) {
    return {
        type: trainingsCatalogConst.type.setFilter,
        payload: filter
    };
}

export function setSearch(search) {
    return {
        type: trainingsCatalogConst.type.setSearch,
        payload: search
    };
}

export function setFilterVisible(isOpen) {
    return {
        type: trainingsCatalogConst.type.setFilterVisible,
        payload: {isOpen}
    };
}

export function setDateFilter(dateFilter) {
    return {
        type: trainingsCatalogConst.type.setDateFilter,
        payload: {dateFilter}
    };
}

export function setResultMode(modeName) {
    return {
        type: trainingsCatalogConst.type.setResultMode,
        payload: {modeName}
    };
}
