import React, {Component} from 'react';
import SubscriptionCard from './subscription-card';
import SwitchButtonRowsTable from './../ui/switch-button-rows-table';
import SubscriptionsSchedule from './subscription-schedule';

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

    renderCardList() {
        const view = this;
        const {props, state} = view;
        const {pageData} = state;

        if (pageData === null) {
            return null;
        }

        const {subscriptions} = pageData;

        return <div className="sale-card-container">
            {subscriptions.map((subscription, ii) => <SubscriptionCard subscription={subscription} key={ii}/>)}
        </div>;
    }

    renderSchedule() {
        const view = this;
        const {props, state} = view;
        const {pageData} = state;

        if (pageData === null) {
            return null;
        }

        const {subscriptions} = pageData;

        return <SubscriptionsSchedule subscriptions={subscriptions}/>;
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {pageData} = state;
        const {openAs, setOpenAs} = props;

        if (pageData === null) {
            return null;
        }

        return <div className="hug sale hug--section">
            <h3 className="section__header section__header--with-switcher">
                <SwitchButtonRowsTable
                    activeButton={openAs === 'schedule' ? 'list' : 'table'}
                    setTable={() => setOpenAs('card')}
                    setList={() => setOpenAs('schedule')}
                />
                Абонементы
            </h3>

            {openAs === 'card' ? view.renderCardList() : null}
            {openAs === 'schedule' ? view.renderSchedule() : null}
        </div>;
    }
}
