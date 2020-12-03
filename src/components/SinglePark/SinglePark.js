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

    return (
      <div className="park-info-container">
        <h1>Single Park Info</h1>
        <h2>Name: {parkInfo.fullName}</h2>
        <p>Description:{parkInfo.description}</p>
        <p>Weather: {parkInfo.weatherInfo}</p>
        {showCarousel && <PhotoCarousel parkInfo={parkInfo} />}
        <div onClick={this.togglePhotos}>
          {showCarousel ? <p>Close Photos</p> : <p>Show Photos</p>}
        </div>
      </div>
    );
  }
}
