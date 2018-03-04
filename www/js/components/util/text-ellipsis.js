// @flow
import React, {Component} from 'react';
import type {Node} from 'react';

type PropsType = {
    readMore: Node,
    charCap: number,
    children: string
};

export default class TextEllipsis extends Component<PropsType> {
    splitText(text: string): Node[] {
        const chunkList = [];
        const view = this;
        const {props} = view;
        const {charCap} = props;

        const resultText = text
            .trim()
            .replace(/\s+/, ' ');

        resultText
            .substr(0, charCap)
            .split('\n')
            .map((textChunk: string): string => textChunk.trim())
            .filter((textChunk: string): string => textChunk)
            .forEach((textChunk: string, ii: number, arr: string[]) => {
                chunkList.push(textChunk);

                if (ii < arr.length - 1) {
                    chunkList.push(<br key={'br-0' + textChunk}/>, <br key={'br-1' + textChunk}/>);
                }
            });

        if (resultText.length > charCap) {
            chunkList.push(props.readMore);
        }

        return chunkList;
    }

    render(): Node {
        const view = this;
        const {props} = view;

        return <p>{view.splitText(props.children)}</p>;
    }
}
