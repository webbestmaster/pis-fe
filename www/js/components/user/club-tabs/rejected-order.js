import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment/moment';
import tableStyle from './../table.m.scss';
import {plural} from '../../../helper/plural';
import {NewOrder} from './new-order';
import Pagination from 'react-js-pagination';
import {reduceSeconds} from '../../../helper/date';

class RejectedOrder extends NewOrder {
    getOrders() {
        const view = this;
        const {props, state, attr} = view;
        const {auth} = props;

        return auth.clubData.data.rows.declined;
    }

    renderTableRow(order) {
        const view = this;

        return order.fitness_club_subscription_id ? // eslint-disable-line id-match, camelcase
            view.renderTableRowSubscription(order) :
            view.renderTableRowTraining(order);
    }

    renderTableRowTraining(order) {
        const view = this;

        const {
            id,
            created_at, // eslint-disable-line id-match, camelcase
            start_order_date, // eslint-disable-line id-match, camelcase
            // fitness_club, // eslint-disable-line id-match, camelcase
            // fitness_club_subscription_id, // eslint-disable-line id-match, camelcase
            // fitness_club_subscription, // eslint-disable-line id-match, camelcase
            fitness_club_training, // eslint-disable-line id-match, camelcase
            order_type, // eslint-disable-line id-match, camelcase
            real_price, // eslint-disable-line id-match, camelcase
            // cashback,
            // frontType,
            fitness_club_training_schedule, // eslint-disable-line id-match, camelcase
            amount,
            status
        } = order;

        return <tr key={id}>
            <td>{
                moment(start_order_date || created_at).format('DD.MM.YYYY') // eslint-disable-line id-match, camelcase
            }</td>
            <td>{
                [order.order_user.first_name, order.order_user.last_name].join(' ') // eslint-disable-line id-match, camelcase
            }</td>
            <td>{
                fitness_club_training.title // eslint-disable-line id-match, camelcase
            } (<span className="main-color">тренировка - {
                real_price // eslint-disable-line id-match, camelcase
            } руб.
            </span>)
            </td>
            <td>
                {reduceSeconds(
                    fitness_club_training_schedule.time_from // eslint-disable-line id-match, camelcase
                )}
                &nbsp;-&nbsp;
                {reduceSeconds(
                    fitness_club_training_schedule.time_to // eslint-disable-line id-match, camelcase
                )}
            </td>
            <td dangerouslySetInnerHTML={{
                __html: plural(amount, 'человек').replace(' ', '&nbsp;') // eslint-disable-line id-match
            }}/>
            {
                order_type === 'reservation' ? // eslint-disable-line id-match, camelcase
                    <td>На&nbsp;месте</td> :
                    <td>Бонусами</td>
            }
        </tr>;
    }

    renderTableRowSubscription(order) {
        const view = this;
        const {state, props} = view;

        const {
            id,
            created_at, // eslint-disable-line id-match, camelcase
            // start_order_date, // eslint-disable-line id-match, camelcase
            // fitness_club, // eslint-disable-line id-match, camelcase
            // fitness_club_subscription_id, // eslint-disable-line id-match, camelcase
            fitness_club_subscription, // eslint-disable-line id-match, camelcase
            // fitness_club_training, // eslint-disable-line id-match, camelcase
            order_type, // eslint-disable-line id-match, camelcase
            real_price, // eslint-disable-line id-match, camelcase
            // cashback,
            // frontType,
            amount,
            status
        } = order;

        return <tr key={id}>
            <td>{
                moment(created_at).format('DD.MM.YYYY') // eslint-disable-line id-match, camelcase
            }</td>
            <td>{
                [order.order_user.first_name, order.order_user.last_name].join(' ') // eslint-disable-line id-match, camelcase
            }</td>
            <td>{
                fitness_club_subscription.title // eslint-disable-line id-match, camelcase
            } (<span className="main-color">абонемент - {
                real_price // eslint-disable-line id-match, camelcase
            } руб.</span>)
            </td>
            <td>
                <div className="ta-center">
                    &nbsp;&ndash;&ndash;&nbsp;
                </div>
            </td>
            <td dangerouslySetInnerHTML={{
                __html: plural(amount, 'человек').replace(' ', '&nbsp;') // eslint-disable-line id-match
            }}/>
            {
                order_type === 'reservation' ? // eslint-disable-line id-match, camelcase
                    <td>На&nbsp;месте</td> :
                    <td>Бонусами</td>
            }
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
}

export default connect(
    state => ({
        app: state.app,
        auth: state.auth
    }),
    {}
)(RejectedOrder);

