import React, { Component } from "react";
import PhotoCarousel from "../PhotoCarousel/PhotoCarousel";
import "./SinglePark.css";

export default class SinglePark extends Component {
  state = {
    showCarousel: false,
  };

  togglePhotos = () => {
    this.setState({
      showCarousel: !this.state.showCarousel,
    });
  };
  render() {
    const parkInfo = this.props;
    const { showCarousel } = this.state;
    console.log(parkInfo);
    return (
      <section className="park-info-container">
        <h5>{parkInfo.designation}</h5>
        <h3>{parkInfo.fullName}</h3>
        <p>
          {parkInfo.states.length > 2
            ? `Various States: ${parkInfo.states}`
            : `State: ${parkInfo.states}`}
        </p>
        <p>{parkInfo.description}</p>
        <p>
          {parkInfo.activities.find((el) => el.name === "Camping") &&
            `Campground`}
        </p>
        <p>
          {parkInfo.activities.find(
            (el) => el.name === "Backcountry Camping"
          ) && `Backcountry Camping`}
        </p>
        <h5>Activities</h5>
        <h5>Camping Info</h5>
        <h5>Address</h5>
        <h5>Ranger Stations</h5>
      </section>
    );
  }
}
// {showCarousel && <PhotoCarousel parkInfo={parkInfo} />}
// <div onClick={this.togglePhotos}>
//   {showCarousel ? <p>Close Photos</p> : <p>Show Photos</p>}
// </div>
