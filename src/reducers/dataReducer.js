import isEmpty from "../validation/is-empty";
import { SET_ALL_EVENTS, SET_HOME_IMAGES } from "../actions/types";

const initialState = {
  allEvents: [],
  homeimages: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_EVENTS:
      return {
        ...state,
        allEvents: action.payload
      };

    case SET_HOME_IMAGES:
      return {
        ...state,
        homeimages: action.payload
      };

    default:
      return state;
  }
}
