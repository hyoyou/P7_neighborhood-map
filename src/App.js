import React, { Component } from 'react';
import './App.css';
import { restaurants } from './markers';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurants: restaurants,
      infoWindow: ''
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
    });
    let infoWindow = new window.google.maps.InfoWindow();

    this.renderMarkers(map);
    this.setState({ infoWindow })
  }

  // Render the markers for each restaurant
  renderMarkers = (map) => {
    this.state.restaurants.map(restaurant => {
      let marker = new window.google.maps.Marker({
        map: map,
        position: restaurant.pos,
        title: restaurant.name,
        animation: window.google.maps.Animation.DROP
      })

      // Create on click event listener to open infoWindow
      marker.addListener('click', () => {
        this.openInfoWindow(map, marker)
      })
    })
  }

  // Open Info Window for each marker when clicked
  openInfoWindow = (map, marker) => {
    let { infoWindow } = this.state;

    // Check that infoWindow is not already opened for this marker
    if (infoWindow.marker !== marker) {
      infoWindow.marker = marker;
      infoWindow.setContent(`<div>${marker.title}</div>`);
      infoWindow.open(map, marker)
      // Clear marker property when infoWindow is closed
      infoWindow.addListener('closeclick', function() {
        infoWindow.marker = null
      })
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

