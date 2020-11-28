import React, { Component } from "react";

export default class SinglePark extends Component {
  render() {
    const parkInfo = this.props;
    const imgStyle = {
      height: "200px",
      width: "auto",
    };
    return (
      <div>
        <h1>Single Park Info</h1>
        <h2>Name: {parkInfo.fullName}</h2>
        <p>Description:{parkInfo.description}</p>
        <p>Weather: {parkInfo.weatherInfo}</p>
        {/* {parkInfo.images} */}
        {parkInfo.images.map((image, idx) => (
          <img style={imgStyle} key={idx} src={image.url} alt={image.altText} />
        ))}
      </div>
    );
  }
}
