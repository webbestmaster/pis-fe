/* global localStorage, location */

const Cryptr = require('cryptr');
const cryptr = new Cryptr(location.host);

const encrypt = str => cryptr.encrypt(str); // eslint-disable-line func-style
const decrypt = str => cryptr.decrypt(str); // eslint-disable-line func-style

const lsItem = encrypt('auth');

export function getUserData() {
    const rawData = localStorage.getItem(lsItem) || encrypt('{}');

    try {
        return JSON.parse(decrypt(rawData));
    } catch (err) {
        console.error(err);
        localStorage.setItem(lsItem, '');
        location.reload();
    }

    return {};
}

export function setUserData(newData) {
    const prevData = getUserData();

    const data = Object.assign({}, {...prevData}, {...newData});

    const rawData = JSON.stringify(data);

    // localStorage.setItem(lsItem, encrypt(rawData));
}
