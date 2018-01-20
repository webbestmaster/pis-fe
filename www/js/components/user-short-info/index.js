import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {resolveImagePath} from './../../helper/path-x';
import * as authAction from './../auth/action';

import style from './style.m.scss';

class UserShortInfo extends Component {
    renderUser() {
        const view = this;
        const {props, state} = view;

        return <div className={style.main_block}>
            <div className={style.user_avatar}>
                <div className={style.user_avatar_image}
                    style={{backgroundImage: 'url(' + 'http://via.placeholder.com/136x136' + ')'}}/>
                <div className={style.user_avatar__edit_button}/>
            </div>
            <h4 className={style.user_avatar__name}>Антон Чехов</h4>
            <h3 className={style.user_avatar__email}>long.user.email@the.best.email.com</h3>
            <div className={style.user_avatar__logout_button}>
                Выход<span className={style.user_avatar__logout_icon}/>
            </div>

            <div className={style.extra_info_wrapper}>
                <div className={style.extra_info_block}>
                    <p className={style.extra_info_value}>12</p>
                    <p className={style.extra_info_key}>Бонусы</p>
                </div>
                <div className={style.extra_info_block + ' hidden'}>
                    <p className={style.extra_info_value}>00</p>
                    <p className={style.extra_info_key}>Предстоящие</p>
                </div>
                <div className={style.extra_info_block}>
                    <p className={style.extra_info_value}>02</p>
                    <p className={style.extra_info_key}>Завершённые</p>
                </div>
            </div>
        </div>;
    }

    renderUserClub() {
        const view = this;
        const {props, state} = view;

        return <div className={style.main_block}>
            <div className={style.user_avatar}>
                <div className={style.user_avatar_image}
                    style={{backgroundImage: 'url(' + 'http://via.placeholder.com/136x136' + ')'}}/>
                <div className={style.user_avatar__edit_button}/>
            </div>
            <h4 className={style.user_avatar__name}>Супер пупер клуб</h4>
            <div className="ta-center">
                <h3
                    onClick={() => props.openPopupChangePassword()}
                    className={style.user_avatar__change_password}>Сменить пароль</h3>
            </div>
            <div className={style.user_avatar__logout_button}>
                Выход<span className={style.user_avatar__logout_icon}/>
            </div>

            <div className={style.extra_info_wrapper}>
                <div className={style.extra_info_block}>
                    <p className={style.extra_info_value}>12</p>
                    <p className={style.extra_info_key}>Новые</p>
                </div>
                <div className={style.extra_info_block}>
                    <p className={style.extra_info_value}>00</p>
                    <p className={style.extra_info_key}>Подтвержденные</p>
                </div>
                <div className={style.extra_info_block}>
                    <p className={style.extra_info_value}>02</p>
                    <p className={style.extra_info_key}>Отклоненные</p>
                </div>
            </div>
        </div>;
    }

    render() {
        const view = this;
        const {props, state} = view;

        // return view.renderUser();
        return view.renderUserClub();
    }
}

export default connect(
    state => ({
        app: state.app,
        auth: state.auth
    }),
    {
        openPopupChangePassword: authAction.openPopupChangePassword
    }
)(UserShortInfo);

