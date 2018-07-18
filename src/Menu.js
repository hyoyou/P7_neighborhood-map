import React, { Component } from 'react';
import './Menu.css';

export default class Menu extends Component {
    state = {
        markers: ''
    }

    componentDidMount() {
        this.setState({ markers: this.props.menuMarkers })
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.markers !== nextProps.menuMarkers) {
            this.setState({ markers: nextProps.menuMarkers })
        }
    }

    // Toggle function to show and hide sidebar
    toggleShow = () => {
        const menuList = document.querySelector('.menuList');

        menuList.style.display === 'none' ? menuList.style.display = 'block' : menuList.style.display = 'none';
    }

    filter = (event) => {
        // Close any open Info Windows when user types in query
        let { infoWindow } = this.props;
        infoWindow.close(); 

        let query = event.target.value;
        let allMarkers = this.props.menuMarkers;
        let filteredMarkers = [];

        // Matcher function: Loops through markers and checks for matches in lower-cased strings at any index
        allMarkers.forEach(function (marker) {
            if (marker.title.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                marker.setVisible(true);
                filteredMarkers.push(marker);
            } else {
                marker.setVisible(false);
            }
        })

        this.setState({ markers: filteredMarkers });
    }

    render() {
        const { markers } = this.state;

        return (
            <nav className="menu">
                <div id="list-toggle" className="hamburger" onClick={this.toggleShow} onKeyPress={this.toggleShow} tabIndex="0" role="button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z"></path>
                    </svg>
                </div>
                <div className="menuList">
                    <label htmlFor="search"><strong>Filter: </strong></label>
                    <input id="search" type="text" placeholder="Type query here..." onChange={this.filter} />
                    <ul id="markerList" role="menu">
                        {markers.length > 0 && markers.map((marker) => (
                            <li key={marker.title}>
                                <a id="listItem" onClick={() => this.props.expand(marker)} onKeyUp={() => this.props.expand(marker)} tabIndex="0" role="menuitem">{marker.title}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        )
    }
}