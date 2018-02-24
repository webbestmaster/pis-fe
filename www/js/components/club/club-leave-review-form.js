/* global fetch */
import React, {Component} from 'react';
import style from './style.m.scss';
import cnx from './../../helper/cnx';
import {connect} from 'react-redux';
import * as authAction from './../auth/action';
import {resolveImagePath} from '../../helper/path-x';

const get = require('lodash/get');
const appConst = require('./../../app-const');
const authConst = require('./../auth/const');

class ClubLeaveReviewForm extends Component {
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
        const {auth} = props;

        if (state.waitForModeration === true) {
            return <h3 className={style.review_wait_for_moderation}>Ваш отзыв ожидает модерации</h3>;
        }

        const avatar = get(auth, 'login.data.user.image') || null;

        return [get(props.auth, 'login.data.user.id', false) ?
            null :
            <p key="review-enter"
                onClick={() => props.openPopupLogin()}
                className={style.review_enter_text}>
                Авторизуйтесь чтобы оставить отзыв
            </p>,
        <form key="form" {...cnx(style.review_form, 'clear-full',
            {disabled: !get(props.auth, 'login.data.user.id', false)}
        )}>
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
                {...cnx(style.review_form__button, {
                    disabled:
                        state.overStarIndex === -1 || !state.reviewText.length
                })}>
                    Написать отзыв
            </div>
        </form>];
    }
}

export default connect(
    state => ({
        // app: state.app,
        auth: state.auth
    }),
    {
        openPopupLogin: authAction.openPopupLogin
    }
)(ClubLeaveReviewForm);
