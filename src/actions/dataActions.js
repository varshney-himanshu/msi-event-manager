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
