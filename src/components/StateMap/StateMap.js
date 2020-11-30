//This component will hold MAPBOX States and Display all Parks in that state.abs
//Add this component to single state so user has clickable list and map.
import React, { Component } from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import "./StateMap.css";
import { getAllParks, getAllParksByState } from "../../services/npsService";

const MAPBOX_ACCESS_TOKEN = `${process.env.REACT_APP_MAPBOX_API_KEY}`;
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

export class StateMap extends Component {
  state = {
    lat: 37.0902,
    lng: -95.7129,
    zoom: 4,
    // bounds: [
    //   [-124.8047, 27.5301], // Southwest coordinates
    //   [-64.0102, 49.0243], // Northeast coordinates
    // ],
  };

  //   singleStateAbbr = this.props.match.params.details;

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
      maxBounds: this.state.bounds,
    });

    map.on("move", () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
        properties: this.props,
      });
    });
  }

  render() {
    return (
      <div>
        <div className="mapContainer" ref={(el) => (this.mapContainer = el)} />
        <div className="sidebarStyle">
          <div>
            Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom:{" "}
            {this.state.zoom}
          </div>
        </div>
      </div>
    );
  }
}

export default StateMap;
