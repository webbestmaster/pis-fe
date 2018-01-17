
import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as rightPanelAction from './action';

class PublicSettingsView extends Component {
    render() {
        return <div className="exist-group-settings">
            <label className="exist-group-settings__switch-wrapper">
                Notification
                <input type="checkbox" className="exist-group-settings__hidden-input"/>
                <div className="exist-group-settings__switcher"/>
            </label>
        </div>;
    }
}

export default connect(
    state => ({
        rightPanel: state.mainState.rightPanel
    }),
    {
        setVisibleState: rightPanelAction.setVisibleState
    }
)(PublicSettingsView);




import {combineReducers} from 'redux';
const rightPanelConst = require('./const.json');

export default combineReducers({
    isOpen: (isOpen = false, {type, payload}) => {
        if (type !== rightPanelConst.type.setVisibleState) {
            return isOpen;
        }

        return payload.isOpen;
    },
    visibleIncludes: (includes = [], {type, payload}) => {
        if (type !== rightPanelConst.type.setVisibleIncludes) {
            return includes;
        }

        return payload.includes;
    }
});






