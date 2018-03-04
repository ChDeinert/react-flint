import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from 'Components/Header';
import Footer from 'Components/Footer';

const Layout = ({ children }) => (
  <Fragment>
    <Header />
    {children}
    <Footer />
  </Fragment>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Layout.defaultProps = {
  children: null,
};

export default Layout;
