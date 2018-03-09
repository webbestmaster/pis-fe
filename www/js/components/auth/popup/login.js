/* global window, fetch, IS_PRODUCTION */
import React, {Component} from 'react';
import Dialog from './../../util/dialog';
import style from './style.m.scss';
import {connect} from 'react-redux';
import * as authAction from '../action';
import {withRouter} from 'react-router-dom';
// import * as authApi from './../api';
// import FacebookLogin from 'react-facebook-login';
// import VkLogin from './../../vk-login';

const authConst = require('./../const');
const globalAppConst = require('./../../../app-const');

const fakeResponse = {
    sig: 'a451d3209745dbf211bcecaf81345970a6d768a1',
    code: 200,
    data: {
        links: {
            vk: 'https://oauth.vk.com/authorize?client_id=6400831&' + // eslint-disable-line id-length
            'display=popup&redirect_uri=http%3A%2F%2Fsite.katran.by%2Fapi%2Foauth%2Fredirect%3Fprovider%3Dvk&' +
            'scope=email&response_type=code&v=5.73',
            facebook: 'https://www.facebook.com/v2.12/dialog/oauth?client_id=151915955476021&' +
            'redirect_uri=http%3A%2F%2Fsite.katran.by%2Fapi%2Foauth%2Fredirect%3Fprovider%3Dfacebook&' +
            'state={public_profile,email,user_birthday}&response_type=code&display=popup'
        }
    }
};

class Login extends Component {
    constructor() {
        super();

        const view = this;

        view.state = {
            error: null,
            links: null
        };
    }

    componentDidMount() {
        const view = this;

        if (IS_PRODUCTION) { // eslint-disable-line id-match
            fetch(authConst.url.socialLoginLinks,
                {credentials: 'include', method: 'GET'})
                .then(rawResponse => rawResponse.json())
                .then(response => {
                    view.setState({links: response.data.links});
                });
        } else {
            fetch(authConst.url.socialLoginLinks,
                {credentials: 'include', method: 'GET'})
                .then(response => {
                    view.setState({links: fakeResponse.data.links});
                });
        }
    }

    login() {
        const view = this;
        const {props, state} = view;

        const email = view.refs.email.value;
        const password = view.refs.password.value;

        props.login(email, password)
            .then(loginResult => view.afterLoginCallback(loginResult));
    }

    renderFacebook() {
        const view = this;
        const {props, state} = view;

        return <div
            onClick={() => {
                const newWindow = window.open(state.links.facebook, '_blank');

                if (typeof window.focus === 'function') {
                    newWindow.focus();
                }
            }}
            className={style.social_button + ' ' + style.social_button__facebook}>
            {/*
            <FacebookLogin
                tag="span"
                textButton="Login with Facebook"
                cssClass={style.social_button__facebook_content}
                language="ru_RU"
                appId={globalAppConst.key.facebook}
                autoLoad={false}
                fields="email,picture,gender,first_name,last_name,birthday,id"
                onClick={evt => {
                    console.log(evt);
                }}
                callback={responseFacebook => {
                    if (responseFacebook.hasOwnProperty('error')) {
                        // add a "phone" into the "fields" to create a OAuthException
                        console.warn(responseFacebook);
                        return;
                    }

                    view.props.loginFacebook(responseFacebook)
                        .then(loginResult => view.afterLoginCallback(loginResult));
                }}/>
*/}
        </div>;
    }

    renderVk() {
        const view = this;
        const {props, state} = view;

        return <div
            onClick={() => {
                const newWindow = window.open(state.links.vk, '_blank');

                if (typeof window.focus === 'function') {
                    newWindow.focus();
                }
            }}
            className={style.social_button + ' ' + style.social_button__vk}>
            {/*
            <VkLogin
                cssClass={style.social_button__vk_content}
                apiId={globalAppConst.key.vKontakte}
                fields="photo_400_orig,sex,bdate"
                redirectUri={globalAppConst.pageDataUrl.host}
                callback={responseVk => {
                    if (!responseVk.hasOwnProperty('id')) {
                        console.warn('not login');
                        return;
                    }

                    view.props.loginVk(responseVk)
                        .then(loginResult => view.afterLoginCallback(loginResult));
                }}
            />
*/}
        </div>;
    }

    afterLoginCallback({type, payload}) {
        const view = this;
        const {props, state} = view;

        if (payload.login.code === 200) {
            // authApi.setUserData({email, password});

            if (payload.login.data.user.role === authConst.userType.fitnessClub) {
                props.getClubHomeData();
            }

            props.closePopup();
            props.history.push('/user');
            return;
        }

        const {data} = payload.login;

        if (data instanceof Array) {
            view.setState({error: data[0]});
            return;
        }

        const errorKey = Object.keys(data)[0];

        view.setState({error: data[errorKey][0]});
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
                    {view.renderVk()}
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
        login: authAction.login
        // loginFacebook: authAction.loginFacebook,
        // loginVk: authAction.loginVk
    }
)(Login));
