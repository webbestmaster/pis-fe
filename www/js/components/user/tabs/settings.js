import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {resolveImagePath} from './../../../helper/path-x';
import style from './../style.m.scss';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import RadioLabel from './../../util/radio';
import CheckboxLabel from './../../util/checkbox';

class Settings extends Component {
    render() {
        const view = this;
        const {props, state} = view;

        return <div className="hug">
            <h3 className="section__header">Редактировать данные</h3>

            <div className={style.settings_form}>
                <label className={style.text_label}>
                    <p className={style.text_label__label}>Имя</p>
                    <input type="text" className={style.input_text}/>
                </label>
                <label className={style.text_label}>
                    <p className={style.text_label__label}>Email</p>
                    <input type="email" className={style.input_text}/>
                </label>
                <label className={style.text_label}>
                    <p className={style.text_label__label}>Фамилия</p>
                    <input type="email" className={style.input_text}/>
                </label>
                <label className={style.text_label}>
                    <p className={style.text_label__label}>Телефон</p>
                    <input type="tel" className={style.input_text}/>
                </label>
                <div className={style.text_label}>
                    <label className={style.calendar_label}>
                        <p className={style.text_label__label}>Дата рождения</p>
                        <DatePicker
                            locale="ru-RU"
                            startDate={moment()}
                            selected={moment()}
                            dateFormat="DD/MM/YYYY"
                            className={style.calendar_input}
                            onChange={() => console.log('calendar on change')}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                        />
                    </label>
                    <div className={style.gender_label}>
                        <p className={style.text_label__label}>Пол</p>
                        <RadioLabel input={{name: 'gender'}} label={{className: style.gender_label_container}}>
                            Мужской
                        </RadioLabel>
                        <RadioLabel input={{name: 'gender'}} label={{className: style.gender_label_container}}>
                            Женский
                        </RadioLabel>
                    </div>
                </div>
            </div>
            <div className={style.settings_form_bottom_line}/>

            <div className={style.settings_form}>
                <div className={style.text_label}>
                    <p className={style.text_label__label}>Коммуникация</p>
                    <CheckboxLabel>Хочу получать новости и спецпредложения</CheckboxLabel>
                </div>
            </div>
            <div className={style.settings_form_bottom_line}/>

            <div className={style.settings_form}>
                <div className={style.text_label}>
                    <p className={style.text_label__label}>Смена пароля</p>
                    <div className={style.input_text__from_to}>
                        <input type="password" placeholder="Старый пароль" className={style.input_text}/>
                    </div>
                    <span className={style.from_to_arrow}/>
                    <div className={style.input_text__from_to}>
                        <input type="password" placeholder="Новый пароль" className={style.input_text}/>
                    </div>
                </div>
            </div>
            <div className={style.settings_form_bottom_line}/>

            <div className={style.settings_form__submit_button}>Обновить</div>

        </div>;
    }
}

export default connect(
    state => ({
        app: state.app,
        auth: state.auth
    }),
    {}
)(Settings);
