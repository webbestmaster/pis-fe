/* global document */
const metaTagConst = require('./const.json');
const globalAppConst = require('./../../app-const');
const {fetchX} = require('./../../helper/fetch-x');

export default class MetaTagMaster {
    constructor() {
        const master = this; // eslint-disable-line consistent-this

        master.attr = {
            title: document.querySelector('title'),
            description: document.querySelector('meta[name="description"]'),
            keywords: document.querySelector('meta[name="keywords"]')
        };
    }

    updateByUrl(url, defaultMetaData = {}) {
        if (globalAppConst.isTest) {
            return Promise.resolve();
        }

        const master = this; // eslint-disable-line consistent-this

        return fetchX(globalAppConst.pageDataUrl.host + globalAppConst.pageDataUrl.metaTag.replace('{{url}}', url))
            .then(response => { // eslint-disable-line complexity
                const {page} = response.data;

                master
                    .setTitle(page.meta_title ||
                        defaultMetaData.title ||
                        metaTagConst.default.title);
                master
                    .setDescription(page.meta_description ||
                        defaultMetaData.description ||
                        metaTagConst.default.description);
                master
                    .setKeywords(page.meta_keywords ||
                        defaultMetaData.keywords ||
                        metaTagConst.default.keywords);
            });
    }

    setTitle(title) {
        const master = this; // eslint-disable-line consistent-this
        const titleTag = master.attr.title;

        titleTag.innerText = title;
    }

    setDescription(description) {
        const master = this; // eslint-disable-line consistent-this
        const descriptionTag = master.attr.description;

        descriptionTag.setAttribute('content', description);
    }

    setKeywords(keywords) {
        const master = this; // eslint-disable-line consistent-this
        const keywordsTag = master.attr.keywords;

        keywordsTag.setAttribute('content', keywords);
    }
}

const metaTagMaster = new MetaTagMaster();

export {metaTagMaster};
