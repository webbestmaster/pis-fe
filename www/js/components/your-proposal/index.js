import React, {Component} from 'react';
import {connect} from 'react-redux';
import {metaTagMaster} from '../../module/meta-tag';
import Form from './form';

class YourProposal extends Component {
    componentDidMount() {
        metaTagMaster.updateByUrl('/your-proposal');
    }

    render() {
        const view = this;
        const {props, state} = view;

        return <div className="hug hug--simple-page">
            <h3 className="section__header">Ваши предложения</h3>
            <Form/>
        </div>;
    }
}

export default connect(
    state => ({}),
    {}
)(YourProposal);

