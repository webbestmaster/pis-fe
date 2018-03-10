// @flow

import React, {Component} from 'react';
import type {Node} from 'react';
import classnames from 'classnames';
import style from './style.m.scss';
import sectionStyle from './../../style/css/sercion.m.scss';

type PropsType = {
    children: Array<Node>
};

type StateType = {||};

export default class BreadCrumbs extends Component<PropsType, StateType> {
    modifyChildren(child: Node): Node {
        const {props} = child;

        const updatedProps = Object.assign({}, props, {className: classnames(props.className, style.link)});

        return React.cloneElement(child, updatedProps);
    }

    render(): Node {
        const view = this;
        const {props, state} = view;
        const {children} = props;

        return <nav className={style.block}>
            <div className={sectionStyle.blog_section_content}>
                {React.Children
                    .map(children,
                        (child: Node, ii: number): Array<Node> => ii === 0 ?
                            view.modifyChildren(child) :
                            [<span className={style.arrow}/>, view.modifyChildren(child)]
                    )
                }
            </div>
        </nav>;
    }
}
