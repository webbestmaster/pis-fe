const subscriptionsCatalogConst = require('./const.json');

export function setSort({price, name, rating, activeProperty}) {
    return {
        type: subscriptionsCatalogConst.type.setSort,
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
        type: subscriptionsCatalogConst.type.setFilter,
        payload: filter
    };
}

export function setSearch(search) {
    return {
        type: subscriptionsCatalogConst.type.setSearch,
        payload: search
    };
}

export function setFilterVisible(isOpen) {
    return {
        type: subscriptionsCatalogConst.type.setFilterVisible,
        payload: {isOpen}
    };
}

export function setResultMode(modeName) {
    return {
        type: subscriptionsCatalogConst.type.setResultMode,
        payload: {modeName}
    };
}
