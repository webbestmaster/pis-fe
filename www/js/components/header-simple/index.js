import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';
import Menu from './../header/menu';

const appConst = require('./../../app-const');

class Header extends Component {
    render() {
        const view = this;
        const {props, state} = view;
        const {app} = props;

        return <div className="header-menu-simple-wrapper">
            <header className={classnames('header', {
                'header--mobile': !(app.screen.width > appConst.tabletWidth)
            })}>
            </header>
            <Menu/>
        </div>;
    }
}

export default connect(
    state => ({
        app: state.app
    }),
    {}
)(Header);
