// @flow
import React, {Component} from 'react';
import type {Node} from 'react';
import {withRouter, Link} from 'react-router-dom';

const appConst = require('./../../../app-const');
// import * as authAction from "../../../components/auth/action";

import {connect} from 'react-redux';
import type {AppType} from './../../../types/reducer';
import style from './style.m.scss';
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

    renderDesktop(): Node {
        return <header
            key="header"
            className={style.block}>
            <Link to="/" className={style.link}>знания</Link>
            <Link to="/" className={style.link}>события</Link>
            <Link to="/" className={style.link}>мотивация</Link>
            <Link to="/" className={style.link}>питание</Link>
            <Link to="/" className={style.link}>фитнес</Link>
            <Link to="/" className={style.logo}/>
        </header>;
    }

    openMenu() {
        this.setState({isOpen: true});
    }

    closeMenu() {
        this.setState({isOpen: false});
    }

    renderMobile(): Node[] {
        const view = this;
        const {props, state} = view;

        const {isOpen} = state;

        const nodes = [
            <header
                key="header"
                className={style.block_mobile}>
                <Link to="/" className={style.logo}/>
                <div
                    className={style.menu_button}
                    onClick={(): void => view.openMenu()}>
                    <div className={style.menu_button_icon}/>
                </div>
            </header>
        ];

        if (isOpen) {
            nodes.push(
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
                        className={style.link}>главная</Link>
                    <Link
                        to="/"
                        onClick={(): void => view.closeMenu()}
                        className={style.link}>фитнес</Link>
                    <Link
                        to="/"
                        onClick={(): void => view.closeMenu()}
                        className={style.link}>питание</Link>
                    <Link
                        to="/"
                        onClick={(): void => view.closeMenu()}
                        className={style.link}>мотивация</Link>
                    <Link
                        to="/"
                        onClick={(): void => view.closeMenu()}
                        className={style.link}>события</Link>
                    <Link
                        to="/"
                        onClick={(): void => view.closeMenu()}
                        className={style.link}>знания</Link>
                </div>
            );
        }

        return nodes;
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
