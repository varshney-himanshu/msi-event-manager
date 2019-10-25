import React, { Component } from "react";
import { connect } from "react-redux";
import { registerProfile } from "../../actions/dataActions";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {},
      institute: "",
      course: "",
      phone: "",
      enrollment_id: "",
      errors: {}
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
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { auth, institute, phone, course, enrollment_id } = this.state;
    const user = auth.user.id;

    const data = { user, enrollment_id, phone, course, institute };
    console.log(data);

    this.props.registerProfile(data, this.props.history);
  };

  render() {
    return (
      <div className="form">
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="enrollment_id"
            value={this.state.enrollment_id}
            placeholder="Enrollment ID"
            onChange={this.onChange}
            required
          />
          {this.state.errors.enrollment_id && this.state.errors.enrollment_id}
          <br />
          <input
            type="text"
            name="phone"
            value={this.state.phone}
            placeholder="Phone Number"
            onChange={this.onChange}
            required
          />
          {this.state.errors.phone && this.state.errors.phone}
          <br />
          <select
            name="course"
            onChange={this.onChange}
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select Course
            </option>
            <option value="BCA">BCA</option>
            <option value="B.COM.">B.COM.</option>
            <option value="BBA">BBA</option>
            <option value=">B.ED.">B.ED.</option>
          </select>
          <br />

          <select
            name="institute"
            onChange={this.onChange}
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select Institute
            </option>
            <option value="Maharaja Surajmal Institute">
              Maharaja Surajmal Institute
            </option>
          </select>

          <br></br>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerProfile }
)(CreateProfile);
