import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import store from "./store";
import Homepage from "./components/pages/Homepage";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import Navbar from "./components/layout/Navbar";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Events from "./components/pages/Events";
import Profile from "./components/pages/Profile";
import CreateProfile from "./components/pages/CreateProfile";
import CreateEvent from "./components/pages/CreateEvent";
import Dashboard from "./components/pages/Dashboard";
import Test from "./components/Test";
import Event from "./components/pages/Event";

if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router>
            <Navbar />
            <Route exact path="/" component={Homepage} />
            <Route exact path="/events" component={Events} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/user/profile" component={Profile} />
            <Route
              exact
              path="/user/profile/create"
              component={CreateProfile}
            />
            <Switch>
              <Route exact path="/event/create" component={CreateEvent} />
              <Route exact path="/event/:id" component={Event} />
            </Switch>
            <Route exact path="/dashboard" component={Dashboard} />

            <Route exact path="/test" component={Test} />
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
