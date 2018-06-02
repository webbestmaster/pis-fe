import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import HeaderSimple from './../../components/header-simple';
import TopBigBanner from './../../components/top-big-banner';
import BreadCrumbs from './../../components/bread-crumbs';
import Footer from './../../components/footer';
import {metaTagMaster} from '../../module/meta-tag';

const topBanner = require('./../../../style/images/contacts/top-banner.jpg');

const defaultMetaData = {
    title: 'Контакты'
};

class ContactsPage extends Component {
    componentDidMount() {
        metaTagMaster.updateByUrl('/contacts', defaultMetaData);
    }

    render() {
        const view = this;
        const {props, state} = view;

        return <div>
            <HeaderSimple/>
            <TopBigBanner backgroundImage={topBanner}>
                <BreadCrumbs>
                    <Link to="/">Главная</Link>
                    <Link to="/contacts">{defaultMetaData.title}</Link>
                </BreadCrumbs>
                <h1 className="section__header">{defaultMetaData.title}</h1>
            </TopBigBanner>

            <div className="hug hug--simple-page">
                <h3 className="section__header">Связаться с нами:</h3>
                <div className="section__text-wrapper">
                    <p>
                        ООО «АтлантСпорт»<br/>
                        220035 г.Минск, ул.Игнатенко, 4, 3 этаж, оф. 303<br/>
                        Р/с BY47PJCB30120553771000000933 BYN<br/>
                        ОАО «Приорбанк» ЦБУ №101 БИК PJCBBY2X<br/>
                        УНП 193049971 ОКПО 501645925000
                    </p>
                    <p>Телефон:&nbsp;&nbsp;<a href="tel:375291882699">+375 (29) 188-26-99</a></p>
                    <p>E-mail:&nbsp;&nbsp;<a href="mailto:admin@pis.by">admin@pis.by</a></p>
                </div>
            </div>

            <Footer/>
        </div>;
    }
}

export default connect(
    state => ({}),
    {}
)(ContactsPage);

