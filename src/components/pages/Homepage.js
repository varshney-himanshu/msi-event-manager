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
            <div class="carousel-item">
              <img
                src="https://scontent.fdel8-1.fna.fbcdn.net/v/t1.0-9/51043320_423130491560785_4777862658206466048_n.jpg?_nc_cat=101&_nc_oc=AQkrwFoNs_x_QXeZbl7g1EIwXA52USnnovZW94KTcblYimJal0SP-xEGTuzIasDQaTc&_nc_ht=scontent.fdel8-1.fna&oh=d70c9a6cc57b7918d78f3065c687e7fa&oe=5E191952"
                class="d-block"
                alt="..."
              />
            </div>
            <div class="carousel-item active">
              <img
                src="https://pbs.twimg.com/media/D-sP3Q7XsAAlkw7?format=jpg&name=4096x4096"
                class="d-block"
                alt="..."
              />
            </div>
            <div class="carousel-item">
              <img
                src="https://pbs.twimg.com/media/EBBpUPQXYAADkmp?format=jpg&name=medium"
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
