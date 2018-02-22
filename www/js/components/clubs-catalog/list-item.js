import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {plural} from './../../helper/plural';
import Rating from './../util/rating';

const appConst = require('./../../app-const');

class ListItem extends Component {
    render() {
        const view = this;
        const {props, state} = view;
        const {data} = props;
        const {attributes} = data;
        const {comfort} = attributes;
        const {host} = appConst.pageDataUrl;

        return <div className="clubs-catalog-list-item clear-full">
            <div className="clubs-catalog-list-item__image"
                style={{backgroundImage: 'url(' + (host + data.image) + ')'}}/>
            <div className="clubs-catalog-list-item__info">
                <div className="clubs-catalog-list-item__logo"
                    style={{backgroundImage: 'url(' + (host + data.logo_image) + ')'}}/>
                <h4 className="clubs-catalog-list-item__header">{data.title}</h4>
                <p className="clubs-catalog-list-item__address">{data.address}</p>
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
                <div className="clubs-catalog-list-item__description line-cap-8"
                    dangerouslySetInnerHTML={{
                        __html: data.description // eslint-disable-line id-match
                    }}/>
                <div className="clubs-catalog-list-item__available-training clear-full">
                    <Link to={'/club/' + data.id + '/tab-index/2'}
                        className="clubs-catalog-list-item__available-training-item
                     clubs-catalog-list-item__available-training-item--card-icon section_htdu">
                        Абонементы: {data.subscriptionsCount} шт.
                    </Link>
                    <Link to={'/club/' + data.id + '/tab-index/3'}
                        className="clubs-catalog-list-item__available-training-item
                     clubs-catalog-list-item__available-training-item--heart-icon section_htdu">
                        Тренировки: {data.trainingsCount} шт.
                    </Link>
                </div>
                <div className="clubs-catalog-list-item__rating">
                    <Rating
                        rating={data.rating}
                        className="clubs-catalog-list-item__rating-stars"
                        star="clubs-catalog-list-item__rating-star"
                        activeStar="clubs-catalog-list-item__rating-star--active"/>
                    <Link to={'/club/' + data.id + '/tab-index/1'} className="clubs-catalog-list-item__reviews-count">
                        {plural(data.feedbacksCount, 'отзыв')}
                    </Link>
                </div>
                <Link to={'/club/' + data.id} href="#" className="clubs-catalog-list-item__more-info">Подробнее</Link>
            </div>
        </div>;
    }
}

export default connect(
    state => ({}),
    {}
)(ListItem);
