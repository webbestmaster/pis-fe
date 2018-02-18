import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';
import HeaderSimple from './../../components/header-simple';
import TopBigBanner from './../../components/top-big-banner';
import BreadCrumbs from './../../components/bread-crumbs';
import TrainingsCatalog from './../../components/trainings-catalog';
import Footer from './../../components/footer';
import UserShortInfo from './../../components/user-short-info';
import userShortInfoStyle from './../../components/user-short-info/style.m.scss';
import cnx from './../../helper/cnx';
import User from './../../components/user';
import UserClub from './../../components/user/user-club';
import style from './style.m.scss';
import {metaTagMaster} from '../../module/meta-tag';

const image404 = require('./images/404.png');

const globalAppConst = require('./../../app-const');
const topBanner = require('./../../../style/images/order/top-banner.png');
const authConst = require('./../../components/auth/const');

class NotFoundPage extends Component {
    componentDidMount() {
        metaTagMaster.updateByUrl('/page-404');
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {app} = props;
        const {auth} = props;

        return <div>
            <HeaderSimple/>

            <div className={style.main}>
                <img className={style.image} src={image404} alt=""/>
                <h1 className={style.header}>Страница не найдена</h1>
                <p className={style.text}>Запрашиваемая страница не найдена или была перемещена по другому адресу</p>
                <Link to="/" className={style.button}>перейти на главную</Link>
            </div>

            <Footer/>
        </div>;
    }
}

export default connect(
    state => ({
        // app: state.app,
        // auth: state.auth
    }),
    {}
)(NotFoundPage);

