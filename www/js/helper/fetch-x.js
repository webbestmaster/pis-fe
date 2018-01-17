/* global fetch, setTimeout */

const promiseCache = {};

function fetchX(url, options = {}) {
    const cacheProperty = url + ' - ' + JSON.stringify(options);

    if (promiseCache.hasOwnProperty(cacheProperty)) {
        return promiseCache[cacheProperty];
    }

    promiseCache[cacheProperty] = fetch(url, options)
        .then(rawResult => rawResult.json());

    return promiseCache[cacheProperty];
}

module.exports.fetchX = fetchX;
