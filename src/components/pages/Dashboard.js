import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <button onClick={() => this.props.history.push("/event/create")}>
          Add Event
        </button>
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
