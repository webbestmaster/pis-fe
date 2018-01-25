/* global fetch */
import React, {Component} from 'react';
import style from './style.m.scss';
import Rating from './../util/rating';
import cnx from './../../helper/cnx';
import {getMonthAfterDayName} from './../../helper/date';
import {connect} from 'react-redux';
import * as authAction from './../auth/action';
import * as authApi from '../auth/api';
import {store} from '../../index';
import {resolveImagePath} from '../../helper/path-x';

const get = require('lodash/get');
const appConst = require('./../../app-const.json');
const {fetchX} = require('./../../helper/fetch-x');
const defaultUserAvatar = require('./../../../style/i/club/no-avatar.png');
const authConst = require('./../auth/const.json');

const fishText = 'Замечательный клуб В самом центре. Радует выбор. атмосфера неповторимая, как в' +
    ' настоящем клубе. Интерьер грандиозный. Кажется тут советская Яма была раньше - очень ' +
    'крутое помещение - красавцы. Приветливые тренера, обходительный персонал. Обязательно ' +
    'зайдем сюда еще раз. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ' +
    'cumque ipsam molestias possimus quaerat. Dolorem fugiat fugit similique soluta ' +
    'temporibus. Delectus facilis optio qui unde velit vitae! Necessitatibus, ' +
    'nulla suscipit?';

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

        const {feedbacks} = pageData;

        if (!feedbacks || feedbacks.length === 0) {
            return <div className="hug sale hug--section">
                <h2 className="section__header section__header--plus-swiper">
                    Пока нет отзывов
                </h2>
                <div style={{height: 140}}/>
                <LeaveReviewForm/>
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

            {get(props.auth, 'login.data.user.id', false) ?
                <LeaveReviewForm clubId={props.clubId} login={props.auth.login}/> :
                [<p key="review_enter" onClick={() => props.openPopupLogin()}
                    className={style.review_enter_text}>Авторизуйтесь чтобы оставить отзыв</p>,
                <div key="form-wrapper" className="disabled"><LeaveReviewForm/></div>]

            }
        </div>;
    }
}

export default connect(
    state => ({
        app: state.app,
        auth: state.auth
    }),
    {
        openPopupLogin: authAction.openPopupLogin
    }
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

class LeaveReviewForm extends Component {
    constructor() {
        super();

        const view = this;

        view.state = {
            error: null,
            overStarIndex: -1,
            reviewText: '',
            waitForModeration: false
        };
    }

    onStarOver(starIndex) {
        const view = this;

        view.setState({overStarIndex: starIndex});
    }

    leaveReview() {
        const view = this;
        const {props, state} = view;
        const description = state.reviewText;
        const rating = state.overStarIndex + 1;
        const {clubId} = props;

        fetch(appConst.pageDataUrl.host + authConst.url.leaveReview
            .replace('{{clubId}}', clubId)
            .replace('{{description}}', description)
            .replace('{{rating}}', rating),
        {credentials: 'include', method: 'POST'})
            .then(blobData => blobData.json())
            .then(parsedData => {
                if (parsedData.code === 200) {
                    view.refs.textArea.value = '';
                    view.setState({
                        overStarIndex: -1,
                        reviewText: '',
                        error: null,
                        waitForModeration: true
                    });
                    return;
                }

                const {data} = parsedData;

                if (data instanceof Array) {
                    view.setState({error: data[0]});
                    return;
                }

                const errorKey = Object.keys(data)[0];

                view.setState({error: data[errorKey][0]});
            });
    }

    render() { // eslint-disable-line complexity
        const view = this;
        const {props, state} = view;

        if (state.waitForModeration === true) {
            return <h3 className={style.review_wait_for_moderation}>Ваш отзыв ожидает модерации</h3>;
        }

        const avatar = get(props, 'login.data.user.image') || null;

        return <form className={style.review_form + ' clear-full'}>
            {avatar ?
                <div
                    className={style.review_form__avatar}
                    style={{backgroundImage: 'url(' + resolveImagePath(avatar) + ')'}}/> :
                <div className={style.review_form__avatar}/>
            }
            <h4 className={style.review_form__header}>Оставить отзыв</h4>
            <div className={style.review_form__stars_wrapper}>
                {'     '.split('')
                    .map((item, ii) => <div
                        key={ii}
                        onClick={() => view.onStarOver(ii)}
                        {...cnx('clubs-catalog-list-item__rating-star', {
                            'clubs-catalog-list-item__rating-star--active': ii <= state.overStarIndex
                        })}/>)}
            </div>
            <p className={style.review_form__stars_label}>Выставите Вашу оценку</p>
            <textarea
                ref="textArea"
                onInput={() => view.setState({reviewText: view.refs.textArea.value.trim()})}
                className={style.review_form__text_area} rows="10" placeholder="Напишите Ваш отзыв"/>
            {state.error && <p className={style.review_error_text}>{state.error}</p>}
            <div
                onClick={() => view.leaveReview()}
                {...cnx(style.review_form__button, {disabled: state.overStarIndex === -1 || !state.reviewText.length})}>
                Написать отзыв
            </div>
        </form>;
    }
}
