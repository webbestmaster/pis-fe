import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {resolveImagePath} from './../../../helper/path-x';
import style from './../style.m.scss';
import DatePicker from 'react-datepicker';
import moment from 'moment';

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
                    <label className={style.gender_label}>
                        <p className={style.text_label__label}>Пол</p>
                        <input type="tel" className={style.input_text}/>
                    </label>
                </div>
            </div>

            <div className={'clear-self'}/>


            <div className={style.settings_form}>
                <label className={style.text_label}>
                    <p className={style.text_label__label}>Телефон</p>
                    <input type="tel" className={style.input_text}/>
                </label>
            </div>
        </div>;
    }
}

export default connect(
    state => ({
        app: state.app,
        auth: state.auth
    }),
    {
    }
)(Settings);

