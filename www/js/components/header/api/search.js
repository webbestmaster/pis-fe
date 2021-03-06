/* global fetch */
const appGlobalConst = require('./../../../app-const');

const emptyQuery = '';

const promiseCache = {
    [emptyQuery]: Promise.resolve(null)
};

function search(query) {
    if (promiseCache.hasOwnProperty(query)) {
        return promiseCache[query];
    }

    promiseCache[query] = fetch(
        appGlobalConst.pageDataUrl.host + appGlobalConst.searchUrl.headerSearch.replace('{{query}}', query),
        {credentials: 'include', method: 'GET'})
        .then(rawResult => rawResult.json());

    return promiseCache[query];
}

module.exports.search = search;
