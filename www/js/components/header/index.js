import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';
import Menu from './menu';
import Slider from './slider';
const appConst = require('./../../app-const');
const headerMaxHeight = 980;

class Header extends Component {
    render() {
        const view = this;
        const {props, state} = view;
        const {app} = props;

        const style = app.screen.width > appConst.tabletWidth ?
            {height: app.screen.height, maxHeight: headerMaxHeight} :
            null;

        return [
            <header key="header" style={style} className={classnames('header', {
                'header--mobile': !(app.screen.width > appConst.tabletWidth)
            })}>
                <Slider/>
            </header>,
            <Menu key="menu"/>
        ];
    }
}

export {headerMaxHeight};

export default connect(
    state => ({
        app: state.app
    }),
    {}
)(Header);
