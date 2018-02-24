import React, {Component} from 'react';
import style from './style.m.scss';
import Rating from './../util/rating';
import {getMonthAfterDayName} from './../../helper/date';
import {connect} from 'react-redux';
import {resolveImagePath} from '../../helper/path-x';
import ClubLeaveReviewForm from './club-leave-review-form';

const appConst = require('./../../app-const');
const {fetchX} = require('./../../helper/fetch-x');
const defaultUserAvatar = require('./../../../style/i/club/no-avatar.png');

class Reviews extends Component {
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

        const {feedbacks} = pageData;

        if (!feedbacks || feedbacks.length === 0) {
            return <div className="hug sale hug--section">
                <h2 className="section__header section__header--plus-swiper">
                    Пока нет отзывов
                </h2>
                <div style={{height: 140}}/>
                <ClubLeaveReviewForm clubId={props.clubId}/>
            </div>;
        }

        return <div className="hug sale hug--section">
            <h2 className="section__header section__header--plus-swiper">
                Отзывы
            </h2>

            <div className={style.review_list + ' clear-full'}>
                {feedbacks.map((reviewItem, ii) => <div key={ii} className={style.review_item}>
                    <div className={style.review_image}
                        style={{backgroundImage: 'url(' +
                            resolveImagePath(reviewItem.user.image || defaultUserAvatar) + ')'}}/>

                    <div className={style.review_text_holder + ' clear-self'}>
                        <p className={style.review_user_name}>{reviewItem.user.name}</p>
                        <p className={style.review_date}>
                            {new Date(reviewItem.user.created_at).getDate()}&nbsp;
                            {getMonthAfterDayName(new Date(reviewItem.user.created_at).getMonth())}&nbsp;
                            {new Date(reviewItem.user.created_at).getFullYear()}
                        </p>
                        <div className={style.review_rating}><Rating
                            rating={reviewItem.rating}
                            // className={style.review_date}
                            star="clubs-catalog-list-item__rating-star"
                            activeStar="clubs-catalog-list-item__rating-star--active"/>
                        </div>
                        <ReviewText text={reviewItem.description}/>

                        {reviewItem.answer ?
                            <div className={style.review_item_admin}>
                                <div className={style.review_image}
                                    style={{backgroundImage: 'url(' + defaultUserAvatar + ')'}}/>

                                <div className={style.review_text_holder + ' clear-self'}>
                                    <p className={style.review_user_name}>Администратор</p>
                                    <p className={style.review_date}>
                                        {new Date(reviewItem.created_at).getDate()}&nbsp;
                                        {getMonthAfterDayName(new Date(reviewItem.created_at).getMonth())}&nbsp;
                                        {new Date(reviewItem.created_at).getFullYear()}
                                    </p>
                                    <ReviewText text={reviewItem.answer}/>
                                </div>
                            </div> :
                            null}
                    </div>
                </div>)}
            </div>

            <ClubLeaveReviewForm clubId={props.clubId}/>
        </div>;
    }
}

export default connect(
    state => ({
        app: state.app,
        auth: state.auth
    }),
    {}
)(Reviews);

class ReviewText extends Component {
    constructor() {
        super();

        const view = this;

        view.state = {
            isOpen: false
        };
    }

    render() {
        const view = this;
        const maxPreviewTextLength = 273;
        const {props, state} = view;

        if (state.isOpen || props.text.length <= maxPreviewTextLength) {
            return <p className={style.review_text}>{props.text}</p>;
        }

        return [
            <p key="text" className={style.review_text}>{props.text.substring(0, maxPreviewTextLength) + '...'}</p>,
            <span
                key="button"
                onClick={() => view.setState({isOpen: true})}
                className={style.review_show_full_review}>Показать полностью</span>
        ];
    }
}

