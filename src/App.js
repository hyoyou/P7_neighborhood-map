import React, { Component } from 'react';
import GoogleApiComponent from '../node_modules/google-maps-react/dist/GoogleApiComponent';
import { Map, Marker, InfoWindow } from 'google-maps-react';
import './App.css';
// import Marker from './Marker';
import { restaurants } from './markers';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurants: restaurants,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
  }

  // markerInfo = (event) => {
  //   InfoWindow.open(map, this)

  //   this.setState({
  //     showingInfoWindow: true,
  //     selectedPlace: event.name
  //   })
  // }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }
  
  render() {
    const style = {
      width: '100vw',
      height: '100vh'
    }

    return (
      <div>
        <div id="map" style={style}>
          <Map google={this.props.google}>
            {restaurants.map((restaurant, index) => (
              <div key={index}>
                <Marker onClick={this.markerInfo} name={restaurant.name} position={restaurant.pos} />
                <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow} mapCenter={restaurant.pos} >
                  <h1>Restaurant</h1>
                </InfoWindow>
              </div>
            ))}
          </Map>
        </div>
      </div>
    );
  }
}

export default GoogleApiComponent({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY
})(App);
