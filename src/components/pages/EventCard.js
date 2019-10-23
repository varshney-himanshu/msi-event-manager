import React, { Component } from "react";
import Timer from "../Timer";
import { connect } from "react-redux";

export default class EventCard extends Component {
  render() {
    const { event } = this.props;
    const des = event.description.substring(0, 99);
    return (
      <div className="event-card">
        <div className="header">
          <h3>{event.title}</h3>
        </div>
        <div className="body">
          <p className="description">
            {des} {des.length === 100 && "..."}
          </p>
          1
          <p className="venue">
            <strong>Venue: </strong> {event.venue}
          </p>
        </div>
        <div className="footer">
          <Timer deadline={event.deadline} />
          <button className="event-register">Register</button>
        </div>
      </div>
    );
  }
}
