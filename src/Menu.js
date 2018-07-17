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

    toggleShow = () => {
        const menuList = document.querySelector('.menuList');

        menuList.style.display === 'none' ? menuList.style.display = 'block' : menuList.style.display = 'none';
    }

    render() {
        const { markers } = this.props;
        
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
                        {this.props.menuMarkers && this.props.menuMarkers.map((marker, index) => {
                            <li key={index}>
                                {marker.title}
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}