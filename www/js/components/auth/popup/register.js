import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import cnx from './../../../helper/cnx';
// import {connect} from 'react-redux';
// import classnames from 'classnames';
// const appConst = require('./../../../app-const.json');
// const headerMaxHeight = 980;
//
import Dialog from './../../util/dialog';
import style from './style.m.scss';
import CheckboxLabel from './../../util/checkbox';
import {connect} from 'react-redux';
import * as authAction from '../action';
import {withRouter} from 'react-router-dom';
import * as authApi from './../api';

class Register extends Component {
    constructor() {
        super();

        const view = this;

        view.state = {
            error: null,
            subscription: {
                promo: false,
                blog: false
            },
            form: {
                input: {
                    name: {
                        isValid: true,
                        error: {
                            message: ''
                        }
                    },
                    family: {
                        isValid: true,
                        error: {
                            message: ''
                        }
                    },
                    phone: {
                        isValid: true,
                        error: {
                            message: ''
                        }
                    },
                    email: {
                        isValid: true,
                        error: {
                            message: ''
                        }
                    },
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
                    },
                    terms: {
                        isValid: true,
                        error: {
                            message: ''
                        }
                    }
                }
            }
        };
    }

    onBlurValidateName() {
        const view = this;
        const name = view.refs.name;
        const value = name.value.trim();

        view.setState(prevState => {
            Object.assign(prevState.form.input.name, {isValid: true});

            return prevState;
        });

        if (value === '') {
            view.setState(prevState => {
                Object.assign(prevState.form.input.name,
                    {isValid: false, error: {message: 'Это поле обязательно к заполнению.'}}
                );

                return prevState;
            });

            return false;
        }

        if (value.length < 3) {
            view.setState(prevState => {
                Object.assign(prevState.form.input.name,
                    {isValid: false, error: {message: 'Минимум 3 символа.'}}
                );

                return prevState;
            });
            return false;
        }

        return true;
    }

    onBlurValidateFamily() {
        const view = this;
        const family = view.refs.family;
        const value = family.value.trim();

        view.setState(prevState => {
            Object.assign(prevState.form.input.family, {isValid: true});

            return prevState;
        });

        if (value === '') {
            view.setState(prevState => {
                Object.assign(prevState.form.input.family,
                    {isValid: false, error: {message: 'Это поле обязательно к заполнению.'}}
                );

                return prevState;
            });
            return false;
        }

        if (value.length < 3) {
            view.setState(prevState => {
                Object.assign(prevState.form.input.family,
                    {isValid: false, error: {message: 'Минимум 3 символа.'}}
                );

                return prevState;
            });
            return false;
        }

        return true;
    }

    onBlurValidatePhone() {
        const view = this;
        const phone = view.refs.phone;
        const value = phone.value.trim();

        view.setState(prevState => {
            Object.assign(prevState.form.input.phone, {isValid: true});

            return prevState;
        });

        if (value === '') {
            return true;
        }

        /*
                if (value === '') {
                    view.setState(prevState => {
                        Object.assign(prevState.form.input.phone,
                            {isValid: false, error: {message: 'Это поле обязательно к заполнению.'}}
                        );

                        return prevState;
                    });
                    return false;
                }
        */

        if ((value.match(/\d/g) || []).length < 9) {
            view.setState(prevState => {
                Object.assign(prevState.form.input.phone,
                    {isValid: false, error: {message: 'Введите правильный номер телефона.'}}
                );

                return prevState;
            });
            return false;
        }

        return true;
    }

    onBlurValidateEmail() {
        const view = this;
        const email = view.refs.email;
        const value = email.value.trim();

        view.setState(prevState => {
            Object.assign(prevState.form.input.email, {isValid: true});

            return prevState;
        });

        if (value === '') {
            view.setState(prevState => {
                Object.assign(prevState.form.input.email,
                    {isValid: false, error: {message: 'Это поле обязательно к заполнению.'}}
                );

                return prevState;
            });
            return false;
        }

        if (!/\S+@\S+\.\S+/.test(value)) {
            view.setState(prevState => {
                Object.assign(prevState.form.input.email,
                    {isValid: false, error: {message: 'Введите правильный электронный адрес.'}}
                );

                return prevState;
            });
            return false;
        }

        return true;
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

    onChangeValidateTerms() {
        const view = this;
        const terms = view.refs.terms;
        const isChecked = terms.checked;

        view.setState(prevState => {
            Object.assign(prevState.form.input.terms, {isValid: true});

            return prevState;
        });

        if (!isChecked) {
            view.setState(prevState => {
                Object.assign(prevState.form.input.terms,
                    {
                        isValid: false,
                        error: {message: 'Чтобы зарегистрироваться нужно принять условия пользовательского соглашения.'}
                    }
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
            view.onBlurValidateName(),
            view.onBlurValidateFamily(),
            view.onBlurValidatePhone(),
            view.onBlurValidateEmail(),
            view.onBlurValidatePassword(),
            view.onBlurValidateConfirmPassword(),
            view.onChangeValidateTerms()
        ].every(validation => validation);
    }

    register() {
        const view = this;
        const {state, props} = view;
        const isValidForm = view.validateForm();

        if (!isValidForm) {
            console.log('is not valid form');
            return;
        }

        const formData = {
            subscription: {
                promo: state.subscription.promo ? 1 : 0,
                blog: state.subscription.blog ? 1 : 0
            },
            name: view.refs.name.value.trim(),
            family: view.refs.family.value.trim(),
            phone: view.refs.phone.value.trim(),
            email: view.refs.email.value.trim(),
            password: view.refs.password.value,
            password_confirmation: view.refs.confirmPassword.value // eslint-disable-line camelcase, id-match
        };

        props
            .registration(Object.assign(
                {
                    first_name: formData.name, // eslint-disable-line camelcase, id-match
                    last_name: formData.family, // eslint-disable-line camelcase, id-match
                    // phone: formData.phone,
                    email: formData.email,
                    password: formData.password,
                    password_confirmation: formData.password_confirmation, // eslint-disable-line camelcase, id-match,
                    mailing_promotion: formData.subscription.promo, // eslint-disable-line camelcase, id-match
                    mailing_blog: formData.subscription.blog // eslint-disable-line camelcase, id-match
                },
                formData.phone ? {phone: formData.phone} : null // phone is not required field
            ))
            .then(({type, payload}) => {
                if (payload.registration.code === 200) {
                    view.props.closePopup();

                    authApi.setUserData({
                        email: formData.email,
                        password: formData.password
                    });

                    view.props
                        .login(formData.email, formData.password)
                        .then(() => view.props.history.push('/user'));
                    return;
                }

                const {data} = payload.registration;

                if (data instanceof Array) {
                    view.setState({error: data[0]});
                    return;
                }

                const errorKey = Object.keys(data)[0];

                view.setState({error: data[errorKey][0]});
            });

        console.log(formData);
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
            <div className={style.popup__paper} style={{width: 770, paddingTop: 20, paddingBottom: 20}}>
                <div onClick={() => view.props.closePopup()} className={style.close_button}/>
                <h3 className={style.popup__header}>Регистрация</h3>
                <p className={style.popup__p}>Вы уже зарегистрированы?&nbsp;
                <span onClick={() => view.props.openPopupLogin()} className={style.popup__enter_link}>Войти</span>
                </p>
                <form className={style.popup__form}>
                    <label className={style.text_label}>
                        <input
                            ref="name"
                            onBlur={() => view.onBlurValidateName()}
                            onInput={() => view.onBlurValidateName()}
                            {...cnx(style.popup__form_text_input,
                                {[style.popup__form_text_input__invalid]: !state.form.input.name.isValid})}
                            type="text" placeholder="Имя"/>
                        <ErrorLabel propName="name" form={state.form}/>
                    </label>
                    <label className={style.text_label}>
                        <input
                            ref="family"
                            onBlur={() => view.onBlurValidateFamily()}
                            onInput={() => view.onBlurValidateFamily()}
                            {...cnx(style.popup__form_text_input,
                                {[style.popup__form_text_input__invalid]: !state.form.input.family.isValid})}
                            type="text" placeholder="Фамилия"/>
                        <ErrorLabel propName="family" form={state.form}/>
                    </label>
                    <label className={style.text_label}>
                        <input
                            ref="phone"
                            onBlur={() => view.onBlurValidatePhone()}
                            onInput={() => view.onBlurValidatePhone()}
                            {...cnx(style.popup__form_text_input,
                                {[style.popup__form_text_input__invalid]: !state.form.input.phone.isValid})}
                            type="tel" placeholder="+375 (__) ___-__-__"/>
                        <ErrorLabel propName="phone" form={state.form}/>
                    </label>
                    <label className={style.text_label}>
                        <input
                            ref="email"
                            onBlur={() => view.onBlurValidateEmail()}
                            onInput={() => view.onBlurValidateEmail()}
                            {...cnx(style.popup__form_text_input,
                                {[style.popup__form_text_input__invalid]: !state.form.input.email.isValid})}
                            type="email" placeholder="Email"/>
                        <ErrorLabel propName="email" form={state.form}/>
                    </label>
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
                            type="password" placeholder="Пароль"/>
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
                <div className={style.popup__subscription + ' clear-self'}>
                    <h3 className={style.popup__subscription_header}>
                        Подписывайтесь на наши рассылки и получайте уникальные предложения и подарки
                    </h3>
                    <CheckboxLabel ref="promo" input={{
                        ref: 'checkbox',
                        defaultChecked: state.subscription.promo,
                        onChange: () => view.setState(prevState => {
                            Object.assign(prevState.subscription, {promo: view.refs.promo.refs.checkbox.checked});

                            return prevState;
                        })
                    }}>Скидки и акции</CheckboxLabel>
                    <CheckboxLabel ref="blog" input={{
                        ref: 'checkbox',
                        defaultChecked: state.subscription.blog,
                        onChange: () => view.setState(prevState => {
                            Object.assign(prevState.subscription, {blog: view.refs.blog.refs.checkbox.checked});

                            return prevState;
                        })
                    }}>Фитнес-блог</CheckboxLabel>
                </div>

                <label {...cnx('section__checkbox', style.popup__terms_p)}>
                    <input
                        ref="terms"
                        onChange={() => view.onChangeValidateTerms()}
                        {...cnx('section__checkbox-node')}
                        type="checkbox"/>
                    <span className="section__checkbox-state"/>
                    Принять условия
                    <Link to="/terms/" target="_blank" className={style.popup__enter_link}>
                        пользовательского соглашения
                    </Link>
                    {state.form.input.terms.isValid ?
                        null :
                        <span className="section__checkbox-error-message">{state.form.input.terms.error.message}</span>}
                </label>

                {state.error && <p className={style.popup__error_p}>{state.error}</p>}

                <div onClick={() => view.register()} {...cnx(style.popup__button)} style={{marginBottom: 0}}>
                    Регистрация
                </div>
            </div>
        </Dialog>;
    }
}

export default withRouter(connect(
    state => ({
        // auth: state.auth
    }),
    {
        closePopup: authAction.closePopup,
        openPopupLogin: authAction.openPopupLogin,
        registration: authAction.registration,
        login: authAction.login

        // openPopupRestore: authAction.openPopupRestore,
        // openPopupRestore: authAction.openPopupRestore,
        // login: authAction.login
    }
)(Register));

class ErrorLabel extends Component {
    render() {
        const view = this;
        const {props, state} = view;
        const {propName, form} = props;

        if (form.input[propName].isValid) {
            return null;
        }

        return <span className={style.input_error_text}>{form.input[propName].error.message}</span>;
    }
}
