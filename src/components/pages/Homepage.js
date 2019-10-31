import React, { Component } from "react";
import "./Homepage.css";
import { connect } from "react-redux";
import Slider from "../layout/Slider";

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  render() {
    const { homeimages } = this.state;
    console.log(homeimages);
    return (
      <div>
        <Slider images={homeimages} />
        <div className="row">
          <div className="col-md-9"></div>
          <div className="col-md-3"></div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  homeimages: state.data.homeimages
});

export default connect(
  mapStateToProps,
  null
)(Homepage);
