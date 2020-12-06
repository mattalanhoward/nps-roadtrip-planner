import React, { Component } from "react";
import PhotoCarousel from "../PhotoCarousel/PhotoCarousel";
import "./SinglePark.css";
import Carousel, { Dots } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { Button, Popup } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import tent from "../../images/tent.svg";
import caravan from "../../images/caravan.svg";

const popupStyle = {
  borderRadius: 0,
  opacity: 0.9,
  padding: ".5em",
  background: "black",
  color: "white",
};

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
    const parkInfo = this.props.park;
    console.log(`Park Info`, parkInfo);
    const { showCarousel } = this.state;

    const images = parkInfo.images;

    // console.log(images);
    const url = images.map((imageInfo) => imageInfo.url);
    // console.log(url);

    return (
      <section className="park-container">
        <div className="park-info">
          <h5>{parkInfo.designation}</h5>
          <h3>{parkInfo.fullName}</h3>
          <p>
            {parkInfo.states.length > 2
              ? `Various States: ${parkInfo.states}`
              : `State: ${parkInfo.states}`}
          </p>
          <p>{parkInfo.description}</p>
          <p>
            <Popup
              content={<p>Campgrounds</p>}
              trigger={
                parkInfo.activities.find((el) => el.name === "Camping") && (
                  <img src={caravan} alt={"Campgrounds"}></img>
                )
              }
              style={popupStyle}
            />
            <Popup
              content={<p>Backcountry Camping</p>}
              trigger={
                parkInfo.activities.find(
                  (el) => el.name === "Backcountry Camping"
                ) && <img src={tent} alt={"Backcountry Camping"}></img>
              }
              style={popupStyle}
            />
          </p>

          <Popup
            content={parkInfo.activities.map((activity) => (
              <p key={activity.id} className="activity-list">
                {activity.name}
              </p>
            ))}
            trigger={<h5>Activities</h5>}
            style={popupStyle}
          />

          <Popup
            content={
              <p>
                {parkInfo.addresses[0].line1}
                <br></br>
                {parkInfo.addresses[0].city}, {parkInfo.addresses[0].stateCode}{" "}
                {parkInfo.addresses[0].postalCode}
              </p>
            }
            trigger={<h5>Address</h5>}
            style={popupStyle}
          />
          <h5>More Info</h5>
        </div>
        <div>
          <img
            src={parkInfo.images[0].url}
            alt={parkInfo.images[0].altText}
          ></img>
          <h5>More Photos</h5>
        </div>
        {/* <PhotoCarousel url={url} /> */}
      </section>
    );
  }
}
// {showCarousel && <PhotoCarousel parkInfo={parkInfo} />}
// <div onClick={this.togglePhotos}>
//   {showCarousel ? <p>Close Photos</p> : <p>Show Photos</p>}
// </div>
