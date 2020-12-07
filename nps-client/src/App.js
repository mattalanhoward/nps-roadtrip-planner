import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AnonRoute from "./auth/auth/AnonRoute";
import PrivateRoute from "./auth/auth/PrivateRoute";
import { validateSession } from "./services/userService";
import "./App.css";
import NPS from "./components/NPS/NPS";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import SingleState from "./components/SingleState/SingleState";

class App extends React.Component {
  state = {
    authenticated: false,
    user: {},
    newSignup: {},
    signups: [],
  };

  componentDidMount = () => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(`Access Token`, accessToken);
    if (accessToken) {
      validateSession(accessToken)
        .then((response) => {
          console.log(response, "RESPONSE");
          this.authenticate(response.session.userId);
        })
        .catch((err) => console.log(err));
    }
  };

  authenticate = (user) => {
    this.setState({
      authenticated: true,
      user,
    });
  };

  handleLogout = () => {
    localStorage.clear();
    this.setState({
      authenticated: false,
      user: {},
    });
  };

  render() {
    const { authenticated } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <AnonRoute
              exact
              path="/"
              user={this.state.user}
              authenticated={authenticated}
              component={NPS}
            />
            <AnonRoute
              exact
              path="/signup"
              authenticated={authenticated}
              authenticate={this.authenticate}
              component={Signup}
            />
            <AnonRoute
              exact
              path="/login"
              authenticated={authenticated}
              authenticate={this.authenticate}
              component={Login}
            />

            {/* <Route exact path="/login" render={() => <Login />}></Route>
          <Route exact path="/signup" render={() => <Signup />}></Route> */}
            {/* <Route exact path="/state" render={() => <SingleState />}></Route> */}
            <AnonRoute
              exact
              path="/state/:details"
              authenticated={authenticated}
              authenticate={this.authenticate}
              component={SingleState}
            />

            <AnonRoute
              exact
              path="/github"
              render={() =>
                (window.location = "https://www.github.com/mattalanhoward")
              }
            />
            <AnonRoute
              exact
              path="/instagram"
              render={() =>
                (window.location = "https://www.instagram.com/talljoehikes/")
              }
            />
            <AnonRoute
              exact
              path="/youtube"
              render={() =>
                (window.location = "https://www.youtube.com/c/TallJoeHikes/")
              }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
