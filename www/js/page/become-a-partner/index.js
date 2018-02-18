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
import {metaTagMaster} from '../../module/meta-tag';
import BecomeAPartner from './../../components/become-a-partner';

const globalAppConst = require('./../../app-const');
const topBanner = require('./../../../style/images/order/top-banner.png');
const authConst = require('./../../components/auth/const');

const fishText = 'Замечательный клуб В самом центре. Радует выбор. атмосфера неповторимая, как в' +
    ' настоящем клубе. Интерьер грандиозный. Кажется тут советская Яма была раньше - очень ' +
    'крутое помещение - красавцы. Приветливые тренера, обходительный персонал. Обязательно ' +
    'зайдем сюда еще раз. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ' +
    'cumque ipsam molestias possimus quaerat. Dolorem fugiat fugit similique soluta ' +
    'temporibus. Delectus facilis optio qui unde velit vitae! Necessitatibus, ' +
    'nulla suscipit?';

class BecomeAPartnerPage extends Component {
    componentDidMount() {
        metaTagMaster.updateByUrl('/become-a-partner');
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {app} = props;
        const {auth} = props;

        return <div>
            <HeaderSimple/>
            <TopBigBanner backgroundImage={topBanner}>
                <BreadCrumbs>
                    <Link to="/">Главная</Link>
                    <Link to="/become-a-partner">Стать партнером</Link>
                    {/* <Link to="/trainings">Мой заказ</Link>*/}
                </BreadCrumbs>
                <h3 className="section__header">Стать партнером</h3>
            </TopBigBanner>

            <BecomeAPartner/>

            <Footer/>
        </div>;
    }
}

export default connect(
    state => ({}),
    {}
)(BecomeAPartnerPage);

