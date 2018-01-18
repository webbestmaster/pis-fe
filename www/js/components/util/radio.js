import React, {Component} from 'react';
import cnx from './../../helper/cnx';

export default class RadioLabel extends Component {
    render() {
        const view = this;
        const {props} = view;
        const {input = {}, label = {}} = props;

        return <label {...label} {...cnx('section__radio', {[label.className]: label.className})}>
            <input type="radio" {...input} {...cnx('section__radio-node', {[input.className]: input.className})}/>
            <span className="section__radio-state"/>
            {props.children}
        </label>;
    }
}
