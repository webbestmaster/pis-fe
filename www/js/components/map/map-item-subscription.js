import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {resolveImagePath} from '../../helper/path-x';

export default class MapItemClub extends Component {
    render() { // eslint-disable-line complexity
        const view = this;
        const {props} = view;
        const {data} = props;
        const row = data;
        const promotion = row.promotion instanceof Array || !row.promotion ? null : row.promotion; // yes, if promotion is not exist: row.promotion === []

        return <div className="map-point map-point--subscriptions">
            <div className="map-point__content">
                <div
                    className="clubs-catalog-list-item__logo"
                    style={
                        {backgroundImage: 'url(' + resolveImagePath(promotion ? promotion.image : data.image) + ')'}
                    }/>
                <h4 className="clubs-catalog-list-item__header">{data.title}</h4>
                <p className="clubs-catalog-list-item__address">{data.fitnessClub.address}</p>
                <div
                    className="clubs-catalog-list-item__description">
                    <p>{promotion ? promotion.description : data.description}</p>
                </div>

                {/* <div className="clubs-catalog-list-item__available-training clear-full">*/}
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
                {/*
                    <div className="clubs-catalog-list-item__available-training-item
                     clubs-catalog-list-item__available-training-item--review">
                        <Rating
                            rating={data.fitnessClub.rating}
                            className="clubs-catalog-list-item__rating-stars"
                            star="clubs-catalog-list-item__rating-star"
                            activeStar="clubs-catalog-list-item__rating-star--active"/>
                         <a href="#" className="clubs-catalog-list-item__reviews-count">
                         {plural(data.feedbacksCount, 'отзыв')}
                         </a>
                    </div>
*/}
                {/* </div>*/}

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
                        &nbsp;
                        {/* Еще {plural(data.subscriptionsCount, 'абонемент')}*/}
                    </p>
                </div>

                <Link to={'/subscription/' + data.id} className="clubs-catalog-list-item__more-info">Подробнее</Link>
                {/*


                <p className="clubs-catalog-list-item__available-training-item
                     clubs-catalog-list-item__available-training-item--card-icon">
                    Абонементы: {data.subscriptionsCount} шт.
                </p>
                <p className="clubs-catalog-list-item__available-training-item
                     clubs-catalog-list-item__available-training-item--heart-icon">
                    Тренировки: {data.trainingsCount} шт.
                </p>
                <a href="#" className="clubs-catalog-list-item__more-info">Подробнее</a>
*/}
            </div>
        </div>;
    }
}
