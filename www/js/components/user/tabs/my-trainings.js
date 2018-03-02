import React, {Component} from 'react';
import {connect} from 'react-redux';
import style from './../style.m.scss';
import moment from 'moment/moment';
import tableStyle from './../table.m.scss';
import Pagination from 'react-js-pagination';
import {getHumanOrderStatus} from './../helper';
import {Link} from 'react-router-dom';

class MyTrainings extends Component {
    constructor() {
        super();

        const view = this;

        view.state = {
            activePage: 0
        };

        view.attr = {
            itemsCountPerPage: 6
        };
    }

    getOrders() {
        const view = this;
        const {props, state} = view;
        const {orders} = props.auth.homeData.data;
        const orderTypeList = ['pending', 'confirmed', 'declined', 'approved'];

        const allTypedOrders = [];

        orderTypeList
            .forEach(orderType => orders[orderType]
                .forEach(orderByType => allTypedOrders
                    .push(Object.assign({}, orderByType, {frontType: orderType}))));

        return allTypedOrders
            .sort((orderA, orderB) => orderA.created_at > orderB.created_at ? -1 : 1);
    }

    renderTableRow(order) {
        const view = this;

        return order.fitness_club_subscription_id ? // eslint-disable-line id-match, camelcase
            view.renderTableRowSubscription(order) :
            view.renderTableRowTraining(order);
    }

    renderTableRowTraining(order) {
        const {
            id,
            created_at, // eslint-disable-line id-match, camelcase
            start_order_date, // eslint-disable-line id-match, camelcase
            fitness_club, // eslint-disable-line id-match, camelcase
            fitness_club_training: fitnessClubTraining, // eslint-disable-line id-match, camelcase
            fitness_club_training_id: fitnessClubTrainingId, // eslint-disable-line id-match, camelcase
            order_type, // eslint-disable-line id-match, camelcase
            real_price: realPrice, // eslint-disable-line id-match, camelcase
            cashback,
            frontType
        } = order;

        const isReservation = order_type === 'reservation'; // eslint-disable-line id-match, camelcase
        const humanStatus = getHumanOrderStatus(frontType, isReservation ? '' : 'HasBonus');

        return <tr key={id}>
            <td>{
                moment(start_order_date || created_at).format('DD.MM.YYYY') // eslint-disable-line id-match, camelcase
            }</td>
            <td>{
                fitness_club.title // eslint-disable-line id-match, camelcase
            }</td>
            <td>
                <Link
                    target="_blank"
                    className={tableStyle.t_link}
                    to={'/training/' + fitnessClubTrainingId}>
                    {fitnessClubTraining.title} (<span className="main-color">{realPrice} руб.</span>)
                </Link>
            </td>
            {
                isReservation ?
                    <td>На&nbsp;месте</td> :
                    <td>Бонусами</td>
            }
            {
                isReservation ?
                    <td>+{parseFloat(cashback).toFixed(2)}</td> :
                    <td>-{realPrice}</td>
            }
            <td className={tableStyle.vertical_free}>
                <div className={style.table__training_status}>
                    <span className={style.table__training_status_icon + ' ' + humanStatus.cssClass}/>
                    {humanStatus.status}
                </div>
            </td>
            <td>{humanStatus.description}</td>
        </tr>;
    }

    renderTableRowSubscription(order) {
        const {
            id,
            created_at, // eslint-disable-line id-match, camelcase
            fitness_club, // eslint-disable-line id-match, camelcase
            fitness_club_subscription: fitnessClubSubscription, // eslint-disable-line id-match, camelcase
            fitness_club_subscription_id: fitnessClubSubscriptionId, // eslint-disable-line id-match, camelcase
            order_type, // eslint-disable-line id-match, camelcase
            real_price: realPrice, // eslint-disable-line id-match, camelcase
            cashback,
            frontType
        } = order;

        const isReservation = order_type === 'reservation'; // eslint-disable-line id-match, camelcase
        const humanStatus = getHumanOrderStatus(frontType, isReservation ? '' : 'HasBonus');

        return <tr key={id}>
            <td>{
                moment(created_at).format('DD.MM.YYYY') // eslint-disable-line id-match, camelcase
            }</td>
            <td>{
                fitness_club.title // eslint-disable-line id-match, camelcase
            }</td>
            <td>
                <Link
                    target="_blank"
                    className={tableStyle.t_link}
                    to={'/subscription/' + fitnessClubSubscriptionId}>
                    {fitnessClubSubscription.title} (<span className="main-color">{realPrice} руб.</span>)
                </Link>
            </td>
            {
                isReservation ?
                    <td>На&nbsp;месте</td> :
                    <td>Бонусами</td>
            }
            {
                isReservation ?
                    <td>+{parseFloat(cashback).toFixed(2)}</td> :
                    <td>-{realPrice}</td>
            }
            <td className={tableStyle.vertical_free}>
                <div className={style.table__training_status}>
                    <span className={style.table__training_status_icon + ' ' + humanStatus.cssClass}/>
                    {humanStatus.status}
                </div>
            </td>
            <td>{humanStatus.description}</td>
        </tr>;
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

    render() {
        const view = this;
        const {props, state} = view;

        if (!props.auth.homeData.data) {
            return null;
        }

        const orders = view.getOrders();

        return <div className="hug">
            <h3 className="section__header">Мои тренировки</h3>

            <table className={tableStyle.table}>
                <thead className={tableStyle.t_head}>
                    <tr>
                        <td>Дата</td>
                        <td>Клуб</td>
                        <td>Абонемент/Тренировка</td>
                        <td>Оплата</td>
                        <td>Бонусы</td>
                        <td>Статус</td>
                        <td>Комментарий</td>
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
)(MyTrainings);

