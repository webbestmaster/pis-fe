// @flow
/* global window */
import React, {Component} from 'react';
import type {Node} from 'react';
// import {Link} from 'react-router-dom';
import PisFooter from './../../../components/footer';

export default class Footer extends Component<{}> {
    render(): Node {
        return <div className="blog-footer">
            <PisFooter/>
        </div>;
    }
}
