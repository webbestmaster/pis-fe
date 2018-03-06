// @flow

/* global window */
import React, {Component} from 'react';
import type {Node} from 'react';
import style from './style.m.scss';
import classnames from 'classnames';

type PropsType = {|
    className?: string;
    style?: { [key: string]: string | number };
    date: string;
    count: number
|};

export default class EyeCounter extends Component<PropsType> {
    render(): Node {
        const view = this;
        const {props} = view;
        const {className = '', date, count} = props;

        return <span style={props.style || {}} className={classnames(style.block, className)}>
            <span className={style.counter}>{count}</span>
            <span className={style.date}>{date}</span>
        </span>;
    }
}
