import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {resolveImagePath} from './../../../helper/path-x';
import style from './../style.m.scss';

class Favorite extends Component {
    render() {
        const view = this;
        const {props, state} = view;

        return <div className="hug">
            <h3 className="section__header">Избранное</h3>

            <p className={style.favorite__description}>
                Здесь сохранены все Ваши тренировки. Чтобы убрать тренировку из избранного, нажмите
                <span className={style.favorite__description_heart}/>
            </p>

        </div>;
    }
}

export default connect(
    state => ({
        app: state.app,
        auth: state.auth
    }),
    {
    }
)(Favorite);

