/* global XMLHttpRequest */
const xhrCache = {};

function getProgressiveFetchXhr(url) {
    return xhrCache[url] || null;
}

export function progressiveFetch(url, opts = {}, onProgress) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open(opts.method || 'get', url);
        Object.keys(opts.headers || {}).forEach(key => xhr.setRequestHeader(key, opts.headers[key]));
        xhr.onload = evt => resolve(evt.target.responseText);
        xhr.onerror = reject;
        if (xhr.upload && onProgress) {
            Object.assign(xhr.upload, {onprogress: onProgress}); // event.loaded / event.total * 100 ; //event.lengthComputable
        }
        xhr.send(opts.body);

        xhrCache[url] = xhr;
    });
}
