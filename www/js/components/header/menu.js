import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import * as authAction from './../auth/action';
import UserShortInfo from './../../components/user-short-info';
import cnx from './../../helper/cnx';

const globalAppConst = require('./../../app-const');
const appConst = require('./../../app-const');

class Menu extends Component {
    constructor() {
        super();

        const view = this;

        view.state = {
            isOpen: false
        };
    }

    renderDesktop() {
        const view = this;
        const {props, state} = view;

        return <div key="header-desktop" className="header-menu-wrapper--desktop">
            <div className="hug">
                <Link to="/" className="header__logo">
                    <h1>Спорт и фитнес в Минске</h1>
                </Link>
                <nav className="header-menu">
                    <Link {...cnx('header-menu__link', {
                        'header-menu__link--active': props.match.url === '/clubs'
                    })} to="/clubs">Клубы</Link>
                    <Link {...cnx('header-menu__link', {
                        'header-menu__link--active': props.match.url === '/subscriptions'
                    })} to="/subscriptions">Абонементы</Link>
                    <Link {...cnx('header-menu__link', {
                        'header-menu__link--active': props.match.url === '/trainings'
                    })} to="/trainings">Тренировки</Link>
                    <p onClick={() => view.openUserPage()}
                        className="header-menu__button header-menu__button--login">Личный кабинет</p>
                    <a href="tel:84995770137" className="header-menu__button header-menu__button--call">
                        8 (499) 577-01-37
                    </a>
                </nav>
            </div>
        </div>;
    }

    renderMobile() {
        const view = this;
        const {props, state} = view;
        const {isOpen} = state;
        const {app} = props;

        if (isOpen) {
            return [
                <Link key="header__logo" to="/" className="header__logo"/>,
                <div
                    key="header-mobile-menu__menu-button"
                    onClick={() => view.setState({isOpen: false})}
                    className="header-mobile-menu__menu-button header-mobile-menu__menu-button--open"/>,
                <nav key="header-mobile-menu" className="header-mobile-menu">
                    {app.screen.width > globalAppConst.tabletWidth ? null : <UserShortInfo/>}
                    <a href="tel:84995770137" className="header-mobile-menu__button header-mobile-menu__button--call">
                        8 (499) 577-01-37
                    </a>
                    <p onClick={() => view.openUserPage()}
                        className="header-mobile-menu__button header-mobile-menu__button--login">
                        Личный кабинет
                    </p>
                    <div className="header-mobile-menu__link-list">
                        <Link {...cnx('header-mobile-menu__link', {
                            'header-mobile-menu__link--active': props.match.url === '/'
                        })} to="/">Главная</Link>
                        <Link {...cnx('header-mobile-menu__link', {
                            'header-mobile-menu__link--active': props.match.url === '/clubs'
                        })} to="/clubs">Клубы</Link>
                        <Link {...cnx('header-mobile-menu__link', {
                            'header-mobile-menu__link--active': props.match.url === '/subscriptions'
                        })} to="/subscriptions">Абонементы</Link>
                        <Link {...cnx('header-mobile-menu__link', {
                            'header-mobile-menu__link--active': props.match.url === '/trainings'
                        })} to="/trainings">Тренировки</Link>
                    </div>
                </nav>,
                <div
                    onClick={() => view.setState({isOpen: false})}
                    key="header-mobile-menu__fade"
                    className="header-mobile-menu__fade"/>
            ];
        }

        return [
            <Link key="header__logo" to="/" className="header__logo"/>,
            <div
                key="header-mobile-menu__menu-button"
                onClick={() => view.setState({isOpen: true})}
                className="header-mobile-menu__menu-button"/>];
    }

    openUserPage() {
        const view = this;
        const {props} = view;

        if (props.auth.login.data && props.auth.login.data.user) {
            view.props.history.push('/user');
            return;
        }

        view.props.openPopupLogin();
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {app} = props;

        return app.screen.width > appConst.tabletWidth ? view.renderDesktop() : view.renderMobile();
    }
}

export default withRouter(connect(
    state => ({
        app: state.app,
        auth: state.auth
    }),
    {
        openPopupLogin: authAction.openPopupLogin
    }
)(Menu));
