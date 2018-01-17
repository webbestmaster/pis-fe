const clubsCatalogConst = require('./const.json');

export function setSort({name, rating, activeProperty}) {
    return {
        type: clubsCatalogConst.type.setSort,
        payload: {
            name,
            rating,
            activeProperty
        }
    };
}

export function setFilter(filter) {
    return {
        type: clubsCatalogConst.type.setFilter,
        payload: filter
    };
}

export function setSearch(search) {
    return {
        type: clubsCatalogConst.type.setSearch,
        payload: search
    };
}

export function setFilterVisible(isOpen) {
    return {
        type: clubsCatalogConst.type.setFilterVisible,
        payload: {isOpen}
    };
}

export function setResultMode(modeName) {
    return {
        type: clubsCatalogConst.type.setResultMode,
        payload: {modeName}
    };
}

