import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {resolveImagePath} from './../../helper/path-x';

import style from './style.m.scss';

class UserShortInfo extends Component {
    render() {
        const view = this;
        const {props, state} = view;

        return <h1 className={style.main_block}>{JSON.stringify(props.auth)}</h1>;
    }
}

export default connect(
    state => ({
        app: state.app,
        auth: state.auth
    }),
    {
    }
)(UserShortInfo);

