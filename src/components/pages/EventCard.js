import React, { Component } from "react";
import Timer from "../Timer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getAllEvents } from "../../actions/dataActions";
import axios from "axios";

class EventCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRegistered: false,
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
    const { isAuthenticated } = this.state.auth;
    if (isAuthenticated) {
      const { _id } = this.props.event;
      const user_id = this.state.auth.user.id;
      console.log(_id, user_id);
      axios
        .put(`https://api-msi-event-manager.now.sh/event/${_id}/add-user`, {
          user: user_id
        })
        .then(res => {
          if (res.data) {
            this.props.getAllEvents();
          }
        })
        .catch(err => console.log(err));
    } else {
      this.props.history.push("/login");
    }
  };

  render() {
    const { event } = this.props;
    const des = event.description.substring(0, 99);
    const { isRegistered } = this.state;
    return (
      <div className="event-card">
        <div className="header">
          <h3>{event.title}</h3>
        </div>
        <div className="body">
          <p className="description">
            {des} {des.length === 100 && "..."}
          </p>
          <p className="venue">
            <strong>Venue: </strong> {event.venue}
          </p>
        </div>
        <div className="footer">
          <Timer deadline={event.deadline} />
          {!isRegistered ? (
            <button className="event-register" onClick={this.onClickRegister}>
              Register
            </button>
          ) : (
            <button className="event-register" disabled>
              Registered
            </button>
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
