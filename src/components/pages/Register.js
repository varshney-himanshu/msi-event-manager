import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { withRouter } from "react-router";

const logo = "";

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
        <img className="login-logo" rel="preload" src={logo} alt="MSI Logo" />
        <h6>MSI Events - Register</h6>
        <input
          type="text"
          name="name"
          value={this.state.name}
          placeholder="Full Name"
          onChange={this.onChange}
        />
        {this.state.errors.name && this.state.errors.name}
        <br />
        <form className="form" onSubmit={this.onSubmit}>
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
