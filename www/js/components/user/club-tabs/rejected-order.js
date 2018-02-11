import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {resolveImagePath} from './../../../helper/path-x';
import style from './../style.m.scss';
import moment from 'moment/moment';
import tableStyle from './../table.m.scss';
import {plural} from '../../../helper/plural';
import {NewOrder, getOrderTime} from './new-order';
import Pagination from 'react-js-pagination';

class RejectedOrder extends NewOrder {
    getOrders() {
        const view = this;
        const {props, state, attr} = view;
        const {auth} = props;

        return auth.clubData.data.rows.declined;
    }

    renderTableRow(order) {
        const view = this;

        const {
            id,
            created_at, // eslint-disable-line id-match, camelcase
            // fitness_club, // eslint-disable-line id-match, camelcase
            fitness_club_subscription_id, // eslint-disable-line id-match, camelcase
            fitness_club_subscription, // eslint-disable-line id-match, camelcase
            fitness_club_training, // eslint-disable-line id-match, camelcase
            order_type, // eslint-disable-line id-match, camelcase
            real_price, // eslint-disable-line id-match, camelcase
            // cashback,
            // frontType,
            amount
        } = order;

        const time = getOrderTime(order);

        return <tr key={id}>
            <td>{
                moment(created_at).format('DD.MM.YYYY') // eslint-disable-line id-match, camelcase
            }</td>
            <td>{
                [order.order_user.first_name, order.order_user.last_name].join(' ') // eslint-disable-line id-match, camelcase
            }</td>
            <td>{
                fitness_club_subscription_id ? // eslint-disable-line id-match, camelcase
                    fitness_club_subscription.title : // eslint-disable-line id-match, camelcase
                    fitness_club_training.title // eslint-disable-line id-match, camelcase
            } (<span className="main-color">{
                real_price // eslint-disable-line id-match, camelcase
            } руб.</span>)
            </td>
            {time.indexOf(':') === 1 ?
                <td>
                    <span style={{visibility: 'hidden'}}>1</span>
                    {time}
                </td> :
                <td>{time}</td>}
            <td dangerouslySetInnerHTML={{
                __html: plural(amount, 'человек').replace(' ', '&nbsp;') // eslint-disable-line id-match
            }}/>
            {
                order_type === 'reservation' ? // eslint-disable-line id-match, camelcase
                    <td>На&nbsp;месте</td> :
                    <td>Бонусами</td>
            }
            {/* <td className={tableStyle.vertical_free}>*/}
            {/* <div className={style.table__training_status}>*/}
            {/* <span*/}
            {/* className={style.table__training_status_icon + ' ' +*/}
            {/* style.table__training_status_icon__done}/>*/}
            {/* Подтвердить /!* оплату *!/*/}
            {/* </div>*/}
            {/* </td>*/}
        </tr>;
    }

    render() {
        const view = this;

        const orders = view.getOrders();

        if (orders.length === 0) {
            return <div className="hug">
                <h3 className="section__header">Нет отклоненных заявок</h3>
                <div style={{height: 300}}/>
            </div>;
        }

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
                        {/* <td>Оплачено?</td>*/}
                    </tr>
                </thead>
                <tbody className={tableStyle.t_body}>
                    {view.renderTableBody()}
                </tbody>
            </table>

            {orders.length > view.attr.itemsCountPerPage ?
                <Pagination
                    activePage={view.state.activePage + 1}
                    itemsCountPerPage={view.attr.itemsCountPerPage}
                    totalItemsCount={orders.length}
                    pageRangeDisplayed={5}
                    onChange={activePage => view.setState({activePage: activePage - 1})}
                    innerClass="pagination"
                    activeClass="pagination__li--active"
                    activeLinkClass="pagination__a--active"
                    itemClass="pagination__li"
                    linkClass="pagination__a"
                /> :
                null}

        </div>;
    }

    renderOld() {
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

