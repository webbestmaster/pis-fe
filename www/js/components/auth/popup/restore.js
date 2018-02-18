import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
// import classnames from 'classnames';
// const appConst = require('./../../../app-const');
// const headerMaxHeight = 980;
//
import Dialog from './../../util/dialog';
import style from './style.m.scss';
import * as authAction from '../action';

const globalAppConst = require('./../../../app-const');

class Restore extends Component {
    constructor() {
        super();

        const view = this;

        view.state = {
            error: null
        };
    }

    forgotPassword() {
        const view = this;
        const {props} = view;
        const email = view.refs.email.value.trim();

        if (!email) {
            return;
        }

        props.forgotPassword(email).then(({type, payload}) => {
            if (payload.forgotPassword.code === 200) {
                view.props.closePopup();

                view.props.history.push('/user');
                return;
            }

            const {data} = payload.forgotPassword;

            if (data instanceof Array) {
                view.setState({error: data[0]});
                return;
            }

            const errorKey = Object.keys(data)[0];

            view.setState({error: data[errorKey][0]});
        });
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {app} = props;

        return <Dialog {...props.dialog} onExit={() => {
            view.setState({error: null});
            if (props.dialog.onExit) {
                props.dialog.onExit();
            }
        }}>
            <div
                className={style.popup__paper}
                style={app.screen.width <= globalAppConst.tabletWidth ? {maxWidth: 570} : {width: 570}}>
                <div onClick={() => props.closePopup()} className={style.close_button}/>
                <h3 className={style.popup__header}>Сбросить пароль</h3>
                <p className={style.popup__p}>
                    Введите Вашу почту
                </p>
                <form className={style.popup__form}>
                    <input
                        ref="email"
                        className={style.popup__form_text_input_wide} type="email" placeholder="Email"/>
                </form>
                {state.error && <p className={style.popup__error_p}>{state.error}</p>}
                <div onClick={() => view.forgotPassword()} className={style.popup__button}>Сбросить пароль</div>
            </div>
        </Dialog>;
    }
}

export default connect(
    state => ({
        app: state.app
    }),
    {
        closePopup: authAction.closePopup,
        forgotPassword: authAction.forgotPassword
    }
)(Restore);
