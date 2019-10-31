import React, { Component } from "react";
import axios from "axios";
import { arrayBufferToBase64, extractDateString } from "../../utils/utils";
import Timer from "../Timer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Event extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: {},
      event: {},
      loading: true,
      img: "",
      usersRegistered: []
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
            var base64Flag = "data:image/jpeg;base64,";
            var imgStr = arrayBufferToBase64(res.data.image.data.data);
            this.setState({
              img: base64Flag + imgStr
            });
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

  render() {
    const { event, img, loading, auth, usersRegistered } = this.state;

    if (loading) {
      return <div>loading....</div>;
    } else {
      return (
        <div>
          <h1>{event.title}</h1>
          <p>{event.description}</p>
          <div>
            <strong>Registration Deadline:</strong>{" "}
            {extractDateString(event.deadline)}
          </div>
          <Timer deadline={event.deadline} />
          <div>
            <strong>Venue:</strong> {event.venue}
          </div>
          <div>{}</div>
          <img width="50%" src={img} />

          {auth.isAuthenticated && auth.user.role === "ADMIN" ? (
            <button
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
