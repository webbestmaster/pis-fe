import React, {Component} from 'react';
import {metaTagMaster} from './../../module/meta-tag';
import classnames from 'classnames';

import Header from './../../components/header';
import Sale from './../../components/sale';
import PromoSteps from './../../components/promo-steps';
import OurPartners from './../../components/our-partners';
import PromoInstagram from './../../components/promo-instagram';
import Footer from './../../components/footer';
import LazyLoad from 'react-lazy-load';
import {connect} from 'react-redux';

const lazyVerticalOffset = 300;
const lazyThrottleTimeout = 100;

class Home extends Component {
    constructor() {
        super();

        const view = this;

        view.state = {
            isLoaded: {
                ourPartners: false,
                promoInstagram: false,
                promoSteps: false,
                sale: false
            }
        };
    }

    componentDidMount() {
        metaTagMaster.updateByUrl('/index');
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {isLoaded} = state;

        return <div>
            <Header/>
            <div className={classnames('fade-out', {'fade-out_visible': isLoaded.sale})}>
                <LazyLoad
                    debounce={false}
                    throttle={lazyThrottleTimeout}
                    height={isLoaded.sale ? 'auto' : 741}
                    offsetVertical={lazyVerticalOffset}
                    onContentVisible={() => view.setState(prevState => {
                        Object.assign(prevState.isLoaded, {sale: true});
                        return prevState;
                    })}>
                    <Sale/>
                </LazyLoad>
            </div>
            <div className={classnames('fade-out', {'fade-out_visible': isLoaded.promoSteps})}>
                <LazyLoad
                    debounce={false}
                    throttle={lazyThrottleTimeout}
                    height={isLoaded.promoSteps ? 'auto' : 502}
                    offsetVertical={lazyVerticalOffset}
                    onContentVisible={() => view.setState(prevState => {
                        Object.assign(prevState.isLoaded, {promoSteps: true});
                        return prevState;
                    })}>
                    <PromoSteps/>
                </LazyLoad>
            </div>
            <div className={classnames('fade-out', {'fade-out_visible': isLoaded.ourPartners})}>
                <LazyLoad
                    debounce={false}
                    throttle={lazyThrottleTimeout}
                    height={isLoaded.ourPartners ? 'auto' : 891}
                    offsetVertical={lazyVerticalOffset}
                    onContentVisible={() => view.setState(prevState => {
                        Object.assign(prevState.isLoaded, {ourPartners: true});
                        return prevState;
                    })}>
                    <OurPartners/>
                </LazyLoad>
            </div>
            <div className={classnames('fade-out', {'fade-out_visible': isLoaded.promoInstagram})}>
                <LazyLoad
                    debounce={false}
                    throttle={lazyThrottleTimeout}
                    height={isLoaded.promoInstagram ? 'auto' : 634}
                    offsetVertical={lazyVerticalOffset * 2}
                    onContentVisible={() => view.setState(prevState => {
                        Object.assign(prevState.isLoaded, {promoInstagram: true});
                        return prevState;
                    })}>
                    <PromoInstagram/>
                </LazyLoad>
            </div>
            <Footer/>
        </div>;
    }
}

export default connect(
    state => ({
        app: state.app
    }),
    {}
)(Home);
