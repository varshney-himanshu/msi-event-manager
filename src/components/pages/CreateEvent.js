import React, { Component } from "react";
import { connect } from "react-redux";
import { registerEvent } from "../../actions/dataActions";

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      venue: "",
      deadline: "",
      description: "",
      date: "",
      errors: {},
      auth: {},
      dateNow: "",
      img: null
    };
  }

  static getDerivedStateFromProps(props) {
    if (props.auth) {
      return {
        auth: props.auth,
        errors: props.errors
      };
    }
  }

  componentDidMount() {
    const dateNow = new Date();
    const date = dateNow.getDate();
    const month = dateNow.getMonth() + 1;
    const year = dateNow.getFullYear();
    const d = `${year}-${month}-${date}`;
    this.setState({ dateNow: d });
  }

  onChange = e => {
    switch (e.target.name) {
      case "img":
        this.setState({ img: e.target.files[0] });
        break;

      default:
        this.setState({ [e.target.name]: e.target.value });
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const { id } = this.state.auth.user;
    const { date, title, venue, description, deadline, img } = this.state;

    console.log(this.state);

    const data = new FormData(); // using FormData to send file to the server
    data.append("creator", id);
    data.append("title", title);
    data.append("venue", venue);
    data.append("description", description);
    data.append("imgFile", img);
    data.append("deadline", deadline);
    data.append("date", date);
    this.props.registerEvent(data, this.props.history);
  };

  render() {
    const { dateNow } = this.state;
    return (
      <div className="form">
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={this.state.title}
            onChange={this.onChange}
          />
          <br />
          <textarea
            name="description"
            placeholder="Description"
            value={this.state.description}
            onChange={this.onChange}
          />
          <br />
          <input
            type="text"
            name="venue"
            placeholder="Venue"
            value={this.state.venue}
            onChange={this.onChange}
          />
          <br />
          <label>Date: </label>
          <input
            type="date"
            name="date"
            value={this.state.date}
            onChange={this.onChange}
            min={dateNow}
          />
          <br />
          <label>Deadline: </label>
          <input
            type="date"
            name="deadline"
            value={this.state.deadline}
            onChange={this.onChange}
            min={dateNow}
          />
          <br />
          <input
            onChange={this.onChange}
            type="file"
            name="img"
            placeholder="upload image for the event"
            required
          />
          <br />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { registerEvent }
)(CreateEvent);
