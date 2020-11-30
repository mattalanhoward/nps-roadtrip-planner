import React, { Component, PureComponent } from "react";
import { getAllParksByState } from "../../services/npsService";
import TopNav from "../TopNav/TopNav";
import SinglePark from "../SinglePark/SinglePark";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "../StateMap/StateMap.css";
import StateMap from "../StateMap/StateMap";
import ReactMapGL, { Marker } from "react-map-gl";
import Geocoder from "react-mapbox-gl-geocoder";

const mapStyle = {
  width: "100%",
  height: 600,
};

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
    viewport: {
      latitude: 45.50884,
      longitude: -73.58781,
      zoom: 6,
    },
    tempMarker: {
      name: "MARKER !",
      longitude: -95.7129,
      latitude: 37.0902,
    },
  };

  singleStateAbbr = this.props.match.params.details;

  async componentDidMount() {
    await this.fetchState(this.singleStateAbbr);
    // this.createMap();
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

  // onSelected = (viewport, item) => {
  //   this.setState({
  //     viewport,
  //     tempMarker: {
  //       name: item.place_name,
  //       longitude: item.center[0],
  //       latitude: item.center[1],
  //     },
  //   });
  // };

  // add = () => {
  //   var { tempMarker } = this.state;

  //   this.setState((prevState) => ({
  //     markers: [...prevState.markers, tempMarker],
  //     tempMarker: null,
  //   }));
  // };

  // createMap() {
  //   const map = new mapboxgl.Map({
  //     container: this.mapContainer,
  //     style: "mapbox://styles/mapbox/streets-v11",
  //     center: [this.state.lng, this.state.lat],
  //     zoom: this.state.zoom,
  //     maxBounds: this.state.bounds,
  //   });

  //   map.on("move", () => {
  //     this.setState({
  //       lng: map.getCenter().lng.toFixed(4),
  //       lat: map.getCenter().lat.toFixed(4),
  //       zoom: map.getZoom().toFixed(2),
  //     });
  //   });

  //   this.state.singleStateParks.map((park) =>
  //     new mapboxgl.Marker()
  //       .setLngLat([park.longitude, park.latitude])
  //       .addTo(map)
  //   );
  // }

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
    const {
      singleStateParks,
      singleParkDetails,
      toggleDetails,
      viewport,
      tempMarker,
    } = this.state;

    return (
      <div>
        <TopNav />
        {/* <StateMap /> */}
        <h1>STATE: {this.singleStateAbbr.toUpperCase()}</h1>
        <section className="state-park-map-and-list-container">
          {/* <div
            className="mapContainer"
            ref={(el) => (this.mapContainer = el)}
          /> */}
          {/* <div className="sidebarStyle">
            <div>
              Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom:{" "}
              {this.state.zoom}
            </div>
          </div> */}
          <ReactMapGL
            mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            {...viewport}
            {...mapStyle}
            onViewportChange={(viewport) => this.setState({ viewport })}
          >
            {singleStateParks.map((park, index) => {
              console.log(`Latitude,`, index, park.latitude);
              console.log(`Longitude`, index, park.longitude);
              if (
                !isNaN(parseInt(park.latitude)) &&
                !isNaN(parseInt(park.longitude))
              ) {
                return (
                  <Marker
                    key={index}
                    longitude={parseInt(park.longitude)}
                    latitude={parseInt(park.latitude)}
                  >
                    <div className="marker temporary-marker">
                      <span>PARK</span>
                    </div>
                  </Marker>
                );
              }
            })}
            {/* {this.state.singleStateParks.map((marker, index) => {
              return (
                <CustomMarker
                  key={`marker-${index}`}
                  index={index}
                  marker={marker}
                />
              );
            })} */}

            <Marker
              longitude={tempMarker.longitude}
              latitude={tempMarker.latitude}
            >
              <div className="marker temporary-marker">
                <span></span>
              </div>
            </Marker>
          </ReactMapGL>

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
