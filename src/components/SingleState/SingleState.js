import React, { Component } from "react";
import { getAllParksByState } from "../../services/npsService";
import TopNav from "../TopNav/TopNav";
import { Link } from "react-router-dom";
import SinglePark from "../SinglePark/SinglePark";

export default class SingleState extends Component {
  state = {
    singleStateParks: [],
    loading: true,
    singleParkDetails: {},
    toggleDetails: false,
  };

  singleStateAbbr = this.props.match.params.details;

  componentDidMount() {
    this.fetchState(this.singleStateAbbr);
  }

  async fetchState() {
    try {
      const response = await getAllParksByState(this.singleStateAbbr);
      this.setState(
        {
          singleStateParks: response.data,
          loading: false,
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
    console.log(singleStateParks);
    return (
      <div>
        <TopNav />
        <h1>STATE: {this.singleStateAbbr.toUpperCase()}</h1>
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
        {toggleDetails && <SinglePark {...singleParkDetails} />}
      </div>
    );
  }
}
