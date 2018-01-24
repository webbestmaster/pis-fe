import React, {Component} from 'react';
import {connect} from 'react-redux';
import {plural} from './../../helper/plural';
import Rating from './../util/rating';
import classnames from 'classnames';
import {dateToDay} from './../../helper/date';
import {reduceSeconds} from './../../helper/date';
import {Link} from 'react-router-dom';
import {resolveImagePath} from './../../helper/path-x';

const appConst = require('./../../app-const.json');

class ListItem extends Component {
    render() { // eslint-disable-line complexity
        const view = this;
        const {props, state} = view;
        const {trainingsCatalog} = props;
        const {data} = props;
        const {attributes} = data.fitnessClub;
        const {comfort} = attributes;
        const {host} = appConst.pageDataUrl;
        const row = data;
        const promotion = row.promotion instanceof Array || !row.promotion ? null : row.promotion; // yes, if promotion is not exist: row.promotion === []

        return <div className="clubs-catalog-list-item clear-full">
            <div className="clubs-catalog-list-item__image"
                style={{backgroundImage: 'url(' + resolveImagePath(promotion ? promotion.image : data.image) + ')'}}/>
            <div className="clubs-catalog-list-item__info">
                <h4 className={classnames('clubs-catalog-list-item__header',
                    'clubs-catalog-list-item__header--icon',
                    'clubs-catalog-list-item__header--icon-' + data.category)}>{data.title}</h4>
                <p className="clubs-catalog-list-item__address">{data.fitnessClub.address}</p>
                <div className="clubs-catalog-list-item__short-additional-info clear-full">
                    {comfort & 2 ? // eslint-disable-line no-bitwise
                        <p className="clubs-catalog-list-item__short-additional-info-item
                    clubs-catalog-list-item__short-additional-info-item--metro">Рядом метро</p> :
                        null}
                    {comfort & 1024 ? // eslint-disable-line no-bitwise
                        <p className="clubs-catalog-list-item__short-additional-info-item
                    clubs-catalog-list-item__short-additional-info-item--parking">Есть парковка</p> :
                        null}
                </div>
                <div className="clubs-catalog-list-item__description line-cap-5"
                    dangerouslySetInnerHTML={{
                        __html: promotion ? promotion.description : data.description // eslint-disable-line id-match
                    }}/>
                <div className="clubs-catalog-list-item__available-training clear-full">
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
                    <div className="clubs-catalog-list-item__available-training-item
                     clubs-catalog-list-item__available-training-item--review">
                        <Rating
                            rating={data.fitnessClub.rating}
                            className="clubs-catalog-list-item__rating-stars"
                            star="clubs-catalog-list-item__rating-star"
                            activeStar="clubs-catalog-list-item__rating-star--active"/>
                        <Link to={'/club/' + data.fitnessClub.id + '/tab-index/' + 1}
                            className="clubs-catalog-list-item__reviews-count">
                            {plural(data.fitnessClub.feedbacksCount, 'отзыв')}
                        </Link>
                    </div>
                </div>

                <div className="clubs-catalog-list-item__shot-price-info">
                    <p className="clubs-catalog-list-item__shot-price-info-text">
                        Цена:
                        <span className="clubs-catalog-list-item__shot-price-info-price">
                            {promotion ? (data.price - promotion.discount).toFixed(2) : data.price}
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
)(ListItem);
