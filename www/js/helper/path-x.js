const appConst = require('./../app-const');

export function resolveImagePath(path) {
    const preparedPath = path.trim().toLowerCase();
    const {host} = appConst.pageDataUrl;

    if (preparedPath.indexOf('http') === 0) {
        return path;
    }
    if (preparedPath.indexOf('/') === 0) {
        return host + path.trim() + appConst.proxy.postfixQuestion;
    }

    return path;
}
