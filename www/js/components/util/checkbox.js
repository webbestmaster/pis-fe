import React, {Component} from 'react';
import cnx from './../../helper/cnx';

export default class CheckboxLabel extends Component {
    render() {
        const view = this;
        const {props} = view;
        const {input = {}, label = {}} = props;

        return <label {...label} {...cnx('section__checkbox', {[label.className]: label.className})}>
            <input type="checkbox" {...input} {...cnx('section__checkbox-node', {[input.className]: input.className})}/>
            <span className="section__checkbox-state"/>
            {props.children}
        </label>;
    }
}
