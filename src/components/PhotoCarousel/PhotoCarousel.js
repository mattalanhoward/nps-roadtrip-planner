import React from "react";

const PhotoCarousel = (props) => {
  const imgStyle = {
    height: "200px",
    width: "auto",
  };
  const parkPhotos = props.parkInfo;
  return (
    <div className="photo-carousel">
      {parkPhotos.images.map((image, idx) => (
        <img style={imgStyle} key={idx} src={image.url} alt={image.altText} />
      ))}
    </div>
  );
};

export default PhotoCarousel;
