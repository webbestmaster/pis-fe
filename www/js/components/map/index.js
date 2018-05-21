import React, {Component} from 'react';
// import GoogleMapReact from 'google-map-react';

const globalAppConst = require('./../../app-const');

export default class MapView extends Component {
    constructor() {
        super();

        const view = this;

        view.state = {
            GoogleMapReact: null
        };
    }

    componentDidMount() {
        const view = this;

        import(/* webpackChunkName: "google-map-react" */ 'google-map-react')
            .then(GoogleMapReact => {
                view.setState({GoogleMapReact: GoogleMapReact.default});
            });
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {GoogleMapReact} = state;
        const {defaultCenter, pointList} = props;
        const mapProps = {
            key: defaultCenter.lat + '-' + defaultCenter.lng,
            defaultCenter: {
                lat: defaultCenter.lat,
                lng: defaultCenter.lng
            },
            defaultZoom: props.defaultZoom || 12
        };

        if (!GoogleMapReact) {
            return null;
        }

        if (pointList) {
            return <GoogleMapReact {...mapProps} bootstrapURLKeys={{key: globalAppConst.key.googleMap}}>
                {pointList}
            </GoogleMapReact>;
        }

        return <GoogleMapReact {...mapProps}/>;
    }
}
