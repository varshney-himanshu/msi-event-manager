import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {},
      profile: {},
      user: {},
      loading: true
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

    axios
      .get("https://api-msi-event-manager.now.sh/user")
      .then(res => {
        if (res.data) {
          this.setState({ loading: false, user: res.data });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const { loading, user, profile } = this.state;

    return (
      <div>
        {!loading ? (
          !user.isProfileCreated ? (
            <button
              onClick={() => this.props.history.push("/user/profile/create")}
            >
              {" "}
              Create Profile{" "}
            </button>
          ) : (
            <div className="profile" style={{ textAlign: "left" }}>
              <div>
                <strong>Name: </strong>
                {user.name}
              </div>
              <div>
                <strong>Email: </strong>
                {user.email}
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
          )
        ) : (
          <div>loading...</div>
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
