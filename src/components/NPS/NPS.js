//Hold in state list of all NPS.
//Drop down to search by state.
import React, { Component } from "react";
import { BrowserRouter, Switch, Link, Route } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { getAllParks, getAllParksByState } from "../../services/npsService";
import TopNav from "../TopNav/TopNav";
import SingleState from "../SingleState/SingleState";

import "./NPS.css";
import USMap from "../USMap/USMap";

export class NPS extends Component {
  state = {
    allParks: null,
    loading: true,
    errorMessage: "",
    stateAbbr: "ca",
    value: "",
    allStateAbbr: [],
  };

  async componentDidMount() {
    await this.fetchAllParks();
    this.getStateAbbr();
  }

  async fetchAllParks() {
    try {
      const response = await getAllParks();
      this.setState(
        {
          allParks: response.data,
          loading: false,
        },
        () => {
          console.log(this.state);
        }
      );
    } catch (error) {
      this.setState({
        errorMessage: error,
      });
    }
  }

  getStateAbbr = () => {
    const stateCodes = [];
    let allParkStateCodes = this.state.allParks.map((address) => {
      return address.addresses.map((code) => stateCodes.push(code.stateCode));
    });
    const result = stateCodes.filter((v, i, a) => a.indexOf(v) === i).sort();

    this.setState({
      allStateAbbr: result,
    });
  };

  handleChange = (event) => {
    this.setState({ stateAbbr: event.target.value });
  };

  render() {
    const { allParks, loading, stateAbbr, allStateAbbr } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <TopNav />
          <h1>Find your next park by state</h1>
          <h1>Total Parks: {allParks.length}</h1>
          <h1>Welcome</h1>

          <form>
            <select value={stateAbbr} onChange={this.handleChange}>
              {allStateAbbr.map((state) => {
                return (
                  <option key={state} value={state.toLowerCase()}>
                    {state}
                  </option>
                );
              })}
            </select>
          </form>
          <Link to={`/state/${stateAbbr}`}>Get Details</Link>
          <USMap />
          {/* <ul>
            <div className="allParksList">
              <ul>
                {allParks.map((park) => (
                  <li key={park.id}>{park.fullName}</li>
                ))}
              </ul>
            </div>
          </ul> */}
        </div>
      );
    }
  }
}

export default NPS;
