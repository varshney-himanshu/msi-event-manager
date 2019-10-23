import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {},
      profile: {}
    };
  }

  static getDerivedStateFromProps(props) {
    if (props.auth) {
      return {
        auth: props.auth
      };
    }
  }

  componentDidMount() {
    const { auth } = this.state;
    if (!auth.isAuthenticated) {
      this.props.history.push("/login");
    }

    axios
      .get("https://api-msi-event-manager.now.sh/profile")
      .then(res => {
        if (res.data) {
          this.setState({ profile: res.data });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const { auth, profile } = this.state;
    return (
      <div>
        {!auth.user.isProfileCreated ? (
          <button> Create Profile </button>
        ) : (
          <div className="profile" style={{ textAlign: "left" }}>
            <div>
              <strong>Name: </strong>
              {auth.user.name}
            </div>
            <div>
              <strong>Email: </strong>
              {auth.user.email}
            </div>
            <div>
              <strong>Enrollment ID: </strong>
              {profile.enrollment_id}
            </div>
            <div>
              <strong>Course: </strong>
              {profile.course}
            </div>
            <div>
              <strong>Institute: </strong>
              {profile.institute}
            </div>
            <div>
              <strong>Phone: </strong>
              {profile.phone}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(withRouter(Profile));
