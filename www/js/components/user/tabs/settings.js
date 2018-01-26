import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {resolveImagePath} from './../../../helper/path-x';
import style from './../style.m.scss';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import RadioLabel from './../../util/radio';
import CheckboxLabel from './../../util/checkbox';
import cnx from './../../../helper/cnx';
import * as authAction from './../../auth/action';
import * as authApi from '../../auth/api';
import {store} from '../../../index';
const authConst = require('./../../auth/const.json');
const globalAppConst = require('./../../../app-const.json');

class Settings extends Component {
    constructor() {
        super();

        const view = this;

        view.state = {
            extraData: {
                dob: null
            },
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
                    dob: {
                        isValid: true,
                        error: {
                            message: ''
                        }
                    },
                    sex: {
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
        const confirmPassword = view.refs.confirmPassword.value;

        view.setState(prevState => {
            Object.assign(prevState.form.input.password, {isValid: true});

            return prevState;
        });

        if (value === '' && confirmPassword === '') {
            return true;
        }

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

    onBlurValidateNewPassword() { // eslint-disable-line complexity
        const view = this;
        const password = view.refs.password.value;
        const confirmPassword = view.refs.confirmPassword;
        const value = confirmPassword.value;

        view.setState(prevState => {
            Object.assign(prevState.form.input.confirmPassword, {isValid: true});

            return prevState;
        });

        if (value === '' && password === '') {
            return true;
        }

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
            view.onBlurValidateName(),
            view.onBlurValidateFamily(),
            view.onBlurValidatePhone(),
            view.onBlurValidateEmail(),
            view.onBlurValidatePassword(),
            view.onBlurValidateNewPassword()
        ].every(validation => validation);
    }

    updateUserData() { // eslint-disable-line max-statements, complexity
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
        Object.assign(newUserData, {first_name: refs.name.value.trim()}); // eslint-disable-line id-match, camelcase
        // }

        // if (refs.family.value.trim() !== user.last_name.trim()) {
        Object.assign(newUserData, {last_name: refs.family.value.trim()}); // eslint-disable-line id-match, camelcase
        // }

        // if (refs.phone.value.trim() !== user.phone.trim()) {
        Object.assign(newUserData, {phone: refs.phone.value.trim()});
        // }

        // if (refs.email.value.trim() !== user.email.trim()) {
        Object.assign(newUserData, {email: refs.email.value.trim()});
        // }

        // if (state.extraData.dob !== null) {
        Object.assign(newUserData, {birthday: state.extraData.dob || user.birthday});
        // }

        const selectedSex = refs.sex_1.refs.input.checked ? 1 : 0; // eslint-disable-line id-match, camelcase

        // if (user.sex !== selectedSex) {
        Object.assign(newUserData, {sex: selectedSex});
        // }


        const promo = refs.mailingPromotion.refs.input.checked ? 1 : 0;


        // if (user.mailing_promotion !== promo) {
        Object.assign(newUserData, {mailing_promotion: promo}); // eslint-disable-line id-match, camelcase
        // }

        const blog = refs.mailingBlog.refs.input.checked ? 1 : 0;

        // if (user.mailing_blog !== blog) {
        Object.assign(newUserData, {mailing_blog: blog}); // eslint-disable-line id-match, camelcase
        // }

        if (refs.password.value.trim() !== '') {
            Object.assign(newUserData, {
                password: refs.password.value.trim(),
                password_confirmation: refs.password.value.trim() // eslint-disable-line id-match, camelcase
            });
        }

        props.updateProfile(newUserData)
            .then(({type, payload}) => {
                if (payload.userProfile.code === 200) {
                    authApi.setUserData({email: newUserData.email});

                    if (newUserData.password !== '') {
                        authApi.setUserData({password: newUserData.password});
                    }

                    const newLoginData = JSON.parse(JSON.stringify(props.auth.login));

                    Object.assign(newLoginData.data.user, payload.userProfile.data);

                    store.dispatch({type: authConst.type.login, payload: {login: newLoginData}});

                    refs.password.value = '';
                    refs.confirmPassword.value = '';

                    view.setState({error: null});
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
        const {app, auth} = props;
        const {login} = auth;

        const {user} = login.data;

        return <div className="hug">
            <h3 className="section__header">Редактировать данные</h3>

            <div className={style.settings_form}>
                <label className={style.text_label}>
                    <p className={style.text_label__label}>Имя</p>
                    <input
                        ref="name"
                        onBlur={() => view.onBlurValidateName()}
                        onInput={() => view.onBlurValidateName()}
                        type="text" defaultValue={user.first_name} {...cnx(style.input_text,
                            {[style.input_text__invalid]: !state.form.input.name.isValid}
                        )}/>
                    <ErrorLabel propName="name" form={state.form}/>
                </label>
                <label className={style.text_label}>
                    <p className={style.text_label__label}>Email</p>
                    <input
                        ref="email"
                        onBlur={() => view.onBlurValidateEmail()}
                        onInput={() => view.onBlurValidateEmail()}
                        type="email" defaultValue={user.email} {...cnx(style.input_text,
                            {[style.input_text__invalid]: !state.form.input.email.isValid}
                        )}/>
                    <ErrorLabel propName="email" form={state.form}/>
                </label>
                <label className={style.text_label}>
                    <p className={style.text_label__label}>Фамилия</p>
                    <input
                        ref="family"
                        onBlur={() => view.onBlurValidateFamily()}
                        onInput={() => view.onBlurValidateFamily()}
                        type="text" defaultValue={user.last_name} {...cnx(style.input_text,
                            {[style.input_text__invalid]: !state.form.input.family.isValid}
                        )}/>
                    <ErrorLabel propName="family" form={state.form}/>
                </label>
                <label className={style.text_label}>
                    <p className={style.text_label__label}>Телефон</p>
                    <input
                        ref="phone"
                        onBlur={() => view.onBlurValidatePhone()}
                        onInput={() => view.onBlurValidatePhone()}
                        type="tel" defaultValue={user.phone} {...cnx(style.input_text,
                            {[style.input_text__invalid]: !state.form.input.phone.isValid}
                        )}/>
                    <ErrorLabel propName="phone" form={state.form}/>
                </label>
                <div className={style.text_label + ' ' + style.text_label__wide}>
                    <label className={style.calendar_label}>
                        <p className={style.text_label__label}>Дата рождения</p>
                        <DatePicker
                            locale="ru-RU"
                            startDate={moment(state.extraData.dob || user.birthday)}
                            selected={moment(state.extraData.dob || user.birthday)}
                            dateFormat="DD/MM/YYYY"
                            className={style.calendar_input}
                            onChange={time => view.setState(prevState => {
                                Object.assign(prevState.extraData, {dob: time.format('YYYY-MM-DD')});
                                return prevState;
                            })}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                        />
                    </label>
                    <div className={style.gender_label}>
                        <p className={style.text_label__label}>Пол</p>
                        <RadioLabel
                            ref="sex_1"
                            input={{name: 'gender', ref: 'input', defaultChecked: parseInt(user.sex, 10) === 1}}
                            label={{className: style.gender_label_container}}>
                            Мужской
                        </RadioLabel>
                        <RadioLabel
                            ref="sex_2"
                            input={{name: 'gender', ref: 'input', defaultChecked: parseInt(user.sex, 10) === 0}}
                            label={{className: style.gender_label_container}}>
                            Женский
                        </RadioLabel>
                    </div>
                </div>
            </div>
            <div className={style.settings_form_bottom_line}/>

            <div className={style.settings_form}>
                <div className={style.text_label + ' ' + style.text_label__mobile_wide}>
                    <p className={style.text_label__label}>Коммуникация</p>
                    <CheckboxLabel ref="mailingPromotion"
                        input={{ref: 'input', defaultChecked: parseInt(user.mailing_promotion, 10) === 1}}>Скидки
                        и акции</CheckboxLabel>
                    <CheckboxLabel ref="mailingBlog" input={{
                        ref: 'input',
                        defaultChecked: parseInt(user.mailing_blog, 10) === 1
                    }}>Фитнес-блог</CheckboxLabel>
                </div>
            </div>
            <div className={style.settings_form_bottom_line}/>

            <div {...cnx({hidden: globalAppConst.mobileWidth >= app.screen.width})}>
                <div className={style.settings_form}>
                    <div className={style.text_label + ' ' + style.text_label__wide}>
                        <p className={style.text_label__label}>Смена пароля</p>
                        <div className={style.input_text__from_to}>
                            <input
                                ref="password"
                                onBlur={() => {
                                    view.onBlurValidatePassword();
                                    view.onBlurValidateNewPassword();
                                }}
                                onInput={() => view.onBlurValidatePassword()}
                                type="password" placeholder="Пароль" {...cnx(style.input_text,
                                    {[style.input_text__invalid]: !state.form.input.password.isValid}
                                )}/>
                            <ErrorLabel propName="password" form={state.form}/>
                        </div>
                        <span className={style.from_to_arrow} style={{visibility: 'hidden'}}/>
                        <div className={style.input_text__from_to}>
                            <input
                                ref="confirmPassword"
                                onBlur={() => view.onBlurValidateNewPassword()}
                                onInput={() => view.onBlurValidateNewPassword()}
                                type="password" placeholder="Повторите пароль"
                                {...cnx(style.input_text,
                                    {[style.input_text__invalid]: !state.form.input.confirmPassword.isValid})}
                            />
                            <ErrorLabel propName="confirmPassword" form={state.form}/>
                        </div>
                    </div>
                </div>
                <div className={style.settings_form_bottom_line}/>
            </div>

            {state.error && <p className={style.user_form__error_p}>{state.error}</p>}
            <div onClick={() => view.updateUserData()} className={style.settings_form__submit_button}>Обновить</div>

        </div>;
    }
}

export default connect(
    state => ({
        app: state.app,
        auth: state.auth
    }),
    {
        updateProfile: authAction.updateProfile,
        getSessionState: authAction.getSessionState,
        login: authAction.login
    }
)(Settings);


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
