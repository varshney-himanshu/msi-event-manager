import isEmpty from "../validation/is-empty";
import { SET_CURRENT_USER, AUTHENTICATE } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload)
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
}
