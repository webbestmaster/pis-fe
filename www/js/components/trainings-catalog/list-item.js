import React, {Component} from 'react';
import {connect} from 'react-redux';
import {plural} from './../../helper/plural';
import Rating from './../util/rating';
import classnames from 'classnames';
import {dateToDay} from './../../helper/date';
import {reduceSeconds} from './../../helper/date';
import {Link} from 'react-router-dom';
import {resolveImagePath} from './../../helper/path-x';
import {prepareScheduleList} from '../training/date-filter';
import {defaultDateFilter} from './reducer';
import TextCap from './../util/text-cap';

const defaultItems = [defaultDateFilter];
const millisecondsInOneDay = 24 * 60 * 60 * 1000;

while (defaultItems.length < 7) {
    defaultItems.push(defaultItems[defaultItems.length - 1] + millisecondsInOneDay);
}

const appConst = require('./../../app-const');

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
        const preparedScheduleList = prepareScheduleList(data.schedule);
        const {firstSchedule, firstDayIndex} = preparedScheduleList;
        const dayData = firstSchedule[firstDayIndex];

        return <div className="clubs-catalog-list-item clear-full">
            <div className="clubs-catalog-list-item__image"
                style={{backgroundImage: 'url(' + resolveImagePath(promotion ? promotion.image : data.image) + ')'}}/>
            <div className="clubs-catalog-list-item__info">
                <h4 className={classnames('clubs-catalog-list-item__header',
                    'clubs-catalog-list-item__header--icon',
                    'clubs-catalog-list-item__header--icon-' + data.category)}>
                    <Link
                        to={'/training/' + data.id}
                        className="clubs-catalog-list-item__header-link">
                        {data.title}
                    </Link>
                </h4>
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
                <div className="clubs-catalog-list-item__description">
                    <TextCap lineCap={8}>{promotion ? promotion.description : data.description}</TextCap>
                </div>
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
                            {/* {promotion ? (data.price - promotion.discount).toFixed(2) : data.price}*/}
                            {data.price}
                        </span>
                        руб.
                    </p>
                    <p className="clubs-catalog-list-item__shot-price-info-subscription-text">
                        {dateToDay(trainingsCatalog.dateFilter)}&nbsp;
                        {reduceSeconds(dayData.time_from)} - {reduceSeconds(dayData.time_to)}
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
