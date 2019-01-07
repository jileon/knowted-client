import React from 'react';
import Nav from './Nav';

const withNav = WrappedComponent => {
  class WithNav extends React.Component {
    render() {
      return (
        <>
          <Nav />
          <WrappedComponent {...this.props} />
        </>
      );
    }
  }

  WithNav.displayName = `WithNav(${WrappedComponent.displayName ||
    WrappedComponent.name ||
    'Component'})`;

  return WithNav;
};

export default withNav;
