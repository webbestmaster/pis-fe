import React, {Component} from 'react';
import {connect} from 'react-redux';

class TopBigBanner extends Component {
    render() {
        const view = this;
        const {props, state} = view;
        const {app, backgroundImage = null, children} = props;

        const style = {};

        if (backgroundImage !== null) {
            style.backgroundImage = 'url(' + backgroundImage + ')';
        }

        return <div className="top-big-banner" style={style}>
            <div className="top-big-banner__overlay"/>
            <div className="hug">
                {children}
            </div>
        </div>;
    }
}

export default connect(
    state => ({
        app: state.app
    }),
    {}
)(TopBigBanner);
