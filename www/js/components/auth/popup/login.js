import React, {Component} from 'react';
import Dialog from './../../util/dialog';
import style from './style.m.scss';
import {connect} from 'react-redux';
import * as authAction from '../action';
import {withRouter} from 'react-router-dom';
import * as authApi from './../api';
import FacebookLogin from 'react-facebook-login';

const authConst = require('./../const');
const globalAppConst = require('./../../../app-const');

class Login extends Component {
    constructor() {
        super();

        const view = this;

        view.state = {
            error: null
        };
    }

    login() {
        const view = this;
        const {props, state} = view;

        const email = view.refs.email.value;
        const password = view.refs.password.value;

        props.login(email, password).then(({type, payload}) => {
            if (payload.login.code === 200) {
                authApi.setUserData({email, password});

                if (payload.login.data.user.role === authConst.userType.fitnessClub) {
                    props.getClubHomeData();
                }

                props.closePopup();
                return;
            }

            const {data} = payload.login;

            if (data instanceof Array) {
                view.setState({error: data[0]});
                return;
            }

            const errorKey = Object.keys(data)[0];

            view.setState({error: data[errorKey][0]});
        });
    }

    loginFacebook(responseFacebook) {
        const view = this;
        const {props} = view;

        props.loginFacebook(responseFacebook).then(({type, payload}) => {
            if (payload.login.code === 200) {
                if (payload.login.data.user.role === authConst.userType.fitnessClub) {
                    props.getClubHomeData();
                }

                props.closePopup();
                return;
            }

            const {data} = payload.login;

            if (data instanceof Array) {
                view.setState({error: data[0]});
                return;
            }

            const errorKey = Object.keys(data)[0];

            view.setState({error: data[errorKey][0]});
        });
    }

    renderFacebook() {
        const view = this;

        return <div className={style.social_button + ' ' + style.social_button__facebook}>
            <FacebookLogin
                tag="span"
                textButton="Login with Facebook"
                cssClass={style.social_button__facebook_content}
                language="ru_RU"
                appId={globalAppConst.key.facebook}
                autoLoad={false}
                fields="email,picture,gender,first_name,last_name,id,birthday"
                onClick={evt => {
                    console.log(evt);
                }}
                callback={responseFacebook => {
                    if (responseFacebook.hasOwnProperty('error')) {
                        // add a "phone" into the "fields" to create a OAuthException
                        console.warn(responseFacebook);
                        return;
                    }

                    view.loginFacebook(responseFacebook);
                }}/>
        </div>;
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {app} = props;

        return <Dialog {...props.dialog} onExit={() => {
            view.setState({error: null});
            if (props.dialog.onExit) {
                props.dialog.onExit();
            }
        }}>
            <div
                className={style.popup__paper}
                style={app.screen.width <= globalAppConst.tabletWidth ? {maxWidth: 570} : {width: 570}}>
                <div onClick={() => view.props.closePopup()} className={style.close_button}/>
                <h3 className={style.popup__header}>Войти с помощью</h3>

                <div
                    className={style.social_button_list_wrapper + ' clear-self'}>
                    {view.renderFacebook()}
                </div>

                <h3 className={style.popup__header}>Войти как пользователь</h3>
                <p className={style.popup__p}>Вы еще не зарегистрированы у нас?&nbsp;&nbsp;
                <span
                    onClick={() => view.props.openPopupRegister()}
                    className={style.popup__enter_link}>
                        Зарегистрируйтесь
                </span>
                </p>
                <form className={style.popup__form}>
                    <input
                        ref="email"
                        className={style.popup__form_text_input_wide} type="email" placeholder="Email"/>
                    <input
                        ref="password"
                        className={style.popup__form_text_input_wide} type="password" placeholder="Пароль"/>
                </form>
                {state.error && <p className={style.popup__error_p}>{state.error}</p>}
                <div onClick={() => view.login()} className={style.popup__button}>Войти</div>
                <span onClick={() => view.props.openPopupRestore()} className={style.popup__enter_link}>
                    Забыли пароль?
                </span>
            </div>
        </Dialog>;
    }
}

export default withRouter(connect(
    state => ({
        app: state.app
    }),
    {
        closePopup: authAction.closePopup,
        openPopupRegister: authAction.openPopupRegister,
        openPopupRestore: authAction.openPopupRestore,
        getClubHomeData: authAction.getClubHomeData,
        login: authAction.login,
        loginFacebook: authAction.loginFacebook
    }
)(Login));
