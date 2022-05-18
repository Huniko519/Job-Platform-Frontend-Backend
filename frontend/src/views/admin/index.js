import React, { Suspense } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import AppLayout from "../../layout/AppLayout";

const Dashboard = React.lazy(() => import("./dashboard"));

const Questions = React.lazy(() => import("./questions"));

const Profile = React.lazy(() => import("./profile"));

const Contractors = React.lazy(() => import("./contractors"));

const NewContractor = React.lazy(() => import("./contractors/new"));

const EditContractor = React.lazy(() => import("./contractors/edit"));

const ApproveContractor = React.lazy(() => import("./contractors/approve"));

const Clients = React.lazy(() => import("./clients"));

const NewClient = React.lazy(() => import("./clients/new"));

const EditClient = React.lazy(() => import("./clients/edit"));

const Admins = React.lazy(() => import("./admins"));

const NewAdmin = React.lazy(() => import("./admins/new"));

const EditAdmin = React.lazy(() => import("./admins/edit"));

const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect
              exact
              from={`${match.url}/`}
              to={`${match.url}/dashboard`}
            />
            <Route
              path={`${match.url}/dashboard`}
              render={(props) => <Dashboard {...props} />}
            />
            <Route
              path={`${match.url}/questions`}
              render={(props) => <Questions {...props} />}
            />
            <Route
              path={`${match.url}/profile`}
              render={(props) => <Profile {...props} />}
            />
            <Route
              exacts
              trict
              path={`${match.url}/contractors/new`}
              render={(props) => <NewContractor {...props} />}
            />
            <Route
              exacts
              trict
              path={`${match.url}/contractors/edit/:id`}
              render={(props) => <EditContractor {...props} />}
            />

            <Route
              exacts
              trict
              path={`${match.url}/contractors/approve`}
              render={(props) => <ApproveContractor {...props} />}
            />
            <Route
              exacts
              trict
              path={`${match.url}/contractors`}
              render={(props) => <Contractors {...props} />}
            />
            <Route
              exacts
              trict
              path={`${match.url}/clients/new`}
              render={(props) => <NewClient {...props} />}
            />
            <Route
              exacts
              trict
              path={`${match.url}/clients/edit/:id`}
              render={(props) => <EditClient {...props} />}
            />
            <Route
              exacts
              trict
              path={`${match.url}/clients`}
              render={(props) => <Clients {...props} />}
            />
            <Route
              exacts
              trict
              path={`${match.url}/superadmins/new`}
              render={(props) => <NewAdmin {...props} />}
            />
            <Route
              exacts
              trict
              path={`${match.url}/superadmins/edit/:id`}
              render={(props) => <EditAdmin {...props} />}
            />
            <Route
              exacts
              trict
              path={`${match.url}/superadmins`}
              render={(props) => <Admins {...props} />}
            />
            <Route
              exacts
              strict
              path={`/error`}
              render={(props) => <Dashboard {...props} />}
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
