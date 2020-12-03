import React, { Component, PureComponent } from "react";
import { getAllParksByState } from "../../services/npsService";
import TopNav from "../TopNav/TopNav";
import BottomNav from "../BottomNav/BottomNav";
import SinglePark from "../SinglePark/SinglePark";
import mapboxgl from "mapbox-gl";
import StateMap from "../StateMap/StateMap";
import "./SingleState.css";
import Select from "react-select";

const MAPBOX_ACCESS_TOKEN = `${process.env.REACT_APP_MAPBOX_API_KEY}`;
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

export default class SingleState extends Component {
  state = {
    singleStateParks: [],
    parkOptions: [],
    loading: true,
    singleParkDetails: {},
    toggleDetails: false,
    lat: null,
    lng: null,
  };

  singleStateAbbr = this.props.match.params.details;

  async componentDidMount() {
    await this.fetchState(this.singleStateAbbr);
    await this.createOptions();
  }

  async fetchState() {
    try {
      const response = await getAllParksByState(this.singleStateAbbr);
      this.setState({
        singleStateParks: response.data,
        loading: false,
        lat: response.data[0].latitude,
        lng: response.data[0].longitude,
      });
    } catch (error) {
      this.setState({
        errorMessage: error,
      });
    }
  }

  createOptions = () => {
    const singleStateParks = this.state.singleStateParks;
    const parkOptionsArr = [];
    singleStateParks.map((park) => {
      parkOptionsArr.push({ value: park.fullName, label: park.fullName });
    });
    this.setState({
      parkOptions: parkOptionsArr,
    });
  };

  displayParkDetails = (selected) => {
    const park = selected.target.value;

    const filteredPark = this.state.singleStateParks.filter(
      (x) => x.fullName == park
    );

    this.setState({
      singleParkDetails: filteredPark[0],
      toggleDetails: true,
    });
  };

  render() {
    const {
      singleStateParks,
      singleParkDetails,
      toggleDetails,
      lat,
      lng,
      parkOptions,
    } = this.state;

    return (
      <div>
        <TopNav />
        {/* <h1>STATE: {this.singleStateAbbr.toUpperCase()}</h1> */}
        <div className="state-park-container">
          <div className="allParksList">
            <Select
              options={parkOptions}
              placeholder={"Select a Park..."}
              onChange={(val) => {
                this.displayParkDetails({
                  target: { name: val.value, value: val.value },
                });
              }}
            />
          </div>
          <section className="state-park-map-and-list-container">
            <StateMap singleStateParks={singleStateParks} lat={lat} lng={lng} />

            {toggleDetails && <SinglePark {...singleParkDetails} />}
          </section>
        </div>
        <BottomNav />
      </div>
    );
  }
}
