import React, { Component } from 'react';
import GoogleApiComponent from '../node_modules/google-maps-react/dist/GoogleApiComponent';
import { Map, Marker } from 'google-maps-react';
import './App.css';
import { restaurants } from './markers';

class App extends Component {
  state = {
    restaurants
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
            <Marker />
          </Map>
        </div>
      </div>
    );
  }
}

export default GoogleApiComponent({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY
})(App);
