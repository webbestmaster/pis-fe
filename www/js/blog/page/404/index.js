// @flow
import React, {Component} from 'react';
import type {Node} from 'react';
import {metaTagMaster} from './../../../module/meta-tag';
import TopBanner from './../../components/top-banner';
import Footer from './../../components/footer';
import Header from './../../components/header';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import style from './../../../page/404/style.m.scss';

const image404 = require('./../../../page/404/images/404.png');

class NotFoundPage extends Component<{}> {
    componentDidMount() {
        metaTagMaster.updateByUrl('/page-404');
    }

    render(): Node {
        return <div>
            <TopBanner/>
            <Header/>

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

