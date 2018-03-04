// @flow
import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';

const appConst = require('./../../../app-const');
// import * as authAction from "../../../components/auth/action";

import {connect} from 'react-redux';
import type {App} from './../../../types/reducer';
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

type Props = {
    app: App
}

type State = {
    isOpen: boolean
}

class Header extends Component<Props, State> {
    state = {
        isOpen: false
    };

    renderDesktop() {
        return <header
            key="header"
            className={style.block}>
            <Link to="/" className={style.logo}/>
            <Link to="/" className={style.link}>фитнес</Link>
            <Link to="/" className={style.link}>питание</Link>
            <Link to="/" className={style.link}>потивация</Link>
            <Link to="/" className={style.link}>события</Link>
            <Link to="/" className={style.link}>знания</Link>
        </header>;
    }

    renderMobile() {
        const view = this;
        const {props, state} = view;

        const {isOpen} = state;

        const nodes = [
            <header
                key="header"
                className={style.block_mobile}>
                <Link to="/" className={style.logo}/>
                <div onClick={() => view.setState({isOpen: true})}>outer menu button {state.isOpen ? '++' : '--'}</div>
            </header>
        ];

        if (isOpen) {
            nodes.push(
                <div
                    onClick={() => view.setState({isOpen: false})}
                    key={'fade'}
                    className={'fade'}>
                    <h1>
                        fade
                    </h1>
                </div>,
                <div
                    key={'link-list'}>
                    <div
                        onClick={() => view.setState({isOpen: false})}>
                        inner menu button {state.isOpen ? '++' : '--'}
                    </div>
                    <Link to="/category" onClick={() => view.setState({isOpen: false})} className={style.link}>
                        фитнес
                    </Link>
                    <Link to="/" className={style.link}>питание</Link>
                    <Link to="/" className={style.link}>потивация</Link>
                    <Link to="/" className={style.link}>события</Link>
                    <Link to="/" className={style.link}>знания</Link>
                </div>
            );
        }

        return nodes;
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
        app: state.app
    }),
    {}
)(Header));
