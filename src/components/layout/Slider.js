import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./Slider.css";
import { withRouter } from "react-router-dom";

class Slider extends Component {
  static defaultProps = {
    images: null
  };

  render() {
    const { images } = this.props;
    return (
      <div>
        <Carousel showThumbs={false} autoPlay infiniteLoop="true">
          {images.map(image => (
            <div>
              <img src={image.img} />
              <p
                onClick={() => {
                  this.props.history.push(`/event/${image.event}`);
                }}
                className="legend"
              >
                {image.msg}
              </p>
            </div>
          ))}
        </Carousel>
      </div>
    );
  }
}

export default withRouter(Slider);
