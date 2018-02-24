import React, {Component} from 'react';
import SubscriptionCard from './subscription-card';

const appConst = require('./../../app-const');
const {fetchX} = require('./../../helper/fetch-x');

export default class Subscriptions extends Component {
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

        fetchX(appConst.pageDataUrl.host + appConst.pageDataUrl.club.replace('{{clubId}}', clubId))
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
            <h2 className="section__header">Абонементы</h2>

            <div className="sale-card-container">
                {subscriptions.map((subscription, ii) => <SubscriptionCard subscription={subscription} key={ii}/>)}
            </div>

        </div>;
    }
}
