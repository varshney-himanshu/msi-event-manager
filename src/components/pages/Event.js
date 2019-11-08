import React, { Component } from "react";
import axios from "axios";
import { extractDateString } from "../../utils/utils";
import Timer from "../Timer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./Event.css";
import Loader from "../layout/Loader";

class Event extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: {},
      event: {},
      loading: true,
      usersRegistered: [],
      isRegistered: false,
      deadlineEnded: false
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
    const id = this.props.match.params.id;
    axios
      .get(`https://api-msi-event-manager.now.sh/event/${id}`)
      .then(res => {
        if (res.data) {
          this.setState({ event: res.data, loading: false }, () => {
            const { usersRegistered } = this.state.event;
            const ifRegistered = usersRegistered.filter(
              user => user === this.state.auth.user.id
            );

            if (ifRegistered.length > 0) {
              this.setState({ isRegistered: true });
            }
          });
        }
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response.data);
        } else {
          console.log(err);
        }
      });
  }

  onClickRegister = () => {
    const { user, isAuthenticated } = this.state.auth;
    if (isAuthenticated) {
      if (user.isProfileCreated) {
        const { _id } = this.state.event;
        const user_id = this.state.auth.user.id;
        axios
          .post(
            `https://api-msi-event-manager.now.sh/event/${_id}/register-user`,
            {
              user: user_id
            }
          )
          .then(res => {
            if (res.data) {
              this.setState({ isRegistered: true });
              axios
                .put(
                  "https://api-msi-event-manager.now.sh/profile/add-registered-event",
                  { eventId: _id }
                )
                .then(res => {
                  if (res.data) {
                    console.log("registered!");
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            }
          })
          .catch(err => console.log(err));
      } else {
        alert("Please create your profile to register on an event.");
        this.props.history.push("/user/profile");
      }
    } else {
      this.props.history.push("/login");
    }
  };

  endDeadline = () => {
    this.setState({ deadlineEnded: true });
  };

  render() {
    const {
      event,
      loading,
      auth,
      deadlineEnded,
      isRegistered,
      usersRegistered
    } = this.state;

    if (loading) {
      return <Loader />;
    } else {
      return (
        <div className="container">
          <div className="event">
            <h1>{event.title}</h1>

            <div className="event-image">
              <img src={event.image.url} />
            </div>
            <p className="event-date">
              <strong>Date: </strong> {extractDateString(event.date)}
            </p>
            <p>{event.description}</p>

            <div className="event-deadline">
              <strong>Registration Deadline:</strong>
              <span className="deadline">
                {extractDateString(event.deadline)}
              </span>
              <Timer deadline={event.deadline} endDeadline={this.endDeadline} />
            </div>

            <div className="footer">
              <div className="venue">
                <strong>Venue:</strong> {event.venue}
              </div>

              {deadlineEnded ? (
                <div>Registration Closed!</div>
              ) : (
                <>
                  {auth.user.role === "STUDENT" ||
                  auth.user.role === "ADMIN" ||
                  auth.isAuthenticated === false ? (
                    <>
                      {isRegistered ? (
                        <button className="event-register" disabled>
                          Registered
                        </button>
                      ) : (
                        <button
                          className="event-register"
                          onClick={this.onClickRegister}
                        >
                          Register
                        </button>
                      )}
                    </>
                  ) : null}
                </>
              )}

              {auth.isAuthenticated && auth.user.role === "ADMIN" ? (
                <button
                  className="event-register"
                  onClick={() =>
                    this.props.history.push(
                      `/event/${this.props.match.params.id}/registered`
                    )
                  }
                >
                  Users Registered
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  null
)(withRouter(Event));
