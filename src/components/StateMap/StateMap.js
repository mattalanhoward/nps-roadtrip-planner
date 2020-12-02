import React, { Component, PureComponent } from "react";
import { getAllParksByState } from "../../services/npsService";
import mapboxgl from "mapbox-gl";
import pin from "../../images/pin.svg";
import "mapbox-gl/dist/mapbox-gl.css";
import "../StateMap/StateMap.css";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import Geocoder from "react-mapbox-gl-geocoder";

const MAPBOX_ACCESS_TOKEN = `${process.env.REACT_APP_MAPBOX_API_KEY}`;
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

const mapStyle = {
  width: "100%",
  height: "100%",
};

export default class StateMap extends Component {
  state = {
    viewport: {
      latitude: 37.0902,
      longitude: -95.7129,
      zoom: 3,
    },
    showPopUp: false,
    popUpPark: null,
  };

  handleShowPopUp = (park) => {
    this.setState(
      {
        showPopUp: !this.state.showPopUp,
        popUpPark: park,
      },
      () => {
        console.log(this.state);
      }
    );
  };

  handleClosePopup = () => {
    this.setState({
      showPopUp: false,
    });
  };

  render() {
    const { singleStateParks } = this.props;
    const { viewport, popUpPark } = this.state;
    console.log(viewport);
    return (
      <section className="map-container">
        <ReactMapGL
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          {...viewport}
          {...mapStyle}
          onViewportChange={(viewport) => this.setState({ viewport })}
        >
          {singleStateParks.map((park, index) => {
            if (
              !isNaN(parseInt(park.latitude)) &&
              !isNaN(parseInt(park.longitude))
            ) {
              return (
                <Marker
                  key={index}
                  longitude={parseFloat(park.longitude)}
                  latitude={parseFloat(park.latitude)}
                  offsetLeft={-10}
                  offsetTop={-10}
                >
                  <div
                    className="marker"
                    onClick={() => this.handleShowPopUp(park)}
                  >
                    <span className="pin">
                      <img src={pin} alt="Pin" />
                    </span>
                  </div>
                </Marker>
              );
            }
          })}
          {this.state.showPopUp && (
            <Popup
              latitude={parseFloat(popUpPark.latitude)}
              longitude={parseFloat(popUpPark.longitude)}
              onClose={this.handleClosePopup}
              closeButton={true}
              closeOnClick={false}
              offsetTop={-10}
            >
              <h3>{popUpPark.fullName}</h3>
              <p>
                {popUpPark.addresses[0].city},{" "}
                {popUpPark.addresses[0].stateCode}
              </p>
            </Popup>
          )}
        </ReactMapGL>
      </section>
    );
  }
}
