/* global setTimeout */
import React, {Component} from 'react';
import {connect} from 'react-redux';

class Order extends Component {
    componentDidMount() {
        const view = this;

        view.state = {};
    }


    render() {
        const view = this;
        const {props, state} = view;

        return <h1>забронировать что-то там</h1>;
    }
}

export default connect(
    state => ({
        // auth: state.auth
    }),
    {
        // login: authAction.login,
        // getSessionState: authAction.getSessionState,
        // openPopupPromo: authAction.openPopupPromo
    }
)(Order);
