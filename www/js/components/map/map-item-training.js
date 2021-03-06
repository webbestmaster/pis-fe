import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {dateToDay} from '../../helper/date';
import {connect} from 'react-redux';
import {reduceSeconds} from './../../helper/date';
import {resolveImagePath} from '../../helper/path-x';

class MapItemTraining extends Component {
    render() { // eslint-disable-line complexity
        const view = this;
        const {props} = view;
        const {data, trainingsCatalog} = props;
        const row = data;
        const promotion = row.promotion instanceof Array || !row.promotion ? null : row.promotion; // yes, if promotion is not exist: row.promotion === []

        return <div className="map-point map-point--subscriptions">
            <div className="map-point__content">
                <div
                    className="clubs-catalog-list-item__logo"
                    style={
                        {backgroundImage: 'url(' + resolveImagePath(promotion ? promotion.image : data.image) + ')'}
                    }/>
                <h4 className="clubs-catalog-list-item__header">
                    <Link
                        to={'/training/' + data.id}
                        className="clubs-catalog-list-item__header-link">
                        {data.title}
                    </Link>
                </h4>
                <p className="clubs-catalog-list-item__address">{data.fitnessClub.address}</p>
                <div className="clubs-catalog-list-item__description">
                    <p className="line-cap-4">{promotion ? promotion.description : data.description}</p>
                </div>

                <p className="clubs-catalog-list-item__available-training-item
                     clubs-catalog-list-item__available-training-item--club-icon">
                    <span className="clubs-catalog-list-item__available-training-club-name">
                        {data.fitnessClub.title}
                    </span>
                    <span className="clubs-catalog-list-item__available-training-club-address">
                        {data.fitnessClub.address}
                        {/* <span className="main-text-color">&nbsp;+3 филиала</span> */}
                    </span>
                </p>

                <div className="clubs-catalog-list-item__shot-price-info">
                    <p className="clubs-catalog-list-item__shot-price-info-text">
                        Цена:
                        <span className="clubs-catalog-list-item__shot-price-info-price">
                            {/* {promotion ? (data.price - promotion.discount).toFixed(2) : data.price}*/}
                            {data.price}
                        </span>
                        руб.
                    </p>
                    <p className="clubs-catalog-list-item__shot-price-info-subscription-text">
                        {dateToDay(trainingsCatalog.dateFilter)}&nbsp;
                        {reduceSeconds(data.fitnessClub.work_from)} - {reduceSeconds(data.fitnessClub.work_from)}
                    </p>
                </div>

                <Link to={'/training/' + data.id} className="clubs-catalog-list-item__more-info">Подробнее</Link>
            </div>
        </div>;
    }
}

export default connect(
    state => ({
        trainingsCatalog: state.trainingsCatalog
    }),
    {}
)(MapItemTraining);
