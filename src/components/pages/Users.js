import React, { Component } from "react";
import { getAllUsers } from "../../actions/dataActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import UserCard from "./UserCard";
import "./Users.css";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {},
      users: []
    };
  }

  componentDidMount() {
    this.props.getAllUsers();
  }

  static getDerivedStateFromProps(props) {
    return {
      auth: props.auth,
      users: props.users
    };
  }

  render() {
    const { users, auth } = this.state;

    const students = users.filter(user => user.role === "STUDENT");
    const admins = users.filter(user => user.role === "ADMIN");
    const superAdmins = users.filter(user => user.role === "SUPER_ADMIN");

    return (
      <div className="users">
        <div className="row">
          <div className="col col-12 col-lg-10">
            <h1 className="heading">users</h1>
            <div className="users__table">
              <h2 className="heading">Students</h2>
              <div className="users__table-body">
                {students.map(user => (
                  <UserCard user={user} key={user._id} />
                ))}
              </div>
            </div>

            <div className="users__table">
              <h2 className="heading">Admins</h2>
              <div className="users__table-body">
                {admins.map(user => (
                  <UserCard user={user} key={user._id} />
                ))}
              </div>
            </div>

            <div className="users__table">
              <h2 className="heading">Super Admins</h2>
              <div className="users__table-body">
                {superAdmins.map(user => (
                  <UserCard user={user} key={user._id} />
                ))}
              </div>
            </div>
          </div>
          <div className="col col-12 col-lg-2"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  users: state.data.users
});

export default connect(
  mapStateToProps,
  { getAllUsers }
)(withRouter(Users));
