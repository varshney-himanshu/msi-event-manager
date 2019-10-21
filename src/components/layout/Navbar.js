import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Navbar.css";
export default class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg">
          <a className="navbar-brand" href="#">
            <strong>MSI Events</strong>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fa fa-bars" aria-hidden="true"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Events
                </a>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto ">
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <button className="login">Login</button>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <button className="register">Register</button>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
