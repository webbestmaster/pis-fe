import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {resolveImagePath} from './../../../helper/path-x';
import style from './../style.m.scss';
import moment from 'moment/moment';
import tableStyle from './../table.m.scss';

class AppliedOrder extends Component {
    render() {
        const view = this;
        const {props, state} = view;

        return <div className="hug">
            <h3 className="section__header">Мои тренировки</h3>

            <table className={tableStyle.table}>
                <thead className={tableStyle.t_head}>
                    <tr>
                        <td>Дата</td>
                        <td>Имя/Фамилия</td>
                        <td>Абонемент/Тренировка</td>
                        <td>Время</td>
                        <td>Кол-во</td>
                        <td>Оплата</td>
                        <td>Статус</td>
                    </tr>
                </thead>
                <tbody className={tableStyle.t_body}>

                    {'123456'
                        .split('')
                        .map(ii => <tr key={ii}>
                            <td>01.01.2017</td>
                            <td>Фитнес клуб “Аргумент”</td>
                            <td>Пробная тренировка для новичков (<span className="main-color">100 руб.</span>)</td>
                            <td>Онлайн</td>
                            <td>+7</td>
                            <td className={tableStyle.vertical_free}>
                                <div className={style.table__training_status}>
                                    <span className={style.table__training_status_icon + ' ' +
                                style.table__training_status_icon__done}/>
                            Завершено
                                </div>
                            </td>
                            <td>Бывает и такое</td>
                        </tr>)}
                </tbody>
            </table>
        </div>;
    }
}

export default connect(
    state => ({
        app: state.app,
        auth: state.auth
    }),
    {}
)(AppliedOrder);

