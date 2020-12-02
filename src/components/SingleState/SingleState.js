import React, { Component, PureComponent } from "react";
import { getAllParksByState } from "../../services/npsService";
import TopNav from "../TopNav/TopNav";
import SinglePark from "../SinglePark/SinglePark";
import mapboxgl from "mapbox-gl";
import StateMap from "../StateMap/StateMap";
import "./SingleState.css";

const MAPBOX_ACCESS_TOKEN = `${process.env.REACT_APP_MAPBOX_API_KEY}`;
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

export default class SingleState extends Component {
  state = {
    singleStateParks: [],
    loading: true,
    singleParkDetails: {},
    toggleDetails: false,
  };

  singleStateAbbr = this.props.match.params.details;

  async componentDidMount() {
    await this.fetchState(this.singleStateAbbr);
  }

  async fetchState() {
    try {
      const response = await getAllParksByState(this.singleStateAbbr);
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
          <StateMap singleStateParks={singleStateParks} />
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
