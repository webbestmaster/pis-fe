import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
const globalAppConst = require('./../../app-const');

export default class MapView extends Component {
    render() {
        const view = this;
        const {props} = view;
        const {defaultCenter, pointList} = props;
        const mapProps = {
            key: defaultCenter.lat + '-' + defaultCenter.lng,
            defaultCenter: {
                lat: defaultCenter.lat,
                lng: defaultCenter.lng
            },
            defaultZoom: props.defaultZoom || 12
        };

        if (pointList) {
            return <GoogleMapReact {...mapProps} apiKey={globalAppConst.key.googleMap}>
                {pointList}
            </GoogleMapReact>;
        }

        return <GoogleMapReact {...mapProps}/>;
    }
}
