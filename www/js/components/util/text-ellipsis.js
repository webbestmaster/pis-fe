import React, {Component} from 'react';
// import classnames from 'classnames';

export default class TextEllipsis extends Component {
    splitText(text) {
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

        if (resultText.length > charCap) {
            chunkList.push(<span>&hellip;</span>);
            chunkList.push(props.readMore);
        }

        return chunkList;
    }

    render() {
        const view = this;
        const {props} = view;

        return <p>{view.splitText(props.children)}</p>;
    }
}
