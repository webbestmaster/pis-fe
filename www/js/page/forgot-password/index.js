/* global window */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import HeaderSimple from './../../components/header-simple';
import TopBigBanner from './../../components/top-big-banner';
import BreadCrumbs from './../../components/bread-crumbs';
import Footer from './../../components/footer';
import * as authAction from '../../components/auth/action';

const queryString = require('query-string');
const topBanner = require('./../../../style/images/club/top-banner.jpg');

import style from './../../components/auth/popup/style.m.scss';
import cnx from '../../helper/cnx';
import {metaTagMaster} from '../../module/meta-tag';


class ForgotPassword extends Component {
    componentDidMount() {
        metaTagMaster.updateByUrl('/forgot-password');
    }

    constructor() {
        super();

        const view = this;

        view.state = {
            error: null,
            form: {
                input: {
                    password: {
                        isValid: true,
                        error: {
                            message: ''
                        }
                    },
                    confirmPassword: {
                        isValid: true,
                        error: {
                            message: ''
                        }
                    }
                }
            }
        };
    }

    onBlurValidatePassword() {
        const view = this;
        const password = view.refs.password;
        const value = password.value.trim();

        view.setState(prevState => {
            Object.assign(prevState.form.input.password, {isValid: true});

            return prevState;
        });

        if (value === '') {
            view.setState(prevState => {
                Object.assign(prevState.form.input.password,
                    {isValid: false, error: {message: 'Это поле обязательно к заполнению.'}}
                );

                return prevState;
            });
            return false;
        }

        if (value.length < 6) {
            view.setState(prevState => {
                Object.assign(prevState.form.input.password,
                    {isValid: false, error: {message: 'Минимум 6 символов.'}}
                );

                return prevState;
            });
            return false;
        }

        return true;
    }

    onBlurValidateConfirmPassword() {
        const view = this;
        const confirmPassword = view.refs.confirmPassword;
        const value = confirmPassword.value;
        const password = view.refs.password.value;

        view.setState(prevState => {
            Object.assign(prevState.form.input.confirmPassword, {isValid: true});

            return prevState;
        });

        if (value === '') {
            view.setState(prevState => {
                Object.assign(prevState.form.input.confirmPassword,
                    {isValid: false, error: {message: 'Это поле обязательно к заполнению.'}}
                );

                return prevState;
            });
            return false;
        }

        if (value.length < 6) {
            view.setState(prevState => {
                Object.assign(prevState.form.input.confirmPassword,
                    {isValid: false, error: {message: 'Минимум 6 символов.'}}
                );

                return prevState;
            });
            return false;
        }

        if (password !== value) {
            view.setState(prevState => {
                Object.assign(prevState.form.input.confirmPassword,
                    {isValid: false, error: {message: 'Должен совпадать с паролем.'}}
                );

                return prevState;
            });
            return false;
        }

        return true;
    }

    validateForm() {
        const view = this;

        return [
            view.onBlurValidatePassword(),
            view.onBlurValidateConfirmPassword()
        ].every(validation => validation);
    }

    resetPassword() {
        const view = this;
        const {state, props} = view;
        const isValidForm = view.validateForm();

        if (!isValidForm) {
            console.log('is not valid form');
            return;
        }

        const token = queryString.parse((window.location.search + window.location.href).replace(/[\S\s]+?\?/, ''))
            .token || '';

        props
            .resetPassword(
                token,
                view.refs.password.value
            )
            .then(({type, payload}) => {
                if (payload.resetPassword.code === 200) {
                    // view.props.closePopup();

                    view.props.history.push('/user');
                    return;
                }

                const {data} = payload.resetPassword;

                if (data instanceof Array) {
                    view.setState({error: data[0]});
                    return;
                }

                const errorKey = Object.keys(data)[0];

                view.setState({error: data[errorKey][0]});
            });
    }

    render() {
        const view = this;
        const {props, state} = view;

        return <div>
            <HeaderSimple/>

            <TopBigBanner backgroundImage={topBanner}>
                <BreadCrumbs>
                    <Link to="/">Главная</Link>
                    <Link to="/forgotPassword">Сброс пароля</Link>
                </BreadCrumbs>
                <h3 className="section__header section__header--club">Сброс пароля</h3>
            </TopBigBanner>

            <section className="section">
                <h3 className='section__header'>Сброс пароля</h3>

                <div style={{width: 462, margin: '0 auto 120px'}}>
                    <form className={style.popup__form}>
                        <input
                            ref="password"
                            onBlur={() => {
                                view.onBlurValidatePassword();
                                view.onBlurValidateConfirmPassword();
                            }}
                            onInput={() => view.onBlurValidatePassword()}
                            {...cnx(style.popup__form_text_input_wide,
                                {[style.popup__form_text_input__invalid]: !state.form.input.password.isValid})}
                            type="password" placeholder="Пароль"/>
                        <input
                            ref="confirmPassword"
                            onBlur={() => view.onBlurValidateConfirmPassword()}
                            onInput={() => view.onBlurValidateConfirmPassword()}
                            {...cnx(style.popup__form_text_input_wide,
                                {[style.popup__form_text_input__invalid]: !state.form.input.confirmPassword.isValid})}
                            type="password" placeholder="Повторите пароль"/>
                    </form>

                    {state.error && <p className={style.popup__error_p}>{state.error}</p>}

                    <div onClick={() => view.resetPassword()} className={style.popup__button}>Сбросить пароль</div>
                </div>

            </section>
            <Footer/>

        </div>;
    }
}

export default withRouter(connect(
    state => ({
        // auth: state.auth
    }),
    {
        // closePopup: authAction.closePopup,
        // openPopupLogin: authAction.openPopupLogin,
        // registration: authAction.registration

        resetPassword: authAction.resetPassword
        // openPopupRestore: authAction.openPopupRestore,
        // login: authAction.login
    }
)(ForgotPassword));
