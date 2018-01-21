import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {resolveImagePath} from './../../../helper/path-x';
import style from './../style.m.scss';
import moment from 'moment/moment';
import tableStyle from './../table.m.scss';
import {plural} from '../../../helper/plural';

class RejectedOrder extends Component {
    render() {
        const view = this;
        const {props, state} = view;

        return <div className="hug">
            <h3 className="section__header">Отклоненные</h3>

            <table className={tableStyle.table}>
                <thead className={tableStyle.t_head}>
                    <tr>
                        <td>Дата</td>
                        <td>Имя/Фамилия</td>
                        <td>Абонемент/Тренировка</td>
                        <td>Время</td>
                        <td>Кол-во</td>
                        <td>Оплата</td>
                        {/* <td>Статус</td>*/}
                    </tr>
                </thead>
                <tbody className={tableStyle.t_body}>
                    {'123456'
                        .split('')
                        .map(ii => <tr key={ii}>
                            <td>01.01.2017</td>
                            <td>Иванов Иван</td>
                            <td>Пробная тренировка для новичков (<span className="main-color">100 руб.</span>)</td>
                            <td>18:00-19:00</td>
                            <td dangerouslySetInnerHTML={{
                                __html: plural(2, 'человек').replace(' ', '&nbsp;') // eslint-disable-line id-match
                            }}/>
                            <td>Онлайн</td>
                            {/*
                            <td className={tableStyle.vertical_free}>
                                <div className={style.two_button_wrapper}>
                                    <div className={style.table__training_status}>
                                        <span className={style.table__training_status_icon + ' ' +
                                        style.table__training_status_icon__done}/>
                                    Подтвердить
                                    </div>
                                    <div className={style.table__training_status}>
                                        <span className={style.table__training_status_icon + ' ' +
                                        style.table__training_status_icon__rejected}/>
                                    Отклонить
                                    </div>
                                </div>
                            </td>
*/}
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
)(RejectedOrder);

