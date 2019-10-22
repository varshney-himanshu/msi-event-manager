import React from "react";
import "./Timer.css";

const initialState = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
};

class Timer extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    if (this.props.deadline) {
      this.interval = setInterval(() => {
        var deadline = new Date(this.props.deadline);
        var now = new Date();
        var rt = deadline - now;
        var days = Math.floor(rt / (1000 * 60 * 60 * 24));
        var hours = Math.floor((rt % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((rt % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((rt % (1000 * 60)) / 1000);

        this.setState({ days, hours, minutes, seconds });
        if (rt <= 0) {
          this.setState({ initialState });
          clearInterval(this.interval);
        }
      }, 1000);
    }
  }

  render() {
    const { days, hours, minutes, seconds } = this.state;
    return (
      <div className="timer">
        <span>
          {days < 10 && "0"}
          {days}
        </span>{" "}
        <span>
          {hours < 10 && "0"}
          {hours}
        </span>{" "}
        <span>
          {minutes < 10 && "0"}
          {minutes}
        </span>{" "}
        <span>
          {seconds < 10 && "0"}
          {seconds}
        </span>
      </div>
    );
  }
}

export default Timer;
