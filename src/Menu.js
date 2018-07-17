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
            // console.log(nextProps)
            this.setState({ markers: nextProps.menuMarkers })
        }
    }

    // Toggle function to show and hide sidebar
    toggleShow = () => {
        const menuList = document.querySelector('.menuList');

        menuList.style.display === 'none' ? menuList.style.display = 'block' : menuList.style.display = 'none';
    }

    filter = (event) => {
        let query = event.target.value;
        // console.log(query)
        // let filteredMarkers = this.state.markers.filter(marker => marker.title.toLowerCase() == query.toLowerCase())
        let allMarkers = this.props.menuMarkers;
        let filteredMarkers = [];

        // Matcher function: Loops through markers and checks for matches in lower-cased strings
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
            <div className="menu" role="main">
                <nav id="list-toggle" className="hamburger" onClick={this.toggleShow}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z"></path>
                    </svg>
                </nav>
                <div className="menuList">
                    <label htmlFor="search"></label>
                    <input id="search" type="text" placeholder="Filter" onChange={this.filter} />
                    <ul id="markerList">
                        {markers.length > 0 && markers.map((marker) => (
                            <li key={marker.title}>
                                <a onClick={() => this.props.expand(marker)}>{marker.title}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}