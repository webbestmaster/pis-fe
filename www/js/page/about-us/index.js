import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import HeaderSimple from './../../components/header-simple';
import TopBigBanner from './../../components/top-big-banner';
import BreadCrumbs from './../../components/bread-crumbs';
import Footer from './../../components/footer';
import {metaTagMaster} from '../../module/meta-tag';

const topBanner = require('./../../../style/images/order/top-banner.png');

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
                <div className="section__text-wrapper section__text-wrapper--big-font">
                    <p>
                        Мы молоды и амбициозны, у нас много идей, и мы горим своей работой! У каждого из нас своя
                        социальная роль и сфера деятельности, но, несмотря на это, нами движет одно общее стремление –
                        развитие нашего проекта People in Sport. Мы не только партнеры - мы единомышленники,
                        вдохновленные идеей формирования здорового общества с правильными ценностями. Для нас важно
                        постоянно совершенствоваться как нравственно, так и профессионально, и мы хотим поделиться с
                        вами накопленными знаниями и умениями. Наша команда готова предложить то, что вам нужно:
                        быстроту, актуальность и достоверность получения информации, легкий поиск и удобную систему
                        бронирования любой тренировки.
                    </p>
                    <p>
                        People in Sport – это не просто доступная услуга,
                        People in Sport – это ваш помощник и друг!
                    </p>
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

