import React, {Component} from 'react';
import cnx from '../../helper/cnx';
import {Link} from 'react-router-dom';
import SubscriptionCard from './subscription-card';

const appConst = require('./../../app-const.json');
const {fetchX} = require('./../../helper/fetch-x');

export default class Discounts extends Component {
    constructor() {
        super();

        const view = this;

        view.state = {
            pageData: null
        };
    }

    componentDidMount() {
        const view = this;
        const {props, state} = view;
        const {clubId} = props;

        fetchX(appConst.pageDataUrl.club.replace('{{clubId}}', clubId))
            .then(({data}) => {
                view.setState({
                    pageData: data
                });
            })
            .catch(console.error);
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {pageData} = state;

        if (pageData === null) {
            return null;
        }

        const {subscriptions} = pageData;

        return <div className="hug sale hug--section">
            <h2 className="section__header">Скидки</h2>

            {/* <div className="json">{JSON.stringify(pageData)}</div>*/}

            <div className="sale-card-container">
                {/* <div className="sale-slider">*/}
                {/* <div ref="swiperSubscription"*/}
                {/* className="swiper-container swiper-container-horizontal swiper-container-free-mode">*/}
                {/* <div className="swiper-wrapper">*/}
                {subscriptions.filter(subscription => subscription.promotion &&
                    subscription.promotion.discount)
                    .map((subscription, ii) => <SubscriptionCard subscription={subscription} key={ii}/>)}
                {/* </div>*/}
                {/* </div>*/}
                {/* </div>*/}
            </div>

        </div>;
    }
}
