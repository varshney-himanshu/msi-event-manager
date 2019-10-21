import {
  CLEAR_DATA,
  SET_CURRENT_USER,
  GET_ERRORS,
  CLEAR_ERRORS
} from "./types";
import axios from "axios";

import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

var config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  }
};

//register admin

// export const registerAdmin = (userData,history) => dispatch =>{
//     axios.post('/api/admins/register', userData,config)
//     .then(res => history.push('/admin/dashboard'))
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// }

//Login - get login token

export const loginUser = (userData, history) => dispatch => {
  axios
    .post("https://api-kyra.now.sh/user/login", userData, config)
    .then(res => {
      const { token } = res.data;
      //saving token in local Storage
      localStorage.setItem("jwtToken", token);
      //setting token to auth header
      setAuthToken(token);
      //decoding token to get user data
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      dispatch({
        type: CLEAR_ERRORS,
        payload: {}
      });
      history.push("/dashboard");
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

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  dispatch({
    type: CLEAR_DATA,
    payload: null
  });
};
