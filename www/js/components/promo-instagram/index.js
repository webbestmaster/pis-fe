import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';

const appConst = require('./../../app-const');
const {fetchX} = require('./../../helper/fetch-x');
const spacerImg = require('./../../../style/i/helper/spacer.gif');

export default class PromoInstagram extends Component {
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

        return <section className="promo-instagram">
            {pageData.data.instagram.map((instagram, index) => {
                const link = <a key={index} href={instagram.post_link} target="_blank" className="promo-instagram__item"
                    style={{backgroundImage: 'url(' + instagram.image_link + ')'}}>
                    <img className="square-image" src={spacerImg} alt=""/>
                    <p className="promo-instagram__item-name">#{instagram.user}</p>
                </a>;

                if (index === 0) {
                    return [
                        link,
                        <div key="promo-instagram__about" className="promo-instagram__double-item">
                            <img className="square-image" src={spacerImg} alt=""/>
                            <div className="promo-instagram__double-item-container">
                                <h3 className="promo-instagram__double-item-header">В РИТМЕ PIS</h3>
                                <p className="promo-instagram__double-item-hash-tag">#peopleinsport</p>
                                <p className="promo-instagram__double-item-promo-text">Они разделяют дух и ценности
                                    PeopleInSport,
                                    не покладая рук работают над собой и ставят хештэг #pis или #peopleinsport, чтобы
                                    попасть на
                                    нашу страницу почета.</p>
                            </div>
                        </div>
                    ];
                }

                return link;
            })}
        </section>;
    }
}
