import "./App.css";
import NPS from "./components/NPS/NPS";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SingleState from "./components/SingleState/SingleState";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <NPS />}></Route>
          {/* <Route exact path="/login" render={() => <Login />}></Route>
          <Route exact path="/signup" render={() => <Signup />}></Route> */}
          {/* <Route exact path="/state" render={() => <SingleState />}></Route> */}
          <Route exact path="/state/:details" component={SingleState}></Route>
          <Route
            exact
            path="/github"
            render={() =>
              (window.location = "https://www.github.com/mattalanhoward")
            }
          />
          <Route
            exact
            path="/instagram"
            render={() =>
              (window.location = "https://www.instagram.com/talljoehikes/")
            }
          />
          <Route
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

export default App;
