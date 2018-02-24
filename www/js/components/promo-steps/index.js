import React, {Component} from 'react';

const promoStepsImage = require('./../../../style/images/promo-steps/promo-steps-image.png');

export default class PromoSteps extends Component {
    // constructor() {
    //     super();
    // }

    render() {
        return <section className="section promo-steps">
            <div className="hug">
                <h3 className="section__header section__header--white">Начни путь к цели уже сегодня</h3>
                <div className="promo-step-card">
                    <span className="promo-step-card__number">01</span>
                    <div className="promo-step-card__icon promo-step-card__icon--step-1"/>
                    <p className="promo-step-card__name">Зарегистрируйся</p>
                </div>
                <div className="promo-step-card">
                    <span className="promo-step-card__number">02</span>
                    <div className="promo-step-card__icon promo-step-card__icon--step-3"/>
                    <p className="promo-step-card__name">Выбери занятие</p>
                </div>
                <div className="promo-step-card">
                    <span className="promo-step-card__number">03</span>
                    <div className="promo-step-card__icon promo-step-card__icon--step-2"/>
                    <p className="promo-step-card__name">Забронируй</p>
                </div>
                <div className="promo-step-card">
                    <span className="promo-step-card__number">04</span>
                    <div className="promo-step-card__icon promo-step-card__icon--step-4"/>
                    <p className="promo-step-card__name">Занимайся сейчас</p>
                </div>
            </div>
            <img src={promoStepsImage} className="promo-steps__image" alt=""/>
        </section>;
    }
}
