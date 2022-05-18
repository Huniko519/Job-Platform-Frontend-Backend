import React, { Suspense } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import AppLayout from "../../layout/AppLayout";

const Dashboard = React.lazy(() => import("./dashboard"));

const Jobs = React.lazy(() => import("./job"));

const Profile = React.lazy(() => import("./profile"));

const JobDetail = React.lazy(() => import("./detail"));

const JobOffer = React.lazy(() => import("../owner/offers/view-offers"));
const ManageUsers = React.lazy(() => import("./manage-users"));

const NewUser = React.lazy(() => import("./manage-users/new"));
const ContractorUsers = React.lazy(() => import("./contractor-users"));
const ContractorUsersNew = React.lazy(() => import("./contractor-users/new"));
const CreateOffer = React.lazy(() => import("./offer"));

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
              path={`${match.url}/profile`}
              render={(props) => <Profile {...props} />}
            />
            {
              <Route
                exacts
                strict
                path={`${match.url}/jobhistory`}
                render={(props) => <Jobs {...props} show={3} />}
              />
            }
            {
              <Route
                exacts
                strict
                path={`${match.url}/detail/:id`}
                render={(props) => <JobDetail {...props} />}
              />
            }
            {
              <Route
                exacts
                strict
                path={`${match.url}/offer/:id`}
                render={(props) => <JobOffer {...props} />}
              />
            }
            {
              <Route
                exacts
                strict
                path={`${match.url}/users/new`}
                render={(props) => <ContractorUsersNew {...props} />}
              />
            }
            {
              <Route
                exacts
                strict
                path={`${match.url}/users`}
                render={(props) => <ContractorUsers {...props} />}
              />
            }
            {
              <Route
                exacts
                strict
                path={`${match.url}/offers/create/:id`}
                render={(props) => <CreateOffer {...props} />}
              />
            }
            {
              <Route
                exacts
                strict
                path={`${match.url}/manage/new`}
                render={(props) => <NewUser {...props} />}
              />
            }
            {
              <Route
                exacts
                strict
                path={`${match.url}/manage`}
                render={(props) => <ManageUsers {...props} />}
              />
            }
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
