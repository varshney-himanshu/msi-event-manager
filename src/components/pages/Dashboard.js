import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";
import { extractDateString } from "../../utils/utils";

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      eventsLoading: true,
      events: [],
      image: null,
      event: ""
    };
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

  onUpload = e => {
    e.preventDefault();

    const { image } = this.state;
    let data = new FormData();
    data.append("image", image);

    axios
      .post("https://api-msi-event-manager.now.sh/image/home/add", data)
      .then(res => {
        if (res.data) {
          alert(res.data.sucess);
        }
      });
  };

  render() {
    const { events, eventsLoading } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col col-12 col-md-10">
            <h3>Your Events</h3>
            {!eventsLoading ? (
              <div className="table">
                <div className="table-head">
                  <div>Title</div>
                  <div>venue</div>
                  <div>deadline</div>
                </div>
                <div className="table-body">
                  {events.map(event => (
                    <div
                      key={event._id}
                      onClick={() =>
                        this.props.history.push(
                          "/event/" + event._id.toString()
                        )
                      }
                      className="table-row"
                    >
                      <div>{event.title}</div>
                      <div>{event.venue}</div>
                      <div>{extractDateString(event.deadline)}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>loading...</div>
            )}

            <form onSubmit={this.onUpload}>
              <input type="file" name="image" onChange={this.onChangeInput} />
              <button>upload</button>
            </form>
          </div>
          <div className="col col-12 col-md-2">
            <button onClick={() => this.props.history.push("/event/create")}>
              Add Event
            </button>
          </div>
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
  null
)(withRouter(Dashboard));
