import React, { Component } from "react";
import axios from "axios";
class Event extends Component {
  constructor(props) {
    super(props);

    this.state = {
      event: {},
      loading: true
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get("https://msi");
  }

  render() {
    return <div>Event</div>;
  }
}
export default Event;
