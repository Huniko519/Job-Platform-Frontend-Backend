import React, { Suspense } from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

const ViewLogin = React.lazy(() => import("./views/login"));
const ViewAdmin = React.lazy(() => import("./views/admin"));
const ViewHouseOwner = React.lazy(() => import("./views/owner"));
const ViewContractor = React.lazy(() => import("./views/contractor"));
const ViewBoard = React.lazy(() => import("./views/board"));
const ViewError = React.lazy(() => import("./views/error"));

class App extends React.Component {
  render() {
    return (
      <div className="h-100">
        {
          <Suspense fallback={<div className="loading" />}>
            <Router>
              <Switch>
                <Route
                  path="/"
                  exact
                  render={(props) => <ViewLogin {...props} />}
                />
                <PrivateRoute path="/admin" component={ViewAdmin} />
                <PrivateRoute path="/houseowner" component={ViewHouseOwner} />
                <PrivateRoute path="/contractor" component={ViewContractor} />
                <PrivateRoute path="/board" component={ViewBoard} />
                <Route
                  path="/login"
                  exact
                  render={(props) => <ViewLogin {...props} />}
                />
                <Route
                  path="/error"
                  exact
                  render={(props) => <ViewError {...props} />}
                />
                <Redirect to="/error" />
              </Switch>
            </Router>
          </Suspense>
        }
      </div>
    );
  }
}

export default App;
