//Hold in state list of all NPS.
//Drop down to search by state.
import React, { Component } from "react";
import { BrowserRouter, Switch, Link, Route } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { getAllParks, getAllParksByState } from "../services/npsService";
import TopNav from "../components/TopNav";
import Signup from "../components/Signup";
import Login from "../components/Login";
import SingleState from "../components/SingleState";

export class NPS extends Component {
  state = {
    allParks: null,
    loading: true,
    errorMessage: "",
    stateAbbr: "nc",
    value: "",
  };

  async componentDidMount() {
    this.fetchAllParks();
  }

  async fetchAllParks() {
    try {
      //   const response = await getAllParks();
      this.setState({
        // allParks: response.data,
        loading: false,
      });
    } catch (error) {
      this.setState({
        errorMessage: error,
      });
    }
  }

  handleChange = (event) => {
    this.setState({ stateAbbr: event.target.value });
  };

  render() {
    const { allParks, loading, stateAbbr } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <TopNav />
          <h1>Find your next park by state</h1>
          {/* <h1>Total Parks: {allParks.length}</h1> */}
          <h1>Welcome</h1>
          <form>
            <select value={this.state.stateAbbr} onChange={this.handleChange}>
              <option default value="nc">
                NC
              </option>
              <option value="sc">SC</option>
              <option value="co">CO</option>
              <option value="wa">WA</option>
              <option value="or">OR</option>
              <option value="me">ME</option>
              <option value="ut">UT</option>
              <option value="az">AZ</option>
            </select>
          </form>
          <Link to={`/state/${stateAbbr}`}>Get Details</Link>
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
