import isEmpty from "../validation/is-empty";
import { SET_ALL_EVENTS } from "../actions/types";

const initialState = {
  allEvents: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_EVENTS:
      return {
        ...state,
        allEvents: action.payload
      };
    default:
      return state;
  }
}
