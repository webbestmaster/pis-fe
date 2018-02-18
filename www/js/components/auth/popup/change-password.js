import React, {Component} from 'react';
import Dialog from './../../util/dialog';
import style from './style.m.scss';
import {connect} from 'react-redux';
import * as authAction from '../action';
import {withRouter} from 'react-router-dom';
import * as authApi from './../api';

const globalAppConst = require('./../../../app-const');

class ChangePassword extends Component {
    constructor() {
        super();

        const view = this;

        view.state = {
            error: null
        };
    }

    changePassword() {
        console.log('changePassword');
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
                <div onClick={() => view.props.closePopup()} className={style.close_button}/>
                <h3 className={style.popup__header}>Сменить пароль</h3>
                {/*
                <p className={style.popup__p}>
                    <span onClick={() => view.props.openPopupRegister()} className={style.popup__enter_link}>
                        Зарегистрируйтесь
                    </span>
                </p>
*/}
                <form className={style.popup__form}>
                    <input
                        ref="password"
                        className={style.popup__form_text_input_wide} type="password" placeholder="Пароль"/>
                    <input
                        ref="newPassword"
                        className={style.popup__form_text_input_wide} type="password" placeholder="Новый пароль"/>
                </form>
                {state.error && <p className={style.popup__error_p}>{state.error}</p>}
                <div onClick={() => view.changePassword()} className={style.popup__button}>Сменить пароль</div>
            </div>
        </Dialog>;
    }
}

export default withRouter(connect(
    state => ({
        app: state.app
    }),
    {
        closePopup: authAction.closePopup
        // openPopupRegister: authAction.openPopupRegister,
        // openPopupRestore: authAction.openPopupRestore,
        // login: authAction.login
    }
)(ChangePassword));
