/* global fetch, setTimeout */
const appGlobalConst = require('./../../../app-const.json');

const emptyQuery = '';

const promiseCache = {
    [emptyQuery]: Promise.resolve(null)
};

function search(query) {
    if (promiseCache.hasOwnProperty(query)) {
        return promiseCache[query];
    }

    promiseCache[query] = fetch(
        appGlobalConst.pageDataUrl.host + '/api/search/full?query=' + query,
        {credentials: 'include', method: 'GET'})
        .then(rawResult => rawResult.json());

    return promiseCache[query];
}

module.exports.search = search;
