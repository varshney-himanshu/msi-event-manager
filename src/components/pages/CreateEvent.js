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
      errors: {},
      auth: {},
      dateNow: ""
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
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { id } = this.state.auth.user;
    const { title, venue, description, deadline } = this.state;

    const data = {
      creator: id,
      title,
      venue,
      description,
      deadline
    };

    // console.log(data);
    const success = this.props.registerEvent(data, this.props.history);
    console.log(success);
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
          <label>Deadline: </label>
          <input
            type="date"
            name="deadline"
            value={this.state.deadline}
            onChange={this.onChange}
            min={dateNow}
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
