import "./App.css";
import NPS from "./components/NPS";
import { BrowserRouter, Switch, Link, Route } from "react-router-dom";
import TopNav from "../src/components/TopNav";
import Signup from "../src/components/Signup";
import Login from "../src/components/Login";
import SingleState from "../src/components/SingleState";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <NPS />}></Route>
          <Route exact path="/login" render={() => <Login />}></Route>
          <Route exact path="/signup" render={() => <Signup />}></Route>
          {/* <Route exact path="/state" render={() => <SingleState />}></Route> */}
          <Route exact path="/state/:details" component={SingleState}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
