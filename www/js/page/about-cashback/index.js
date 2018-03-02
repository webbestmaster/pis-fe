import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import HeaderSimple from './../../components/header-simple';
import TopBigBanner from './../../components/top-big-banner';
import BreadCrumbs from './../../components/bread-crumbs';
import Footer from './../../components/footer';
import {metaTagMaster} from '../../module/meta-tag';

const topBanner = require('./../../../style/images/order/top-banner.png');

class AboutCashback extends Component {
    componentDidMount() {
        metaTagMaster.updateByUrl('/about-cashback');
    }

    render() {
        const view = this;
        const {props, state} = view;

        return <div>
            <HeaderSimple/>
            <TopBigBanner backgroundImage={topBanner}>
                <BreadCrumbs>
                    <Link to="/">Главная</Link>
                    <Link to="/about-cashback">Бонусы</Link>
                    {/* <Link to="/trainings">Мой заказ</Link>*/}
                </BreadCrumbs>
                <h3 className="section__header">Бонусы</h3>
            </TopBigBanner>

            <div className="hug hug--simple-page">
                <h3 className="section__header">Бонусы</h3>
                <div className="section__text-wrapper section__text-wrapper--big-font">

                    <p className="bold">Станьте частью проекта People in Sport и занимайтесь бесплатно!</p>

                    <p>Бонусы начинают начисляться сразу после регистрации. Для того чтобы их накопить, вам необходимо
                        совершить бронирование абонемента/тренировки/процедуры на нашем сайте.</p>
                    <p>Каждый раз, бронируя и оплачивая абонемент/тренировку/процедуру, вы получаете 10 % от стоимости в
                        бонусах и можете оплачивать до 100 % от стоимости покупки.</p>
                    <p style={{fontSize: 14}}>* 1 бонус = 1 белорусский рубль</p>

                </div>
            </div>
            <Footer/>
        </div>;
    }
}

export default connect(
    state => ({}),
    {}
)(AboutCashback);

