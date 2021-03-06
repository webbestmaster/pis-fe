// @flow
import React, {Component} from 'react';
import type {Node} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import type {AppType} from './../../../types/reducer';
import style from './style.m.scss';
import classnames from 'classnames';

const appConst = require('./../../../app-const');
// import {metaTagMaster} from './../../../module/meta-tag';

/*
import Header from './../../components/header';
import Sale from './../../components/sale';
import PromoSteps from './../../components/promo-steps';
import OurPartners from './../../components/our-partners';
import PromoInstagram from './../../components/promo-instagram';
import Footer from './../../components/footer';
*/

type PropsType = {
    app: AppType
};

type StateType = {
    isOpen: boolean
};

class Header extends Component<PropsType, StateType> {
    state = {
        isOpen: false
    };

    openMenu() {
        this.setState({isOpen: true});
    }

    closeMenu() {
        this.setState({isOpen: false});
    }

    renderDesktop(): Node {
        const view = this;
        const {state, props} = view;
        const {categoryName} = props.match.params;

        return <header
            key="header"
            className={style.block}>
            <a href="/" className={style.link + ' ' + style.to_main_site}>&nbsp;</a>
            <Link
                to="/category/knowledge"
                className={classnames(style.link, {[style.link__active]: categoryName === 'knowledge'})}
            >знания</Link>
            <Link
                to="/category/event"
                className={classnames(style.link, {[style.link__active]: categoryName === 'event'})}
            >события</Link>
            <Link
                to="/category/motivation"
                className={classnames(style.link, {[style.link__active]: categoryName === 'motivation'})}
            >мотивация</Link>
            <Link
                to="/category/food"
                className={classnames(style.link, {[style.link__active]: categoryName === 'food'})}
            >питание</Link>
            <Link
                to="/category/fitness"
                className={classnames(style.link, {[style.link__active]: categoryName === 'fitness'})}
            >фитнес</Link>
            <Link to="/" className={style.logo}/>
        </header>;
    }

    renderMobile(): Node {
        const view = this;
        const {props, state} = view;
        const {categoryName} = props.match.params;
        const {isOpen} = state;

        return <header
            key="header"
            className={style.block_mobile}>
            <Link to="/" className={style.logo}/>
            <div
                className={style.menu_button}
                onClick={(): void => view.openMenu()}>
                <div className={style.menu_button_icon}/>
            </div>

            {isOpen ?
                [
                    <div
                        onClick={(): void => view.closeMenu()}
                        key="header-menu-fade"
                        className={style.header_menu_fade}/>,
                    <div
                        key="header-mobile-menu"
                        className={style.header_mobile_menu}>
                        <div
                            className={style.menu_button + ' ' + style.menu_button__open}
                            onClick={(): void => view.closeMenu()}>
                            <div className={style.menu_button_icon}/>
                        </div>
                        <Link
                            to="/"
                            onClick={(): void => view.closeMenu()}
                            className={classnames(style.link, {[style.link__active]: props.match.url === '/'})}
                        >главная</Link>
                        <Link
                            to="/category/fitness"
                            onClick={(): void => view.closeMenu()}
                            className={classnames(style.link, {[style.link__active]: categoryName === 'fitness'})}
                        >фитнес</Link>
                        <Link
                            to="/category/food"
                            onClick={(): void => view.closeMenu()}
                            className={classnames(style.link, {[style.link__active]: categoryName === 'food'})}
                        >питание</Link>
                        <Link
                            to="/category/motivation"
                            onClick={(): void => view.closeMenu()}
                            className={classnames(style.link, {[style.link__active]: categoryName === 'motivation'})}
                        >мотивация</Link>
                        <Link
                            to="/category/event"
                            onClick={(): void => view.closeMenu()}
                            className={classnames(style.link, {[style.link__active]: categoryName === 'event'})}
                        >события</Link>
                        <Link
                            to="/category/knowledge"
                            onClick={(): void => view.closeMenu()}
                            className={classnames(style.link, {[style.link__active]: categoryName === 'knowledge'})}
                        >знания</Link>
                        <a href="/" className={style.link + ' ' + style.to_main_site}>&nbsp;</a>
                    </div>
                ] :
                null}
        </header>;
    }

    render(): Node {
        const view = this;
        const {props, state} = view;
        const {app} = props;

        return app.screen.width > appConst.tabletWidth ? view.renderDesktop() : view.renderMobile();
    }
}

type GlobalStateType = {|
    app: AppType
|};

export default withRouter(
    connect(
        (state: GlobalStateType): GlobalStateType => ({
            app: state.app
        }),
        {}
    )(Header)
);
