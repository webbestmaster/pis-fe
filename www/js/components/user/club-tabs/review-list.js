import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {resolveImagePath} from './../../../helper/path-x';
import style from './../style.m.scss';
import clubStyle from './../../club/style.m.scss';
import moment from 'moment/moment';
import tableStyle from './../table.m.scss';
import {plural} from '../../../helper/plural';
import {getMonthAfterDayName} from '../../../helper/date';
import cnx from './../../../helper/cnx';
import Rating from './../../util/rating';
import * as authAction from './../../auth/action';

const appConst = require('./../../../app-const.json');
const {fetchX} = require('./../../../helper/fetch-x');
const defaultUserAvatar = require('./../../../../style/i/club/no-avatar.png');

const fishText = 'Замечательный клуб В самом центре. Радует выбор. атмосфера неповторимая, как в' +
    ' настоящем клубе. Интерьер грандиозный. Кажется тут советская Яма была раньше - очень ' +
    'крутое помещение - красавцы. Приветливые тренера, обходительный персонал. Обязательно ' +
    'зайдем сюда еще раз. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ' +
    'cumque ipsam molestias possimus quaerat. Dolorem fugiat fugit similique soluta ' +
    'temporibus. Delectus facilis optio qui unde velit vitae! Necessitatibus, ' +
    'nulla suscipit?';

class ReviewList extends Component {
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

        fetchX(appConst.pageDataUrl.club.replace('{{clubId}}', 1))
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
        const {auth} = props;

        if (!feedbacks || feedbacks.length === 0) {
            return <div className="hug sale hug--section">
                <h2 className="section__header section__header--plus-swiper">
                    Пока нет отзывов
                </h2>
            </div>;
        }

        return <div className="hug">
            <h3 className="section__header">Отзывы</h3>

            <div className={clubStyle.review_list + ' clear-full'}>
                {feedbacks.map((reviewItem, ii) => <div key={ii} className={clubStyle.review_item}>
                    <div className={clubStyle.review_image}
                        style={{
                            backgroundImage: 'url(' +
                             resolveImagePath(reviewItem.user.image || defaultUserAvatar) +
                             ')'
                        }}/>

                    <div className={clubStyle.review_text_holder + ' clear-self'}>
                        <p className={clubStyle.review_user_name}>
                            {reviewItem.user.name || 'Аноним'}
                            <span className={clubStyle.review_mark_as_new}>NEW</span>
                        </p>
                        <p className={clubStyle.review_date}>
                            {new Date(reviewItem.user.created_at).getDate()}&nbsp;
                            {getMonthAfterDayName(new Date(reviewItem.user.created_at).getMonth())}&nbsp;
                            {new Date(reviewItem.user.created_at).getFullYear()}
                        </p>
                        <div className={clubStyle.review_rating}><Rating
                            rating={reviewItem.rating}
                            // className={style.review_date}
                            star="clubs-catalog-list-item__rating-star"
                            activeStar="clubs-catalog-list-item__rating-star--active"/>
                        </div>
                        <ReviewText text={reviewItem.description}/>

                        {reviewItem.answer ?
                            <div className={clubStyle.review_item_admin}>
                                <div
                                    className={clubStyle.review_image}
                                    style={{
                                        backgroundImage: 'url(' +
                                        resolveImagePath(auth.login.data.user.image || defaultUserAvatar) +
                                        ')'
                                    }}/>

                                <div className={clubStyle.review_text_holder + ' clear-self'}>
                                    <p className={clubStyle.review_user_name}>Администратор</p>
                                    <p className={clubStyle.review_date}>
                                        {new Date(reviewItem.created_at).getDate()}&nbsp;
                                        {getMonthAfterDayName(new Date(reviewItem.created_at).getMonth())}&nbsp;
                                        {new Date(reviewItem.created_at).getFullYear()}
                                    </p>
                                    <ReviewText text={reviewItem.answer}/>
                                </div>
                            </div> :
                            <AnswerReply
                                auth={auth}
                                onAnswearSubmit={answer => props.createClubAnswer(reviewItem.id, answer)}/>
                        }
                    </div>
                </div>)}
            </div>


        </div>;
    }
}

class AnswerReply extends Component {
    constructor() {
        super();

        const view = this;

        view.state = {
            answerText: '',
            isReplyOpen: false
        };
    }

    addClubAnswer() {
        const view = this;
        const {props, state} = view;

        if (typeof view.props.onAnswearSubmit === 'function') {
            view.props.onAnswearSubmit(state.answerText);
        }
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {auth} = props;

        if (!state.isReplyOpen) {
            return <div
                onClick={() => view.setState({isReplyOpen: true})}
                key="reply-button" className={clubStyle.reply_to_review_button}>Ответить на отзыв</div>;
        }

        return <div
            key="reply-form"
            {...cnx(clubStyle.review_form, clubStyle.reply_form, 'clear-full')}>
            <div className={clubStyle.review_form__avatar} style={{
                backgroundImage: 'url(' +
                resolveImagePath(auth.login.data.user.image || defaultUserAvatar) +
                ')'
            }}/>
            <h4 className={clubStyle.review_form__header}>Ответ администратора</h4>
            <textarea
                ref="textArea"
                onInput={() => view.setState({answerText: view.refs.textArea.value.trim()})}
                className={clubStyle.review_form__text_area} rows="10" placeholder="Напишите Ваш ответ"/>
            <div
                onClick={() => view.addClubAnswer()}
                {...cnx(clubStyle.review_form__button, {disabled: state.answerText.trim().length === 0})}>
                Ответить
            </div>
        </div>;
    }
}

class ReviewText extends Component {
    constructor() {
        super();

        const view = this;

        view.state = {
            isOpenReview: false
            // isReplyOpen: false
        };
    }

    renderText() {
        const view = this;
        const maxPreviewTextLength = 273;
        const {props, state} = view;

        if (state.isOpenReview || props.text.length <= maxPreviewTextLength) {
            return <p key="text" className={clubStyle.review_text}>{props.text}</p>;
        }

        return [
            <p key="text" className={clubStyle.review_text}>{props.text.substring(0, maxPreviewTextLength) + '...'}</p>,
            <span
                key="show-full-text-button" onClick={() => view.setState({isOpenReview: true})}
                className={clubStyle.review_show_full_review}>Показать полностью</span>
        ];
    }

    render() {
        const view = this;
        const {props, state} = view;

        return view.renderText();

        // return [
        //     ,
        // props.isAdmin ? view.renderReply() : null
        // ];
    }
}

export default connect(
    state => ({
        app: state.app,
        auth: state.auth
    }),
    {
        createClubAnswer: authAction.createClubAnswer
    }
)(ReviewList);

