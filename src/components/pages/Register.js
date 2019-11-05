import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { withRouter } from "react-router";
import logo from "../../logo.png";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  static getDerivedStateFromProps(props) {
    if (props.err) {
      return {
        errors: props.err
      };
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { email, name, password, password2 } = this.state;
    const role = "STUDENT";
    const data = {
      name,
      email,
      password,
      password2,
      role
    };
    this.props.registerUser(data, this.props.history);
  };

  render() {
    return (
      <div className="register-page">
        <div className="form">
          <br />
          <form onSubmit={this.onSubmit}>
            <img
              className="login-logo"
              rel="preload"
              src={logo}
              alt="MSI Logo"
            />
            <h4 className="heading">MSI Events - Register</h4>
            <input
              type="text"
              name="name"
              value={this.state.name}
              placeholder="Username"
              onChange={this.onChange}
            />
            {this.state.errors.name && this.state.errors.name}
            <input
              type="email"
              name="email"
              value={this.state.email}
              placeholder="Email Address"
              onChange={this.onChange}
            />
            {this.state.errors.email && this.state.errors.email}
            <br />
            <input
              type="password"
              name="password"
              value={this.state.password}
              placeholder="Password"
              onChange={this.onChange}
            />
            {this.state.errors.password && this.state.errors.password}
            <br />
            <input
              type="password"
              name="password2"
              value={this.state.password2}
              placeholder="Confim Password"
              onChange={this.onChange}
            />
            {this.state.errors.password2 && this.state.errors.password2}
            <br />
            <button type="submit" value="Register">
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  err: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
