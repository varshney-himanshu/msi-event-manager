import { SET_ALL_EVENTS, SET_HOME_IMAGES, SET_NOTICE } from "../actions/types";

const initialState = {
  allEvents: [],
  homeimages: [],
  imagesLoaded: false,
  notice: {}
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
        homeimages: action.payload,
        imagesLoaded: true
      };

    case SET_NOTICE:
      return {
        ...state,
        notice: action.payload
      };

    default:
      return state;
  }
}
