import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {resolveImagePath} from './../../../helper/path-x';
import style from './../style.m.scss';
import moment from 'moment/moment';
import tableStyle from './../table.m.scss';
import Pagination from 'react-js-pagination';
import {getHumanOrderStatus} from './../helper';

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
            fitness_club_training, // eslint-disable-line id-match, camelcase
            order_type, // eslint-disable-line id-match, camelcase
            real_price, // eslint-disable-line id-match, camelcase
            cashback,
            frontType
        } = order;

        const humanStatus = getHumanOrderStatus(frontType);

        return <tr key={id}>
            <td>{
                moment(start_order_date || created_at).format('DD.MM.YYYY') // eslint-disable-line id-match, camelcase
            }</td>
            <td>{
                fitness_club.title // eslint-disable-line id-match, camelcase
            }</td>
            <td>{
                fitness_club_training.title // eslint-disable-line id-match, camelcase
            } (<span className="main-color">{
                real_price // eslint-disable-line id-match, camelcase
            } руб.</span>)
            </td>
            {
                order_type === 'reservation' ? // eslint-disable-line id-match, camelcase
                    <td>На&nbsp;месте</td> :
                    <td>Бонусами</td>
            }
            <td>+{parseFloat(cashback).toFixed(2)}</td>
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
            fitness_club_subscription, // eslint-disable-line id-match, camelcase
            order_type, // eslint-disable-line id-match, camelcase
            real_price, // eslint-disable-line id-match, camelcase
            cashback,
            frontType
        } = order;

        const humanStatus = getHumanOrderStatus(frontType);

        return <tr key={id}>
            <td>{
                moment(created_at).format('DD.MM.YYYY') // eslint-disable-line id-match, camelcase
            }</td>
            <td>{
                fitness_club.title // eslint-disable-line id-match, camelcase
            }</td>
            <td>{
                fitness_club_subscription.title // eslint-disable-line id-match, camelcase
            } (<span className="main-color">{
                real_price // eslint-disable-line id-match, camelcase
            } руб.</span>)
            </td>
            {
                order_type === 'reservation' ? // eslint-disable-line id-match, camelcase
                    <td>На&nbsp;месте</td> :
                    <td>Бонусами</td>
            }
            <td>+{parseFloat(cashback).toFixed(2)}</td>
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
                    {/*
                    <tr>
                        <td>01.01.2017</td>
                        <td>Фитнес клуб “Аргумент”</td>
                        <td>Пробная тренировка для новичков (<span className="main-color">100 руб.</span>)</td>
                        <td>Онлайн</td>
                        <td>+7</td>
                        <td className={tableStyle.vertical_free}>
                            <div className={style.table__training_status}>
                                <span className={style.table__training_status_icon + ' ' +
                                style.table__training_status_icon__in_progress}/>
                            Обработка
                            </div>
                        </td>
                        <td>Ожидайте подтверждения</td>
                    </tr>
                    <tr>
                        <td>01.01.2017</td>
                        <td>Фитнес клуб “Аргумент”</td>
                        <td>Пробная тренировка для новичков (<span className="main-color">100 руб.</span>)</td>
                        <td>Онлайн</td>
                        <td>+7</td>
                        <td className={tableStyle.vertical_free}>
                            <div className={style.table__training_status}>
                                <span className={style.table__training_status_icon + ' ' +
                                style.table__training_status_icon__taken}/>
                            Забронировано
                            </div>
                        </td>
                        <td>Клуб ждет вас</td>
                    </tr>
                    <tr>
                        <td>01.01.2017</td>
                        <td>Фитнес клуб “Аргумент”</td>
                        <td>Пробная тренировка для новичков (<span className="main-color">100 руб.</span>)</td>
                        <td>Онлайн</td>
                        <td>+7</td>
                        <td className={tableStyle.vertical_free}>
                            <div className={style.table__training_status}>
                                <span className={style.table__training_status_icon + ' ' +
                                style.table__training_status_icon__rejected}/>
                            Отклонено
                            </div>
                        </td>
                        <td>Выберите другое предложение</td>
                    </tr>
                    <tr>
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
                        <td>Вам начислены бонусы</td>
                    </tr>
                    */}
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

