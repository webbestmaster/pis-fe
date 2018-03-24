import React, {Component} from 'react';
import {connect} from 'react-redux';
import Dialog from './../../util/dialog';
import style from './promo.m.scss';
import * as authAction from './../action';

class Promo extends Component {
    render() {
        const view = this;
        const {props, state} = view;

        return <Dialog {...props.dialog}>
            <div onClick={() => props.closePopup()} className={style.close_button__white}/>
            <div className={style.promo}>
                <div className={style.left_block}>
                    <div className={style.left_path_1}>
                        <img src={require('./../../../../style/i/popup/promo/register.png')} alt=""/>
                        <h4>Зарегистрируйтесь</h4>
                        <p>&nbsp;</p>
                    </div>
                    <div className={style.left_path_2}>
                        <img src={require('./../../../../style/i/popup/promo/cashback.png')} alt=""/>
                        <h4>Оплачивайте занятия
                            <br/>
                            и получайте бонусы <span className="main-color">*</span></h4>
                        <p><span className="main-color">*</span> 1 бонус = 1 руб.</p>
                    </div>
                    <div className={style.left_path_3}>
                        <img src={require('./../../../../style/i/popup/promo/money.png')} alt=""/>
                        <h4>Оплачивайте бонусами
                            <br/>
                            до 100% покупки</h4>
                        <p>&nbsp;</p>
                    </div>
                </div>
                <div className={style.right_block}>
                    <img className={style.banner} src={require('./../../../../style/i/popup/promo/banner.png')} alt=""/>
                    <h2 className={style.promo_big_text}>Дарим 3 бонуса при регистрации</h2>
                    <div onClick={() => props.openPopupRegister()} className={style.promo_button}>
                        Зарегистрироваться
                    </div>
                    <div className={style.promo_text}>
                        Вы уже зарегистрированы?&nbsp;&nbsp;
                        <span onClick={() => props.openPopupLogin()} className={style.promo_enter}>Войти</span>
                    </div>
                </div>
            </div>
        </Dialog>;
    }
}

export default connect(
    state => ({
        auth: state.auth
    }),
    {
        closePopup: authAction.closePopup,
        openPopupRegister: authAction.openPopupRegister,
        openPopupLogin: authAction.openPopupLogin
    }
)(Promo);
