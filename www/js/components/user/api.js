/* global fetch */
const userConst = require('./const.json');
const globalAppConst = require('./../../app-const.json');

const orderApi = {
    confirm: orderId =>
        fetch(globalAppConst.pageDataUrl.host + userConst.url.order.confirm.replace('{{orderId}}', orderId))
            .then(blobData => blobData.json()),

    decline: orderId =>
        fetch(globalAppConst.pageDataUrl.host + userConst.url.order.decline.replace('{{orderId}}', orderId))
            .then(blobData => blobData.json()),

    approve: orderId =>
        fetch(globalAppConst.pageDataUrl.host + userConst.url.order.approve.replace('{{orderId}}', orderId))
            .then(blobData => blobData.json())
};

export {orderApi};
