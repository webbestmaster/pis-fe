// @flow
import React, {Component} from 'react';
import type {Node} from 'react';

type PropsType = {
    lineCap: number,
    children: string
};

export default class TextCap extends Component<PropsType> {
    splitText(text: string): Node[] {
        const chunkList = [];
        const view = this;
        const {props} = view;
        const {lineCap} = props;

        text
            .trim()
            .replace(/\s+/, ' ')
            .substr(0, lineCap ? 1000 : text.length)
            .split('\n')
            .map((textChunk: string): string => textChunk.trim())
            .filter((textChunk: string): string => textChunk)
            .forEach((textChunk: string, ii: number, arr: string[]) => {
                chunkList.push(textChunk);

                if (ii < arr.length - 1) {
                    chunkList.push(<br key={'br-0' + textChunk}/>, <br key={'br-1' + textChunk}/>);
                }
            });

        return chunkList;
    }

    render(): Node {
        const view = this;
        const {props} = view;
        const {lineCap} = props;

        return <p className={lineCap ? 'line-cap-' + lineCap : ''}>{view.splitText(props.children)}</p>;
    }
}
