import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import HeaderSimple from './../../components/header-simple';
import TopBigBanner from './../../components/top-big-banner';
import BreadCrumbs from './../../components/bread-crumbs';
import Footer from './../../components/footer';
import {metaTagMaster} from '../../module/meta-tag';

const topBanner = require('./../../../style/images/order/top-banner.png');

const fishText = 'Замечательный клуб В самом центре. Радует выбор. атмосфера неповторимая, как в' +
    ' настоящем клубе. Интерьер грандиозный. Кажется тут советская Яма была раньше - очень ' +
    'крутое помещение - красавцы. Приветливые тренера, обходительный персонал. Обязательно ' +
    'зайдем сюда еще раз. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ' +
    'cumque ipsam molestias possimus quaerat. Dolorem fugiat fugit similique soluta ' +
    'temporibus. Delectus facilis optio qui unde velit vitae! Necessitatibus, ' +
    'nulla suscipit?';

class AboutUs extends Component {
    componentDidMount() {
        metaTagMaster.updateByUrl('/about-us');
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
                    <Link to="/about-us">О нас</Link>
                    {/* <Link to="/trainings">Мой заказ</Link>*/}
                </BreadCrumbs>
                <h3 className="section__header">О нас</h3>
            </TopBigBanner>

            <div className="hug hug--simple-page">
                <h3 className="section__header">О нас</h3>
                <div className="section__text-wrapper">
                    <p>{fishText}</p>
                    <p>{fishText}</p>
                    <p>{fishText}</p>
                    <p>{fishText}</p>
                </div>
            </div>
            <Footer/>
        </div>;
    }
}

export default connect(
    state => ({}),
    {}
)(AboutUs);

