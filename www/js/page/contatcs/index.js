import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import HeaderSimple from './../../components/header-simple';
import TopBigBanner from './../../components/top-big-banner';
import BreadCrumbs from './../../components/bread-crumbs';
import Footer from './../../components/footer';
import {metaTagMaster} from '../../module/meta-tag';

const topBanner = require('./../../../style/images/contacts/top-banner.jpg');

class ContactsPage extends Component {
    componentDidMount() {
        metaTagMaster.updateByUrl('/contacts');
    }

    render() {
        const view = this;
        const {props, state} = view;

        return <div>
            <HeaderSimple/>
            <TopBigBanner backgroundImage={topBanner}>
                <BreadCrumbs>
                    <Link to="/">Главная</Link>
                    <Link to="/contacts">Контакты</Link>
                </BreadCrumbs>
                <h3 className="section__header">Контакты</h3>
            </TopBigBanner>

            <div className="hug hug--simple-page">
                <h3 className="section__header">Связаться с нами:</h3>
                <div className="section__text-wrapper">
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
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

