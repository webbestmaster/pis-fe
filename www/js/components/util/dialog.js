import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
    paper: {
        padding: 0,
        backgroundColor: 'transparent',
        width: 'auto',
        height: 'auto',
        maxWidth: '100%',
        maxHeight: '100%',
        margin: 10,
        borderRadius: 0,
        boxShadow: 'none'
    }
};

class CleanDialog extends Component {
    render() {
        const {props} = this;

        return <Dialog classes={{paper: props.classes.paper}} {...props}>{props.children}</Dialog>;
    }
}

export default withStyles(styles)(CleanDialog);
