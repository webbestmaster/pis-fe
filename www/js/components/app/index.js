/* global window */
import React, {Component} from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import Home from './../../page/home';
import Clubs from './../../page/clubs';
import Club from './../../page/club';
import Subscriptions from './../../page/subscriptions';
import Subscription from './../../page/subscription';
import Trainings from './../../page/trainings';
import Training from './../../page/training';
import User from './../../page/user';
import ForgotPassword from './../../page/forgot-password';
import Terms from './../../page/terms';
import Auth from './../auth';

/*
export default class App extends Component {
    render() {
        const view = this;
        const {props, state} = view;

        return <Switch>
            <Route path='/' component={Home} exact/>
            <Route path='/clubs' component={Clubs} exact/>
            <Route path='/subscriptions' component={Subscriptions} exact/>
            <Route path='/trainings' component={Trainings} exact/>

            <Route path='/club/:clubId' component={Club} exact/>
            <Route path='/subscription/:subscriptionId' component={Subscription} exact/>
            <Route path='/training/:trainingId' component={Training} exact/>
        </Switch>;
    }
}
*/

export default () => [
    <Switch key="switch">
        <Route path='/' component={Home} exact/>
        <Route path='/clubs' component={Clubs} exact/>
        <Route path='/subscriptions' component={Subscriptions} exact/>
        <Route path='/trainings' component={Trainings} exact/>

        <Route path='/club/:clubId' component={Club} exact/>
        <Route path='/club/:clubId/tab-index/:tabIndex' component={Club} exact/>
        <Route path='/subscription/:subscriptionId' component={Subscription} exact/>
        <Route path='/training/:trainingId' component={Training} exact/>

        <Route path='/user/' component={User} exact/>
        <Route path='/forgotPassword/' component={ForgotPassword} exact/>
        <Route path='/terms/' component={Terms} exact/>

        {/* <Route component={NoMatch}/> 404page*/}
    </Switch>,
    <Auth key="auth"/>
];
