import React, {Component} from 'react';
import {connect} from 'react-redux';
import Form from './form';

class BecomeAPartner extends Component {
    render() {
        const view = this;
        const {props, state} = view;

        return <div className="hug hug--simple-page sale">
            <h3 className="section__header">Стать партнером</h3>
            <Form/>
        </div>;
    }
}

export default connect(
    state => ({}),
    {}
)(BecomeAPartner);

