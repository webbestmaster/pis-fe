import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';
// import HeaderSimple from './../components/header-simple';
// import TopBigBanner from './../components/top-big-banner';

// const topBanner = require('./../../style/images/clubs/top-banner.png');

export default class BreadCrumbs extends Component {
    modifyChildren(child) {
        const {props} = child;

        const updatedProps = Object.assign({}, props, {className: classnames(props.className, 'bread-crumbs__link')});

        return React.cloneElement(child, updatedProps);
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {children} = props;

        return <nav className="bread-crumbs">
            {React.Children
                .map(children,
                    (child, ii) => ii === 0 ?
                        view.modifyChildren(child) :
                        [<span className="bread-crumbs__arrow"/>, view.modifyChildren(child)]
                )
            }
        </nav>;
    }
}
