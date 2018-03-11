// @flow
/* global window */
import React, {Component} from 'react';
import type {Node} from 'react';
import style from './style.m.scss';
import {Link} from 'react-router-dom';

export default class Footer extends Component<{}> {
    render(): Node {
        return <div className={style.footer__blog}>
            <section className="footer">
                <div className="section">
                    <p className="footer__text footer__text--copyright">
                        <span className="footer__logo"/>
                        &copy; {new Date().getFullYear()} PIS&trade;<br/>
                        Все права защищены
                    </p>
                    <p className="footer__text footer__text--part-1">
                        <Link to="/../clubs" target="_blank" className="footer__link">Клубы</Link>
                        <Link to="/../subscriptions" target="_blank" className="footer__link">Абонементы</Link>
                        <Link to="/../trainings" target="_blank" className="footer__link">Тренировки</Link>
                        <Link to="/" className="footer__link">Фитнес - Блог</Link>
                    </p>
                    <p className="footer__text footer__text--part-2">
                        <Link to="/../become-a-partner" target="_blank" className="footer__link">Стать партнером</Link>
                        <Link to="/../your-proposal" target="_blank" className="footer__link">Ваши предложения</Link>
                        <Link to="/../terms" target="_blank" className="footer__link">Пользовательское соглашение</Link>
                        <Link to="/../contacts" target="_blank" className="footer__link">Контакты</Link>
                    </p>
                    <p className="footer__text footer__text--part-3">
                        <Link to="/../about-cashback" target="_blank" className="footer__link">Бонусы</Link>
                        <Link to="/../about-us" target="_blank" className="footer__link">О нас</Link>
                        <Link to="/../public-offer" target="_blank" className="footer__link">Публичная оферта</Link>
                    </p>
                    <p className="footer__text footer__text--social">
                        <span className="footer__text footer__text--social-header">Мы в соц. сетях</span>
                        <a
                            className="footer__social-link footer__social-link--vk"
                            target="_blank"
                            href="https://vk.com/train_now"/>
                        <a
                            className="footer__social-link footer__social-link--instagram"
                            target="_blank"
                            href="https://www.instagram.com/people__in__sport"/>
                    </p>
                </div>
            </section>
        </div>;
    }
}
