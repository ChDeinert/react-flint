import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => (
  <React.Fragment>
    <header>
      <Header />
    </header>
    {children}
    <footer>
      <Footer />
    </footer>
  </React.Fragment>
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
