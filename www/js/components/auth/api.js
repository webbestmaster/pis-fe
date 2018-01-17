/* global localStorage, location */
const lsItem = 'auth';

// window.location.host

export function getUserData() {
    const rawData = localStorage.getItem(lsItem) || '{}';

    return JSON.parse(rawData);
}

export function setUserData(newData) {
    const prevData = getUserData();

    const data = Object.assign({}, {...prevData}, {...newData});

    const rawData = JSON.stringify(data);

    localStorage.setItem(lsItem, rawData);
}


