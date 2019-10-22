import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Navbar.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {}
    };
  }

  static getDerivedStateFromProps(props) {
    if (props.auth) {
      return {
        auth: props.auth
      };
    }
  }

  onClickLogout = () => {
    if (window.confirm("Are you sure? Please confirm")) {
      this.props.logoutUser();
    }
  };

  logged_in = (
    <>
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          <button className="login">Login</button>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/register" className="nav-link">
          <button className="register">Register</button>
        </Link>
      </li>
    </>
  );

  not_logged_in = state => (
    <>
      <div class="btn-group dropleft">
        <button
          type="button"
          class="btn btn-secondary dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {" "}
          {state.auth.user.name}
        </button>
        <div class="dropdown-menu">
          <Link class="dropdown-item" to="/dashboard">
            Dashboard
          </Link>
          <button onClick={this.onClickLogout} class="dropdown-item">
            Logout
          </button>
        </div>
      </div>
    </>
  );

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg">
          <Link className="navbar-brand" to="/">
            <strong>MSI Events</strong>
          </Link>
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
                <Link className="nav-link" to="/">
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/events">
                  Events
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto ">
              {!this.state.auth.isAuthenticated
                ? this.logged_in
                : this.not_logged_in(this.state)}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
