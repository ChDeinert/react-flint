import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';

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
