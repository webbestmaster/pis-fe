import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {resolveImagePath} from '../../helper/path-x';

export default class MapItemClub extends Component {
    render() {
        const view = this;
        const {props} = view;
        const {data} = props;

        return <div className="map-point">
            <div className="map-point__content">
                <div
                    className="clubs-catalog-list-item__logo"
                    style={{backgroundImage: 'url(' + resolveImagePath(data.logo_image) + ')'}}/>
                <h4 className="clubs-catalog-list-item__header">{data.title}</h4>
                <p className="clubs-catalog-list-item__address">{data.address}</p>
                <div
                    className="clubs-catalog-list-item__description">
                    <p className="line-cap-4">{data.description}</p>
                </div>
                <Link
                    to={'/club/' + data.id + '/tab-index/2'}
                    className="clubs-catalog-list-item__available-training-item
                     clubs-catalog-list-item__available-training-item--card-icon section_htdu">
                    Абонементы: {data.subscriptionsCount} шт.
                </Link>
                <Link
                    to={'/club/' + data.id + '/tab-index/3'}
                    className="clubs-catalog-list-item__available-training-item
                     clubs-catalog-list-item__available-training-item--heart-icon section_htdu">
                    Тренировки: {data.trainingsCount} шт.
                </Link>
                <Link
                    to={'/club/' + data.id}
                    className="clubs-catalog-list-item__more-info">Подробнее</Link>
            </div>
        </div>;
    }
}
