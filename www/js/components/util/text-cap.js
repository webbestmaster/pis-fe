import React, {Component} from 'react';
// import classnames from 'classnames';

export default class TextCap extends Component {
    constructor() {
        super();

        const view = this;

        view.state = {
            isCapped: true
        };
    }

    splitText(text) {
        const chunkList = [];
        const view = this;
        const {props} = view;
        const {lineCap} = props;

        text
            .trim()
            .replace(/\s+/, ' ')
            .substr(0, lineCap ? 1000 : text.length)
            .split('\n')
            .map(textChunk => textChunk.trim())
            .filter(textChunk => textChunk)
            .forEach((textChunk, ii, arr) => {
                if (!textChunk) {
                    return;
                }
                chunkList.push(textChunk);

                if (ii < arr.length - 1) {
                    chunkList.push(<br key={'br-0' + textChunk}/>, <br key={'br-1' + textChunk}/>);
                }
            });

        return chunkList;
    }

    render() {
        const view = this;
        const {props} = view;
        const {lineCap} = props;

        return <p className={lineCap ? 'line-cap-' + lineCap : ''}>{view.splitText(props.children)}</p>;
    }
}
