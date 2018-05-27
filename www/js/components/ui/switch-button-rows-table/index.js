import React, {PureComponent} from 'react';
import style from './style.m.scss';
import classnames from 'classnames';

export default class SwitchButtonRowsTable extends PureComponent {
    render() {
        const view = this;
        const {props} = view;
        const {activeButton, setTable, setList} = props;

        return <div className={style.wrapper}>
            <div
                onClick={setTable}
                className={classnames(
                    style.button,
                    style.button__table,
                    {[style.button__active]: activeButton === 'table'}
                )}/>
            <div
                onClick={setList}
                className={classnames(
                    style.button,
                    style.button__list,
                    {[style.button__active]: activeButton === 'list'}
                )}/>
        </div>;
    }
}
