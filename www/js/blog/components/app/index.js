// @flow
import React, {Component} from 'react';
import type {Node} from 'react';
import {Switch, Route, Link, BrowserRouter} from 'react-router-dom';

import Home from './../../page/home';
import Category from './../../page/category';
import Article from './../../page/article';

/*
import Clubs from './../../page/clubs';
import Club from './../../page/club';
import Subscriptions from './../../page/subscriptions';
import Subscription from './../../page/subscription';
import Trainings from './../../page/trainings';
import Training from './../../page/training';
import User from './../../page/user';
import ForgotPassword from './../../page/forgot-password';
import Terms from './../../page/terms';
import OrderTraining from './../../page/order-training';
import OrderSubscription from './../../page/order-subscription';
import NotFoundPage from './../../page/404';
import AboutCashback from './../../page/about-cashback';
import AboutUs from './../../page/about-us';
import BecomeAPartner from './../../page/become-a-partner';
import PublicOffer from './../../page/public-offer';
import YourProposal from './../../page/your-proposal';
import Auth from './../auth';
*/

export default (): Node =>
    <BrowserRouter basename="/blog">
        <Switch>
            <Route path='/' component={Home} exact/>
            <Route path='/category' component={Category} exact/>
            <Route path='/article' component={Article} exact/>
        </Switch>
    </BrowserRouter>
;
