import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './App.css';

class App extends Component {
  static defaultProps = {
    center: {
      lat: 28.4753086,
      lng: -81.4693343
    },
    zoom: 12
  };

  render() {
    return (
      <div>
        <div id="map" style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          ></GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default App;
