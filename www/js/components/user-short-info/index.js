import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {resolveImagePath} from './../../helper/path-x';
import * as authAction from './../auth/action';
const authConst = require('./../auth/const.json');
const defaultUserAvatar = require('./../../../style/i/club/no-avatar.png');

import style from './style.m.scss';

class UserShortInfo extends Component {
    renderUser() {
        const view = this;
        const {props, state} = view;
        const {auth} = props;
        const {login} = auth;
        const {user} = login.data;

        const imagePath = user.image ? resolveImagePath(user.image) : defaultUserAvatar;

        return <div className={style.main_block}>
            <div className={style.user_avatar}>
                <div className={style.user_avatar_image}
                    style={{backgroundImage: 'url(' + imagePath + ')'}}/>
                <div className={style.user_avatar__edit_button}/>
            </div>
            <h4 className={style.user_avatar__name}>{user.first_name || ''} {user.last_name || ''}</h4>
            <h3 className={style.user_avatar__email}>{user.email || ''}</h3>
            <div
                onClick={() => props.logout()}
                className={style.user_avatar__logout_button}>
                Выход<span className={style.user_avatar__logout_icon}/>
            </div>

            <div className={style.extra_info_wrapper}>
                <div className={style.extra_info_block}>
                    <p className={style.extra_info_value}>00</p>
                    <p className={style.extra_info_key}>Бонусы</p>
                </div>
                {/*
                <div className={style.extra_info_block + ' hidden'}>
                    <p className={style.extra_info_value}>00</p>
                    <p className={style.extra_info_key}>Предстоящие</p>
                </div>
*/}
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
        const {auth} = props;
        const {login} = auth;
        const {user} = login.data;

        const imagePath = user.image ? resolveImagePath(user.image) : defaultUserAvatar;

        return <div className={style.main_block}>
            <div className={style.user_avatar}>
                <div className={style.user_avatar_image}
                    style={{backgroundImage: 'url(' + imagePath + ')'}}/>
                <div className={style.user_avatar__edit_button}/>
            </div>
            <h4 className={style.user_avatar__name}>{user.first_name || ''} {user.last_name || ''}</h4>
            <div className="ta-center">
                <h3
                    onClick={() => props.openPopupChangePassword()}
                    className={style.user_avatar__change_password}>Сменить пароль</h3>
            </div>
            <div
                onClick={() => props.logout()}
                className={style.user_avatar__logout_button}>
                Выход<span className={style.user_avatar__logout_icon}/>
            </div>

            <div className={style.extra_info_wrapper}>
                <div className={style.extra_info_block}>
                    <p className={style.extra_info_value}>00</p>
                    <p className={style.extra_info_key}>Новые</p>
                </div>
                <div className={style.extra_info_block}>
                    <p className={style.extra_info_value}>00</p>
                    <p className={style.extra_info_key}>Подтвержденные</p>
                </div>
                <div className={style.extra_info_block}>
                    <p className={style.extra_info_value}>00</p>
                    <p className={style.extra_info_key}>Отклоненные</p>
                </div>
            </div>
        </div>;
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {auth} = props;
        const {login} = auth;

        if (login.code !== 200) {
            return null;
        }

        if (login.data.user.role === authConst.userType.user) {
            return view.renderUser();
        }

        if (login.data.user.role === authConst.userType.fitnessClub) {
            return view.renderUserClub();
        }

        return <h1>unsupported user type</h1>;
    }
}

export default connect(
    state => ({
        app: state.app,
        auth: state.auth
    }),
    {
        openPopupChangePassword: authAction.openPopupChangePassword,
        logout: authAction.logout
    }
)(UserShortInfo);

