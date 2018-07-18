import React, { Component } from 'react';
import './App.css';
import { restaurants } from './markers';
import { lazyLoad } from './helpers';
import Menu from './Menu';

export default class App extends Component {
  state = {
    map:'',
    infoWindow: '',
    markerInfo: '',
    menuMarkers: []
  }

  componentDidMount() {
    window.initMap = this.initMap;
    lazyLoad(`https://maps.googleapis.com/maps/api/js?key=AIzaSyACBd5J3gcjLEZtOx9nS5mUmc5peZJLd8M&callback=initMap`);
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

      // Create on click event listener to start fetching marker information on click
      marker.addListener('click', () => {
        this.fetchInfo(marker);
      })

      this.setState({ menuMarkers: this.state.menuMarkers.concat(marker) })
    })
  }
  
  // Fetch information for Info Window from Foursquare API
  fetchInfo = (marker) => {
    fetch(`https://api.foursquare.com/v2/venues/search?ll=${marker.getPosition().lat()},${marker.getPosition().lng()}&client_id=2JIVBXJ0QPNTLER3VX2WWLOTEECNX4L4L0TPEHJG5O1ZTFQ&client_secret=50UU2TDWN03BTXTNPJBR52IU1FC2ZABE2BGSBJKCYTZKHPJH&v=20180323&limit=1`)
    .then(res => res.json())
    .then(restaurant => {
      if (restaurant) {
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
      } else {
        console.log("There was an error retrieving data")
      }
    })
    .catch(err => console.error("Error", err))
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
        infoWindow.marker = null;
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
        <Menu expand={this.fetchInfo} menuMarkers={this.state.menuMarkers} map={this.state.map} />
        <div id="map" style={style}></div>
      </div>
    );
  }
}

