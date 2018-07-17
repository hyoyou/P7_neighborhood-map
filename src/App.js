import React, { Component } from 'react';
import './App.css';
import { restaurants } from './markers';
import Menu from './Menu';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map:'',
      infoWindow: '',
      markerInfo: '',
      menuMarkers: []
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
      center: {lat: 28.475996, lng: -81.473441}
    });
    let infoWindow = new window.google.maps.InfoWindow();

    this.renderMarkers(map);
    this.setState({ map, infoWindow })
  }

  // Render the markers for each restaurant
  renderMarkers = (map) => {
    restaurants.map(restaurant => {
      let marker = new window.google.maps.Marker({
        map: map,
        position: restaurant.pos,
        title: restaurant.name,
        animation: window.google.maps.Animation.DROP
      })

      // Create on click event listener to open infoWindow
      marker.addListener('click', () => {
        this.fetchInfo(marker);
      })

      this.setState({ menuMarkers: this.state.menuMarkers.concat(marker) })
    })
  }

  // Open Info Window for each marker when clicked
  openInfoWindow = (map, marker) => {
    let { infoWindow } = this.state;
    
    // Check that infoWindow is not already opened for this marker
    if (infoWindow.marker !== marker) {
      infoWindow.marker = marker;
      infoWindow.setContent(this.state.markerInfo);
      infoWindow.open(map, marker)
      // Clear marker property when infoWindow is closed
      infoWindow.addListener('closeclick', function() {
        infoWindow.marker = null
      })
    }
  }

  // Fetch information for Info Window from Foursquare API
  fetchInfo = (marker) => {
    fetch(`https://api.foursquare.com/v2/venues/search?ll=${marker.getPosition().lat()},${marker.getPosition().lng()}&client_id=${process.env.REACT_APP_FOURSQUARE_CLIENT_ID}&client_secret=${process.env.REACT_APP_FOURSQUARE_SECRET}&v=20180323&limit=1`)
    .then(res => res.json())
    .then(restaurant => {
      let rest = restaurant.response.venues[0];
      let name = rest.name;
      let category = rest.categories[0].name;
      let address = rest.location.formattedAddress[0];
      
      let info = `<div id='marker'>
                    <h2 aria-label='Name of Restaurant'>${name}</h2>
                    <h3 aria-label='Category'>${category}</h3>
                    <p aria-label='Location'><strong>Located at:</strong> ${address}</p>
                  </div>`
      
      this.setState({ markerInfo: info });
      this.openInfoWindow(this.state.map, marker);
    })
    .catch(err => console.error(err))
  } 
  
  render() {
    const style = {
      width: '100vw',
      height: '100vh'
    }

    return (
      <div>
        <Menu infoWindow={this.state.infoWindow} expand={this.fetchInfo} menuMarkers={this.state.menuMarkers} map={this.state.map} />
        <div id="map" style={style}></div>
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

