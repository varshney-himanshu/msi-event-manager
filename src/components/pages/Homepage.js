import React, { Component } from "react";
import "./Homepage.css";
import { connect } from "react-redux";
import Slider from "../layout/Slider";
import Notice from "../layout/Notice";

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeimages: [],
      notice: {}
    };
  }

  static getDerivedStateFromProps(props) {
    if (props.homeimages) {
      return {
        homeimages: props.homeimages,
        notice: props.notice
      };
    }
  }

  render() {
    const { homeimages, notice } = this.state;
    console.log(homeimages);
    return (
      <div>
        <div className="row">
          <div className="col-md-9">
        <Slider images={homeimages} /></div>
          <div className="col-md-3">
            <Notice text={notice.text} />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  homeimages: state.data.homeimages,
  notice: state.data.notice
});

export default connect(
  mapStateToProps,
  null
)(Homepage);
