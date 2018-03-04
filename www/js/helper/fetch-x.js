// @flow
/* global fetch, setTimeout */

const promiseCache = {};

type OptionsType = {
    credentials?: 'include';
    method?: 'GET' | 'POST';
    body?: FormData
};

export function fetchX(url: string, options: OptionsType = {}): Promise<any> { // eslint-disable-line flowtype/no-weak-types
    const cacheProperty = url + ' - ' + JSON.stringify(options);

    if (promiseCache.hasOwnProperty(cacheProperty)) {
        return promiseCache[cacheProperty];
    }

    promiseCache[cacheProperty] = fetch(url, {
        credentials: options.credentials || 'include',
        method: options.method || 'GET',
        body: options.body || null
    })
        .then((rawResult: Response): any => rawResult.json()); // eslint-disable-line flowtype/no-weak-types

    return promiseCache[cacheProperty];
}
