import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getHomeImages } from "../../actions/dataActions";
import axios from "axios";
import "./Dashboard.css";
import { extractDateString } from "../../utils/utils";
import loading from "../../loading.gif";

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      eventsLoading: true,
      events: [],
      image: null,
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

  componentDidMount() {
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
  }

  onChangeInput = e => {
    switch (e.target.name) {
      case "image":
        this.setState({ image: e.target.files[0] });
        break;

      default:
        this.setState({ [e.target.name]: e.target.value });
    }
  };

  onUpload = e => {
    e.preventDefault();

    const { image } = this.state;
    let data = new FormData();
    data.append("image", image);

    axios
      .post("https://api-msi-event-manager.now.sh/image/home/add", data)
      .then(res => {
        if (res.data) {
          this.props.getHomeImages();
        }
      });
  };

  onClickDelete = id => {
    axios
      .delete(`https://api-msi-event-manager.now.sh/image/home/${id}`)
      .then(res => {
        if (res.data) {
          this.props.getHomeImages();
          alert("deleted");
        }
      });
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
                          <button className="edit">&#9998;</button>
                          <button className="delete">&times;</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="loading">
                  <img src={loading} />
                </div>
              )}
            </div>
          </div>
          <div className="col col-12 col-md-2">
            <button onClick={() => this.props.history.push("/event/create")}>
              Add Event
            </button>
            <button onClick={() => this.props.history.push("/notice/add")}>
              Add Notice
            </button>
          </div>
        </div>

        <div className="home-images">
          <h5 style={{color: "gray"}}>Homepage Management</h5>
           <hr></hr>
          <div className="images-thumbnails">
            {homeimages.map(image => (
              <div key={image.id} className="thumbnail">
                <button
                  onClick={() => {
                    this.onClickDelete(image.id);
                  }}
                  className="img-delete-btn"
                >
                  &#x292B;
                </button>
                <img src={image.img} />
              </div>
            ))}
          </div>
          <form onSubmit={this.onUpload}>
            <input type="file" name="image" onChange={this.onChangeInput} />
            <button>upload</button>
          </form>
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
  { getHomeImages }
)(withRouter(Dashboard));
