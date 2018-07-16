import React, { Component } from 'react';
import GoogleApiComponent from '../node_modules/google-maps-react/dist/GoogleApiComponent';
import { Map } from 'google-maps-react';
import './App.css';
import Marker from './Marker';
import { restaurants } from './markers';

class App extends Component {
  state = {
    restaurants
  }

  markerInfo = (event) => {
    console.log(event.name)
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
            { restaurants.map(restaurant =>
              <Marker onClick={this.markerInfo} name={restaurant.name} position={restaurant.pos} key={restaurant.name} />
            )}
          </Map>
        </div>
      </div>
    );
  }
}

export default GoogleApiComponent({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY
})(App);
