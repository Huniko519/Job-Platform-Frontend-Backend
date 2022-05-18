import React, { Suspense } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import AppLayout from "../../layout/AppLayout";

const Dashboard = React.lazy(() => import("./dashboard"));

const Jobs = React.lazy(() => import("./job"));

const JobCreate = React.lazy(() => import("./job-create"));

const Profile = React.lazy(() => import("./profile"));

const Details = React.lazy(() => import("./detail"));
const OffersDetail = React.lazy(() => import("./offers/view-offers"));

const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect
              exact
              from={`${match.url}`}
              to={`${match.url}/dashboard`}
            />
            <Route
              path={`${match.url}/dashboard`}
              render={(props) => <Dashboard {...props} />}
            />
            <Route
              path={`${match.url}/jobs`}
              render={(props) => <Jobs {...props} show={1} />}
            />
            <Route
              exacts
              strict
              path={`${match.url}/jobcreate`}
              render={(props) => <JobCreate {...props} />}
            />
            <Route
              exacts
              strict
              path={`${match.url}/profile`}
              render={(props) => <Profile {...props} />}
            />
            {
              <Route
                exacts
                strict
                path={`${match.url}/jobhistory`}
                render={(props) => <Jobs {...props} />}
              />
            }
            {
              <Route
                exacts
                strict
                path={`${match.url}/detail/:id`}
                render={(props) => <Details {...props} />}
              />
            }
            {
              <Route
                exacts
                strict
                path={`${match.url}/offers/:id`}
                render={(props) => <OffersDetail {...props} />}
              />
            }
            <Route
              exacts
              strict
              path={`/error`}
              render={(props) => <Jobs {...props} />}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
