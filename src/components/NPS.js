//Hold in state list of all NPS.
//Drop down to search by state.
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { getAllParks } from "../services/npsService";

export class NPS extends Component {
  state = {
    allParks: null,
    loading: true,
    errorMessage: "",
  };

  async componentDidMount() {
    this.fetchAllParks();
  }

  async fetchAllParks() {
    try {
      const response = await getAllParks();
      this.setState({
        allParks: response.data,
        loading: false,
      });
    } catch (error) {
      this.setState({
        errorMessage: error,
      });
    }
  }

  render() {
    const { allParks, loading } = this.state;

    if (loading || !allParks) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h1>Find your next park by state</h1>
          <h1>Total Parks: {allParks.length}</h1>
          <ul>
            <div className="allParksList">
              <ul>
                {allParks.map((park) => (
                  <li key={park.id}>{park.fullName}</li>
                ))}
              </ul>
            </div>
          </ul>
        </div>
      );
    }
  }
}

export default NPS;
