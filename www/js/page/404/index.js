import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import HeaderSimple from './../../components/header-simple';
import Footer from './../../components/footer';
import style from './style.m.scss';
import {metaTagMaster} from '../../module/meta-tag';

const image404 = require('./images/404.png');

class NotFoundPage extends Component {
    componentDidMount() {
        metaTagMaster.updateByUrl('/page-404');
    }

    render() {
        const view = this;
        const {props, state} = view;

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

