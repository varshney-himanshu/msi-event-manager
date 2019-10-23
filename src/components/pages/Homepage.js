import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Homepage.css";
class Homepage extends Component {
  render() {
    return (
      <div>
        <div
          id="carouselExampleControls"
          class="carousel slide"
          data-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img
                src="https://i.redd.it/ke0429cnhxt31.jpg"
                class="d-block"
                alt="..."
              />
            </div>
            <div class="carousel-item">
              <img
                src="https://i.redd.it/3vigknrd9st31.jpg"
                class="d-block"
                alt="..."
              />
            </div>
            <div class="carousel-item">
              <img
                src="https://i.redd.it/3vigknrd9st31.jpg"
                class="d-block"
                alt="..."
              />
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <i class="fa fa-chevron-left" aria-hidden="true"></i>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <i class="fa fa-chevron-right" aria-hidden="true"></i>
            <span class="sr-only">Next</span>
          </a>
        </div>
        <div className="row"></div>
        <div className="col-md-9"></div>
        <div className="col-md-3"></div>
      </div>
    );
  }
}

export default Homepage;
