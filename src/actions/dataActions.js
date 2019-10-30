import { SET_ALL_EVENTS, GET_ERRORS } from "./types";
import axios from "axios";

export const getAllEvents = () => dispatch => {
  axios
    .get("https://api-msi-event-manager.now.sh/event/all")
    .then(res => {
      dispatch({
        type: SET_ALL_EVENTS,
        payload: res.data
      });
    })
    .catch(err => {
      if (err.response) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      } else {
        console.log(err);
      }
    });
};

export const registerProfile = (data, history) => dispatch => {
  axios
    .post("https://api-msi-event-manager.now.sh/profile/register", data)
    .then(res => {
      if (res.data) {
        history.push("/user/profile");
      }
    })
    .catch(err => {
      if (err.response) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      } else {
        console.log(err);
      }
    });
};

export const registerEvent = (data, history) => dispatch => {
  console.log(data);
  axios // https://api-msi-event-manager.now.sh/event/register
    .post("https://api-msi-event-manager.now.sh/event/register", data)
    .then(res => {
      if (res.data) {
        getAllEvents();
        history.push("/events");
      }
    })
    .catch(err => {
      if (err.response) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      } else {
        console.log(err);
      }
    });
};
