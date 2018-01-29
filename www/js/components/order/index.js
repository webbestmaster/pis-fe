/* global setTimeout */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import classnames from 'classnames';

class Order extends Component {
    componentDidMount() {
        const view = this;

        view.state = {};
    }

    renderOrderInfo() {
        return <h1>order info</h1>;
    }

    renderUserInfo() {
        return <h1>user info</h1>;
    }

    renderPayingInfo() {
        return <h1>paying info</h1>;
    }

    render() {
        const view = this;
        const {props, state} = view;


        return <div>

            <Tabs>
                <div ref="swiperContainer" className="hug swiper-container">
                    <TabList className="swiper-wrapper">
                        <div className="swiper-slide">
                            <Tab>order info</Tab>
                            <Tab>user info</Tab>
                            <Tab>paying info</Tab>
                        </div>
                    </TabList>
                </div>

                <TabPanel>
                    {view.renderOrderInfo()}
                </TabPanel>
                <TabPanel>
                    {view.renderUserInfo()}
                </TabPanel>
                <TabPanel>
                    {view.renderPayingInfo()}
                </TabPanel>
            </Tabs>
            <div>
                <h1>
                    here is card
                </h1>
            </div>
        </div>;
    }
}

export default connect(
    state => ({
        // auth: state.auth
    }),
    {
        // login: authAction.login,
        // getSessionState: authAction.getSessionState,
        // openPopupPromo: authAction.openPopupPromo
    }
)(Order);
