import React, {Component} from 'react';
import Dialog from './../../util/dialog';
import style from './style.m.scss';
import {connect} from 'react-redux';
import * as authAction from '../action';
import {withRouter} from 'react-router-dom';
import cnx from '../../../helper/cnx';
import {store} from '../../../index';
import {ErrorLabel} from './register';

const authConst = require('./../const');
const globalAppConst = require('./../../../app-const');

class ChangePassword extends Component {
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

    changePassword() { // eslint-disable-line complexity, max-statements
        const view = this;
        const {state, props, refs} = view;
        const isValidForm = view.validateForm();

        if (!isValidForm) {
            console.log('is not valid form');
            return;
        }

        const {login} = props.auth;
        const {user} = login.data;

        const newUserData = {};

        // if (refs.name.value.trim() !== user.first_name.trim()) {
        Object.assign(newUserData, {first_name: user.first_name}); // eslint-disable-line id-match, camelcase
        // }

        // if (refs.family.value.trim() !== user.last_name.trim()) {
        Object.assign(newUserData, {last_name: user.last_name || user.first_name}); // eslint-disable-line id-match, camelcase
        // }

        // phone is not required field
        Object.assign(newUserData, {phone: user.phone || '0000000000'}); // eslint-disable-line id-match, camelcase

        /*
                if (refs.phone.value.trim() !== '') {
                    Object.assign(
                        newUserData,
                        {phone: (globalAppConst.phone.by.prefix + view.refs.phone.value).replace(/\D/g, '')});
                }
        */

        // if (refs.email.value.trim() !== user.email.trim()) {
        Object.assign(newUserData, {email: user.email});
        // }

        // if (state.extraData.dob !== null) {
        const dobData = user.birthday.split('-');
        const dobYear = parseInt(dobData[0], 10);
        const dobMounth = parseInt(dobData[1], 10);
        const dobDay = parseInt(dobData[2], 10);

        Object.assign(
            newUserData,
            {
                birthday: [
                    dobYear < 1950 ? 1950 : dobYear,
                    (dobMounth < 10 ? '0' : '') + dobMounth,
                    (dobDay < 10 ? '0' : '') + dobDay
                ].join('-')
            }
        );

        /*
                const selectedSex = refs.sex_1.refs.input.checked ? 1 : 0; // eslint-disable-line id-match, camelcase
        */

        Object.assign(newUserData, {sex: user.sex});

        // if (user.sex !== selectedSex) {
        /*
                Object.assign(newUserData, {sex: selectedSex});
        */
        // }


        /*
                const promo = refs.mailingPromotion.refs.input.checked ? 1 : 0;
        */

        Object.assign(newUserData, {mailing_promotion: user.mailing_promotion}); // eslint-disable-line id-match, camelcase

        // if (user.mailing_promotion !== promo) {
        /*
                Object.assign(newUserData, {mailing_promotion: promo}); // eslint-disable-line id-match, camelcase
        */
        // }

        /*
                const blog = refs.mailingBlog.refs.input.checked ? 1 : 0;
        */
        Object.assign(newUserData, {mailing_blog: user.mailing_blog}); // eslint-disable-line id-match, camelcase

        // if (user.mailing_blog !== blog) {
        /*
                Object.assign(newUserData, {mailing_blog: blog}); // eslint-disable-line id-match, camelcase
        */
        // }

        /*
                if (refs.password.value.trim() !== '') {
        */
        Object.assign(newUserData, {
            password: refs.password.value.trim(),
            password_confirmation: refs.password.value.trim() // eslint-disable-line id-match, camelcase
        });

        /*
                }
        */

        props.updateProfile(newUserData)
            .then(({type, payload}) => {
                if (payload.userProfile.code === 200) {
                    // authApi.setUserData({email: newUserData.email});

                    /*
                                        if (newUserData.password !== '') {
                                            authApi.setUserData({password: newUserData.password});
                                        }
                    */

                    const newLoginData = JSON.parse(JSON.stringify(props.auth.login));

                    Object.assign(newLoginData.data.user, payload.userProfile.data);

                    store.dispatch({type: authConst.type.login, payload: {login: newLoginData}});

                    // refs.password.value = '';
                    // refs.confirmPassword.value = '';

                    view.setState({error: null});

                    view.props.closePopup();
                    return;
                }

                const {data} = payload.userProfile;

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
                <h3 className={style.popup__header}>Сменить пароль</h3>
                {/*
                <p className={style.popup__p}>
                    <span onClick={() => view.props.openPopupRegister()} className={style.popup__enter_link}>
                        Зарегистрируйтесь
                    </span>
                </p>
*/}
                <form className={style.popup__form}>
                    <label className={style.text_label}>
                        <input
                            ref="password"
                            onBlur={() => {
                                view.onBlurValidatePassword();
                                view.onBlurValidateConfirmPassword();
                            }}
                            onInput={() => view.onBlurValidatePassword()}
                            {...cnx(style.popup__form_text_input,
                                {[style.popup__form_text_input__invalid]: !state.form.input.password.isValid})}
                            type="password" placeholder="Новый пароль"/>
                        <ErrorLabel propName="password" form={state.form}/>
                    </label>
                    <label className={style.text_label}>
                        <input
                            ref="confirmPassword"
                            onBlur={() => view.onBlurValidateConfirmPassword()}
                            onInput={() => view.onBlurValidateConfirmPassword()}
                            {...cnx(style.popup__form_text_input,
                                {[style.popup__form_text_input__invalid]: !state.form.input.confirmPassword.isValid})}
                            type="password" placeholder="Повторите пароль"/>
                        <ErrorLabel propName="confirmPassword" form={state.form}/>
                    </label>
                </form>
                {state.error && <p className={style.popup__error_p}>{state.error}</p>}
                <div onClick={() => view.changePassword()} className={style.popup__button}>Сменить пароль</div>
            </div>
        </Dialog>;
    }
}

export default withRouter(connect(
    state => ({
        app: state.app,
        auth: state.auth
    }),
    {
        updateProfile: authAction.updateProfile,
        getSessionState: authAction.getSessionState,
        login: authAction.login,
        closePopup: authAction.closePopup
    }
)(ChangePassword));
