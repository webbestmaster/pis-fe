import React, {Component} from 'react';
import classnames from 'classnames';

export default class Rating extends Component {
    render() {
        const view = this;
        const {props} = view;
        const {rating, className, star, activeStar} = props;
        const ratingInt = Math.round(parseFloat(rating));
        const stars = [];
        let ii = 0;

        for (; ii < 5; ii += 1) {
            stars.push(<div key={ii} className={classnames(star, {[activeStar]: ii < ratingInt})}/>);
        }

        return <div className={className}>{stars}</div>;
    }
}
