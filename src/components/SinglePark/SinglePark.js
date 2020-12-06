import React, { Component } from "react";
import PhotoCarousel from "../PhotoCarousel/PhotoCarousel";
import SingleParkDetails from "../SingleParkDetails/SingleParkDetails";
import "./SinglePark.css";
import Carousel, { Dots } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { Button, Popup } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import tent from "../../images/tent.svg";
import caravan from "../../images/caravan.svg";
import backpack from "../../images/backpack.svg";

const popupStyle = {
  borderRadius: 2,
  opacity: 0.9,
  padding: "1em",
  background: "black",
  color: "white",
};

export default class SinglePark extends Component {
  state = {
    showCarousel: false,
    showParkDetails: false,
    singleParkDetails: null,
  };

  togglePhotos = () => {
    this.setState({
      showCarousel: !this.state.showCarousel,
    });
  };

  toggleDetails = (target) => {
    console.log(`White girls love Target`, target);
    this.setState(
      {
        showParkDetails: !this.state.showParkDetails,
        singleParkDetails: target,
      },
      () => console.log(this.state)
    );
  };

  render() {
    const parkInfo = this.props.park;
    // console.log(`Park Info`, parkInfo);
    const { showCarousel, showParkDetails, singleParkDetails } = this.state;

    const images = parkInfo.images;

    // console.log(images);
    const url = images.map((imageInfo) => imageInfo.url);
    // console.log(url);

    return (
      <div className="park-details-container">
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
              {" "}
              <Popup
                content={<p>Tent Camping</p>}
                trigger={
                  parkInfo.activities.find((el) => el.name === "Camping") && (
                    <img src={tent} alt={"Tent Camping"}></img>
                  )
                }
                style={popupStyle}
              />
              <Popup
                content={<p>Backcountry Camping</p>}
                trigger={
                  parkInfo.activities.find(
                    (el) => el.name === "Backcountry Camping"
                  ) && <img src={backpack} alt={"Backcountry Camping"}></img>
                }
                style={popupStyle}
              />
              <Popup
                content={<p>RV Camping</p>}
                trigger={
                  parkInfo.activities.find(
                    (el) => el.name === "RV Camping"
                  ) && <img src={caravan} alt={"RV Camping"}></img>
                }
                style={popupStyle}
              />
            </p>

            {/* <Popup
              content={parkInfo.activities.map((activity) => (
                <p key={activity.id} className="activity-list">
                  {activity.name}
                </p>
              ))}
              trigger={<h5>Activities</h5>}
              style={popupStyle}
            /> */}

            {/* <Popup
              content={
                <p>
                  {parkInfo.addresses[0].line1}
                  <br></br>
                  {parkInfo.addresses[0].city},{" "}
                  {parkInfo.addresses[0].stateCode}{" "}
                  {parkInfo.addresses[0].postalCode}
                </p>
              }
              trigger={<h5>Address</h5>}
              style={popupStyle}
            /> */}

            <div
              onClick={() =>
                this.toggleDetails({
                  target: { name: parkInfo },
                })
              }
            >
              {this.state.showParkDetails ? (
                <h5>Show less</h5>
              ) : (
                <h5>More Details</h5>
              )}
            </div>
          </div>
          <div className="photo-container">
            <img
              src={parkInfo.images[0].url}
              alt={parkInfo.images[0].altText}
            ></img>
            <h5>More Photos</h5>
          </div>
          {/* <PhotoCarousel url={url} /> */}
        </section>
        <section className="single-park-details">
          {showParkDetails && (
            <SingleParkDetails
              singleParkDetails={singleParkDetails}
              toggleDetails={this.toggleDetails}
            />
          )}
        </section>
        <div className="bottom-border"></div>
      </div>
    );
  }
}
// {showCarousel && <PhotoCarousel parkInfo={parkInfo} />}
// <div onClick={this.togglePhotos}>
//   {showCarousel ? <p>Close Photos</p> : <p>Show Photos</p>}
// </div>
