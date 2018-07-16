import React, { Component } from 'react';

const eventNames = ['click', 'mouseover'];

export default class Marker extends Component {
    componentDidUpdate(prevProps) {
        if ((this.props.map !== prevProps.map) ||
          (this.props.position !== prevProps.position)) {
            this.renderMarker();
        }
    }

    renderMarker() {
        let { map, google, position, mapCenter } = this.props;

        let pos = position || mapCenter;
        position = new google.maps.LatLng(pos.lat, pos.lng);

        const pref = { map: map, position: position };
        this.marker = new google.maps.Marker(pref);

        eventNames.forEach(e => {
            this.marker.addListener(e, this.handleEvent(e));
        })
    }

    handleEvent(evtName) {
        return (e) => {
            console.log(e)
            const evtName = `on${e}`
            if (this.props[evtName]) {
                this.props[evtName](this.props, this.marker, e);
            }
        }
    }

    render() {
        return null;
    }
}