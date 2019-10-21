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
import Homepage from "./components/Homepage";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router>
            <Route exact path="/" component={Homepage} />
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
