import React, {Component} from 'react';
import cnx from '../../helper/cnx';
import {Link} from 'react-router-dom';

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

        /*
        subscriptions.push(...subscriptions);
        subscriptions.push(...subscriptions);
        subscriptions.push(...subscriptions);
        subscriptions.push(...subscriptions);
*/

        return <div className="hug sale hug--section">
            <h2 className="section__header">Скидки</h2>

            {/* <div className="json">{JSON.stringify(pageData)}</div>*/}

            <div className="sale-card-container">
                {/* <div className="sale-slider">*/}
                {/* <div ref="swiperSubscription"*/}
                {/* className="swiper-container swiper-container-horizontal swiper-container-free-mode">*/}
                {/* <div className="swiper-wrapper">*/}
                {subscriptions.filter(subscription => subscription.promotion &&
                    subscription.promotion.discount).map((subscription, ii) => {
                    const promotion = subscription.promotion instanceof Array || !subscription.promotion ?
                        null :
                        subscription.promotion; // yes, if promotion is not exist: row.promotion === []

                    return <Link
                        key={ii} className="swiper-slide sale-swiper-card"
                        to={'/subscription/' + (promotion ?
                            promotion.fitness_club_subscription_id :
                            subscription.id)}>
                        <div {...cnx('sale-swiper-card__label', {
                            'sale-swiper-card__label--line-only': Boolean(!promotion)
                        })}>%
                        </div>

                        <div className="sale-swiper-card__static-content">
                            <div className="sale-swiper-card__stopwatch"/>
                            <div className="sale-swiper-card__subscription-data">
                                <p className="sale-swiper-card__subscription-count">
                                    {subscription.period_amount}
                                </p>
                                <p className="sale-swiper-card__subscription-header">{subscription.title}</p>
                            </div>
                            <div className="sale-swiper-card__subscription-description">
                                <p dangerouslySetInnerHTML={{
                                    __html: subscription.description // eslint-disable-line id-match
                                }}/>
                            </div>
                            <p className="sale-swiper-card__subscription-cost">{promotion ?
                                (subscription.price - promotion.discount).toFixed(2) :
                                subscription.price}
                            <span
                                className="sale-swiper-card__subscription-cost-currency">руб.</span></p>
                            <div className="sale-swiper-card__button">Забронировать</div>
                        </div>
                    </Link>;
                })}
                {/* </div>*/}
                {/* </div>*/}
                {/* </div>*/}
            </div>

        </div>;
    }
}
