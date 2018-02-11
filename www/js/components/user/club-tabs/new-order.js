import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {resolveImagePath} from './../../../helper/path-x';
import style from './../style.m.scss';
import moment from 'moment/moment';
import tableStyle from './../table.m.scss';
import {plural} from '../../../helper/plural';
import Pagination from 'react-js-pagination';
import {reduceSeconds} from './../../../helper/date';
import {orderApi} from './../api';
import * as authAction from '../../auth/action';

export class NewOrder extends Component {
    constructor() {
        super();

        const view = this;

        view.state = {
            activePage: 0
        };

        view.attr = {
            itemsCountPerPage: 8
        };
    }

    getOrders() {
        const view = this;
        const {props, state, attr} = view;
        const {auth} = props;

        return auth.clubData.data.rows.pending;
    }

    confirmOrder(orderId) {
        const view = this;
        const {props, state, attr} = view;

        console.log(orderId);
        return;
        orderApi.confirm(orderId).then(() => props.getClubHomeData());
    }

    declineOrder(orderId) {
        const view = this;
        const {props, state, attr} = view;

        console.log(orderId);
        return;
        orderApi.decline(orderId).then(() => props.getClubHomeData());
    }

    renderTableBody() {
        const view = this;
        const {props, state, attr} = view;
        const orders = view.getOrders();
        const {activePage} = state;
        const nexPage = activePage + 1;
        const {itemsCountPerPage} = attr;

        return orders
            .slice(activePage * itemsCountPerPage, nexPage * itemsCountPerPage)
            .map(order => view.renderTableRow(order));
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
            <td className={tableStyle.vertical_free}>
                <div className={style.two_button_wrapper}>
                    <div
                        onClick={() => view.confirmOrder(id)}
                        className={style.table__training_status}>
                        <span className={style.table__training_status_icon + ' ' +
                        style.table__training_status_icon__done}/>
                        Подтвердить
                    </div>
                    <div
                        onClick={() => view.declineOrder(id)}
                        className={style.table__training_status}>
                        <span className={style.table__training_status_icon + ' ' +
                        style.table__training_status_icon__rejected}/>
                        Отклонить
                    </div>
                </div>
            </td>
        </tr>;
    }

    render() {
        const view = this;

        const orders = view.getOrders();

        if (orders.length === 0) {
            return <div className="hug">
                <h3 className="section__header">Нет новых заявок</h3>
                <div style={{height: 300}}/>
            </div>;
        }

        return <div className="hug">
            <h3 className="section__header">Новые заявки</h3>

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
    {
        getClubHomeData: authAction.getClubHomeData
    }
)(NewOrder);

export function getOrderTime(order) {
    const {
        fitness_club_subscription_id // eslint-disable-line id-match, camelcase
    } = order;


    return fitness_club_subscription_id ? // eslint-disable-line id-match, camelcase
        getSubscriptionTime(order) :
        getTrainingTime(order);
}

function getSubscriptionTime(order) {
    const {
        fitness_club_subscription // eslint-disable-line id-match, camelcase
    } = order;

    const {work_from, work_to} = fitness_club_subscription; // eslint-disable-line id-match, camelcase

    return reduceSeconds(work_from) + '-' + reduceSeconds(work_to);
}

function getTrainingTime(order) {
    const {
        fitness_club_training_schedule // eslint-disable-line id-match, camelcase
    } = order;

    const {time_from, time_to} = fitness_club_training_schedule; // eslint-disable-line id-match, camelcase

    return reduceSeconds(time_from) + '-' + reduceSeconds(time_to);
}
