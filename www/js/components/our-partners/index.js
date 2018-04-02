import React, {Component} from 'react';
import {resolveImagePath} from './../../helper/path-x';

const appConst = require('./../../app-const');
const {fetchX} = require('./../../helper/fetch-x');

export default class OurPartners extends Component {
    constructor() {
        super();

        const view = this;

        view.state = {
            pageData: null
        };

        fetchX(appConst.pageDataUrl.host + appConst.pageDataUrl.home).then(pageData => view.setState({pageData}));
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {pageData} = state;

        if (pageData === null) {
            return null;
        }

        return <section className="section hug our-partners">
            <h3 className="section__header">Наши партнeры</h3>

            <div className="our-partners__partner-list">
                {pageData.data.partners.map((partner, index, arr) => {
                    const link = <a
                        target="_blank"
                        href={resolveUrlToHttp(partner.external_link)}
                        className="our-partners__partner-item"
                        key={index}>
                        <img className="our-partners__partner-image"
                            src={resolveImagePath(partner.image)}
                            alt=""/>
                    </a>;

                    if (index === 3 && arr.length >= 5) {
                        return [
                            link,
                            <div key="our-partners--divider" className="our-partners__divider"/>
                        ];
                    }

                    return link;
                })}
            </div>
        </section>;
    }
}

export function resolveUrlToHttp(url) {
    if (url.indexOf('http') === 0) {
        return url;
    }

    return 'http://' + url;
}
