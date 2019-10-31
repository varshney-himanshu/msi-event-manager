import React, { Component } from "react";
import Timer from "../Timer";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getAllEvents } from "../../actions/dataActions";
import axios from "axios";

class EventCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRegistered: false,
      auth: {},
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

  componentDidUpdate(prevProps) {
    if (
      prevProps.auth.isAuthenticated === true &&
      this.props.auth.isAuthenticated === false
    ) {
      this.setState({ isRegistered: false });
    }
  }
  endDeadline = () => {
    this.setState({ deadlineEnded: true });
  };
  componentDidMount() {
    const { usersRegistered } = this.props.event;
    const ifRegistered = usersRegistered.filter(
      user => user === this.state.auth.user.id
    );

    if (ifRegistered.length > 0) {
      this.setState({ isRegistered: true });
    }
  }

  onClickRegister = () => {
    const { user, isAuthenticated } = this.state.auth;
    if (isAuthenticated) {
      if (user.isProfileCreated) {
        const { _id } = this.props.event;
        const user_id = this.state.auth.user.id;
        console.log(_id, user_id);
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

  render() {
    const { event } = this.props;
    const des = event.description.substring(0, 199);
    const { isRegistered, deadlineEnded, auth } = this.state;
    return (
      <div className="event-card">
        <div className="header">
          <Link to={`/event/${event._id}`}>
            <h3>{event.title}</h3>
          </Link>
        </div>
        <div className="body">
          <p className="description">
            {des}
            {des.length >= 199 && <>....</>}
          </p>
          <p className="venue">
            <strong>Venue: </strong> {event.venue}
          </p>
        </div>
        <div className="footer">
          {deadlineEnded ? (
            <div>Registration Closed!</div>
          ) : (
            <>
              <Timer endDeadline={this.endDeadline} deadline={event.deadline} />

              {auth.user.role === "STUDENT" ||
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getAllEvents }
)(withRouter(EventCard));
