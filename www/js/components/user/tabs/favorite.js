import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {resolveImagePath} from './../../../helper/path-x';
import style from './../style.m.scss';

class Favorite extends Component {
    render() {
        const view = this;
        const {props, state} = view;

        return <div className="hug">
            <h3 className="section__header">Избранное</h3>
        </div>;
    }
}

export default connect(
    state => ({
        app: state.app,
        auth: state.auth
    }),
    {
    }
)(Favorite);

