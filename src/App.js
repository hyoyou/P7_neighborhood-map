import React, { Component } from 'react';
import './App.css';
import { restaurants } from './markers';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurants: restaurants,
      activeMarker: {},
      selectedPlace: {}
    }
  }

  componentDidMount() {
    window.initMap = this.initMap;
    createMapLink(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&callback=initMap`);
  }

  // Create new Google map with center at Universal Studios Orlando
  initMap = () => {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: {lat: 28.4753086, lng: -81.4693343}
    })

    this.renderMarkers(map);
  }

  // Render the markers for the restaurants
  renderMarkers = (map) => {
    this.state.restaurants.map(restaurant => {
      let marker = new window.google.maps.Marker({
        position: restaurant.pos,
        map: map
      })
    })
  }
  
  render() {
    const style = {
      width: '100vw',
      height: '100vh'
    }

    return (
      <div>
        <div id="map" style={style}>
          
        </div>
      </div>
    );
  }
}

// Add Google Map to page dynamically through asynchronous code injection
function createMapLink(url) {
  let script = window.document.createElement('script');
  script.src = url;
  script.async = true;
  
  script.onerror = function() {
    document.write("Error loading Google Maps")
  }

  document.body.appendChild(script);
}

export default App;

