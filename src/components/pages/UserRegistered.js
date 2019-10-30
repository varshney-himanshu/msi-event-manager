import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import FileDownload from "js-file-download";

class UserRegistered extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: {},
      event: {},
      usersRegistered: [],
      loading: true
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`https://api-msi-event-manager.now.sh/event/${id}`).then(res => {
      if (res.data) {
        this.setState({ event: res.data });
        axios
          .post("https://api-msi-event-manager.now.sh/profile/ids", {
            registered: res.data.usersRegistered
          })
          .then(res => {
            if (res.data) {
              this.setState({ usersRegistered: res.data, loading: false });
            }
          });
      }
    });
  }
  static getDerivedStateFromProps(props) {
    if (props.auth) {
      return {
        auth: props.auth
      };
    }
  }

  onClickDownload = () => {
    const { usersRegistered } = this.state.event;
    axios
      .post("https://api-msi-event-manager.now.sh/profile/ids/download", {
        registered: usersRegistered
      })
      .then(res => {
        if (res) {
          FileDownload(res.data, "registered.csv");
        }
      });
  };

  render() {
    const { loading, usersRegistered } = this.state;

    if (loading) {
      return <div>loading....</div>;
    } else {
      return (
        <div>
          <table>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Enrollment No.</th>
              <th>Institute</th>
              <th>Course</th>
              <th>Phone</th>
            </tr>
            {usersRegistered.map(profile => (
              <tr>
                <td>{profile.fullName}</td>
                <td>{profile.email}</td>
                <td>{profile.enrollment_id}</td>
                <td>{profile.institute}</td>
                <td>{profile.course}</td>
                <td>{profile.phone}</td>
              </tr>
            ))}
          </table>
          <button onClick={this.onClickDownload}>Download .csv</button>
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
)(UserRegistered);
