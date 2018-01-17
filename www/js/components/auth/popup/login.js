import React, {Component} from 'react';
import Dialog from './../../util/dialog';
import style from './style.m.scss';
import {connect} from 'react-redux';
import * as authAction from '../action';
import {withRouter} from 'react-router-dom';

class Login extends Component {
    constructor() {
        super();

        const view = this;

        view.state = {
            error: null
        };
    }

    login() {
        const view = this;
        const {props, state} = view;

        props.login(view.refs.email.value, view.refs.password.value).then(({type, payload}) => {
            if (payload.login.code === 200) {
                view.props.closePopup();

                view.props.history.push('/user');
                return;
            }

            const {data} = payload.login;

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

        return <Dialog {...props.dialog} onExit={() => {
            view.setState({error: null});
            if (props.dialog.onExit) {
                props.dialog.onExit();
            }
        }}>
            <div className={style.popup__paper} style={{width: 570}}>
                <div onClick={() => view.props.closePopup()} className={style.close_button}/>
                <h3 className={style.popup__header}>Войти</h3>
                <p className={style.popup__p}>Вы еще не зарегистрированы у нас?
                    <span onClick={() => view.props.openPopupRegister()} className={style.popup__enter_link}>
                        Зарегистрируйтесь
                    </span>
                </p>
                <form className={style.popup__form}>
                    <input
                        ref="email"
                        className={style.popup__form_text_input_wide} type="email" placeholder="Email"/>
                    <input
                        ref="password"
                        className={style.popup__form_text_input_wide} type="password" placeholder="Пароль"/>
                </form>
                {state.error && <p className={style.popup__error_p}>{state.error}</p>}
                <div onClick={() => view.login()} className={style.popup__button}>Войти</div>
                <span onClick={() => view.props.openPopupRestore()} className={style.popup__enter_link}>
                    Забыли пароль?
                </span>
            </div>
        </Dialog>;
    }
}

export default withRouter(connect(
    state => ({
        // auth: state.auth
    }),
    {
        closePopup: authAction.closePopup,
        openPopupRegister: authAction.openPopupRegister,
        openPopupRestore: authAction.openPopupRestore,
        login: authAction.login
    }
)(Login));
