import React, { Component } from "react";
import axios from "axios";
import { arrayBufferToBase64 } from "../../utils/utils";

class Event extends Component {
  constructor(props) {
    super(props);

    this.state = {
      event: {},
      loading: true,
      img: ""
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    axios
      .get(`https://api-msi-event-manager.now.sh/event/${id}`)
      .then(res => {
        if (res.data) {
          var base64Flag = "data:image/jpeg;base64,";
          var imgStr = arrayBufferToBase64(res.data.image.data.data);
          this.setState({
            event: res.data,
            img: base64Flag + imgStr,
            loading: false
          });
        }
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response.data);
        } else {
          console.log(err);
        }
      });
  }

  render() {
    const { event, img, loading } = this.state;

    if (loading) {
      return <div>loading....</div>;
    } else {
      return (
        <div>
          <h1>{event.title}</h1>
          <p>{event.description}</p>
          <div>
            <strong>Venue:</strong> {event.venue}
          </div>
          <div>{}</div>
          <img width="50%" src={img} />
        </div>
      );
    }
  }
}
export default Event;
