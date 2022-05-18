import React, { useEffect } from 'react';
import { Row, Card, CardTitle, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
// import IntlMessages from '../helpers/IntlMessages';

const Error = () => {
  useEffect(() => {
    document.body.classList.add('background');
    document.body.classList.add('no-footer');

    return () => {
      document.body.classList.remove('background');
      document.body.classList.remove('no-footer');
    };
  }, []);

  return (
    <>
      <div className="fixed-background" />
      <main>
        <div className="container">
          <Row className="h-100">
              <Card className="auth-card">
                <div className="position-relative image-side ">
                  <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
                  <p className="white mb-0">Yes, it is indeed!</p>
                </div>
                <div className="form-side">
                  <NavLink to="/" className="white">
                    <span className="logo-single" />
                  </NavLink>
                  <CardTitle className="mb-4">
                    {/* <IntlMessages id="pages.error-title" /> */}
                  </CardTitle>
                  <p className="mb-0 text-muted text-small mb-0">
                    {/* <IntlMessages id="pages.error-code" /> */}
                  </p>
                  <p className="display-1 font-weight-bold mb-5">404</p>
                  <Button
                    href="/"
                    color="primary"
                    className="btn-shadow"
                    size="lg"
                  >
                    Back
                  </Button>
                </div>
              </Card>
          </Row>
        </div>
      </main>
    </>
  );
};

export default Error;
