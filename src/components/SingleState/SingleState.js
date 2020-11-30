import React, { Component } from "react";
import { getAllParksByState } from "../../services/npsService";
import TopNav from "../TopNav/TopNav";
import SinglePark from "../SinglePark/SinglePark";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "../StateMap/StateMap.css";

const MAPBOX_ACCESS_TOKEN = `${process.env.REACT_APP_MAPBOX_API_KEY}`;
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

export default class SingleState extends Component {
  state = {
    singleStateParks: [],
    loading: true,
    singleParkDetails: {},
    toggleDetails: false,
    lat: 37.0902,
    lng: -95.7129,
    zoom: 5,
  };

  singleStateAbbr = this.props.match.params.details;

  async componentDidMount() {
    await this.fetchState(this.singleStateAbbr);
    this.createMap();
  }

  async fetchState() {
    try {
      const response = await getAllParksByState(this.singleStateAbbr);
      console.log(response.data[0].latitude);
      this.setState(
        {
          singleStateParks: response.data,
          loading: false,
          lat: response.data[0].latitude,
          lng: response.data[0].longitude,
        },
        () => console.log(`AFTER FETCHING SINGLE STATE`, this.state)
      );
    } catch (error) {
      this.setState({
        errorMessage: error,
      });
    }
  }

  createMap() {
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
      });
    });

    this.state.singleStateParks.map((park) =>
      new mapboxgl.Marker()
        .setLngLat([park.longitude, park.latitude])
        .addTo(map)
    );
    // new mapboxgl.Marker()
    //   .setLngLat([this.state.lng, this.state.lat])
    //   .addTo(map);
  }

  displayParkDetails = (event) => {
    const toggleDetails = this.state.toggleDetails;
    const park = event.target.innerHTML.substring(1);

    console.log(park);
    const filteredPark = this.state.singleStateParks.filter(
      (x) => x.fullName == park
    );

    this.setState(
      {
        singleParkDetails: filteredPark[0],
        toggleDetails: true,
      },
      () => console.log(`Display Details`, this.state)
    );
  };

  render() {
    const { singleStateParks, singleParkDetails, toggleDetails } = this.state;

    return (
      <div>
        <TopNav />
        <h1>STATE: {this.singleStateAbbr.toUpperCase()}</h1>
        <section className="state-park-map-and-list-container">
          <div
            className="mapContainer"
            ref={(el) => (this.mapContainer = el)}
          />
          <div className="sidebarStyle">
            <div>
              Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom:{" "}
              {this.state.zoom}
            </div>
          </div>

          <ul>
            <div className="allParksList">
              <ul>
                {singleStateParks.map((statePark) => (
                  <li key={statePark.id}>
                    <button onClick={(event) => this.displayParkDetails(event)}>
                      {" "}
                      {statePark.fullName}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </ul>
        </section>
        {toggleDetails && <SinglePark {...singleParkDetails} />}
      </div>
    );
  }
}
