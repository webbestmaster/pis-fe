import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';

const appConst = require('./../../app-const.json');
const {fetchX} = require('./../../helper/fetch-x');

const ourPartnersImageList = [
    require('./../../../style/images/our-partners/01.png'),
    require('./../../../style/images/our-partners/02.png'),
    require('./../../../style/images/our-partners/03.png'),
    require('./../../../style/images/our-partners/04.png'),
    require('./../../../style/images/our-partners/05.png'),
    require('./../../../style/images/our-partners/06.png'),
    require('./../../../style/images/our-partners/07.png'),
    require('./../../../style/images/our-partners/08.png')
];

export default class OurPartners extends Component {
    constructor() {
        super();

        const view = this;

        view.state = {
            pageData: null
        };

        fetchX(appConst.pageDataUrl.home).then(pageData => view.setState({pageData}));
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {pageData} = state;

        if (pageData === null) {
            return null;
        }

        return <section className="section hug our-partners">
            <h3 className="section__header">Наши партнёры</h3>

            <div className="our-partners__partner-list">
                {pageData.data.partners.map((partner, index, arr) => {
                    const link = <a
                        target="_blank"
                        href={partner.external_link}
                        className="our-partners__partner-item"
                        key={index}>
                        <img className="our-partners__partner-image"
                            src={appConst.pageDataUrl.host + partner.image}
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
