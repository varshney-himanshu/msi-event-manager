import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getHomeImages, getAllEvents } from "../../actions/dataActions";
import axios from "axios";
import "./Dashboard.css";
import { extractDateString } from "../../utils/utils";
import loading from "../../loading.gif";
import Loader from "../layout/Loader";

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      eventsLoading: true,
      events: [],

      event: "",
      homeimages: []
    };
  }

  static getDerivedStateFromProps(props) {
    if (props.homeimages) {
      return {
        homeimages: props.homeimages
      };
    }
  }

  getUserEvents = () => {
    axios
      .get("https://api-msi-event-manager.now.sh/event/user/all")
      .then(res => {
        if (res.data) {
          this.setState({ events: res.data, eventsLoading: false });
        }
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response.data);
        }
      });
  };

  componentDidMount() {
    this.getUserEvents();
  }

  onClickDeleteEvent = id => {
    if (window.confirm("Are you sure, you want to delete this event?")) {
      axios
        .delete(`https://api-msi-event-manager.now.sh/event/${id}`)
        .then(res => {
          if (res.data) {
            this.getUserEvents();
          }
        });
    }
  };

  onClickDelete = id => {
    if (window.confirm("are you sure, you want to delete this image?")) {
      axios
        .delete(`https://api-msi-event-manager.now.sh/image/home/${id}`)
        .then(res => {
          if (res.data) {
            this.props.getHomeImages();
          }
        });
    }
  };

  render() {
    const { events, eventsLoading, homeimages } = this.state;
    return (
      <div className="dashboard">
        <div className="row">
          <div className="col col-12 col-md-10">
            <h3>Your Events</h3>
            <div className="dashboard-events">
              {!eventsLoading ? (
                <>
                  <div className="dashboard-events-body">
                    {events.map(event => (
                      <div key={event._id} className="dashboard-event">
                        <div className="dashboard-event-title">
                          <strong>{event.title}</strong>
                        </div>
                        <div className="dashboard-event-venue">
                          <strong className="venue">Venue: </strong>
                          {event.venue}
                        </div>
                        <div className="dashboard-event-deadline">
                          <strong className="deadline">Deadline: </strong>
                          {extractDateString(event.deadline)}
                        </div>

                        <div className="dashboard-event-btns">
                          <button
                            onClick={() =>
                              this.props.history.push(
                                "/event/" + event._id.toString()
                              )
                            }
                            className="view"
                          >
                            View
                          </button>
                          <button
                            onClick={() => {
                              this.props.history.push(
                                `/event/edit/${event._id}`
                              );
                            }}
                            className="edit"
                          >
                            &#9998;
                          </button>
                          <button
                            onClick={() => this.onClickDeleteEvent(event._id)}
                            className="delete"
                          >
                            &times;
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <Loader />
              )}
            </div>
          </div>
          <div className="col col-12 col-md-2 dashboard-btns ">
            <button onClick={() => this.props.history.push("/event/create")}>
              Add Event <strong>&#43;</strong>
            </button>
            <button onClick={() => this.props.history.push("/notice/add")}>
              Add Notice <strong>&#43;</strong>
            </button>
            <button
              onClick={() =>
                this.props.history.push("/dashboard/home/image/add")
              }
            >
              Add Home Image <strong>&#43;</strong>
            </button>
          </div>
        </div>

        <div className="home-images">
          <h5 style={{ color: "gray" }}>Homepage Management</h5>
          <hr></hr>
          <div className="images-thumbnails">
            {homeimages.map(image => (
              <div key={image._id} className="thumbnail">
                <button
                  onClick={() => {
                    this.onClickDelete(image._id);
                  }}
                  className="img-delete-btn"
                >
                  &#x292B;
                </button>
                <img src={image.data.url} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  homeimages: state.data.homeimages
});
export default connect(
  mapStateToProps,
  { getHomeImages, getAllEvents }
)(withRouter(Dashboard));
