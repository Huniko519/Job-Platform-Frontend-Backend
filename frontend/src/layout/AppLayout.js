import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Sidebar from '../containers/navs/Sidebar';
import Header from './header';

const AppLayout = ({ containerClassnames, children }) => {
  return (
    <div id="app-container" className={containerClassnames}>
      <Header />
      <Sidebar allMenu={true} />
      <main>
        <div className="container-fluid">{children}</div>
        {/* <Footer /> */}
      </main>
    </div>
  );
};
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};
const mapActionToProps = {};

export default withRouter(
  connect(mapStateToProps, mapActionToProps)(AppLayout)
);
