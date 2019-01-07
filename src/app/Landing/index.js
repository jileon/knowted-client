import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Hero from './Hero';
import Login from './Login';
import Register from './Register';

export class Landing extends Component {
  static propTypes = {
    submitting: PropTypes.bool.isRequired,
    loggedIn: PropTypes.bool.isRequired
  };

  render() {
    const authState = {
      submitting: this.props.submitting,
      loggedIn: this.props.loggedIn
    };
    return (
      <>
        <Route exact path="/" render={() => <Hero {...authState} />} />

        <Route exact path="/login" render={() => <Login {...authState} />} />
        <Route
          exact
          path="/register"
          render={() => <Register {...authState} />}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  submitting: state.auth.submitting,
  loggedIn: state.auth.loggedIn
});

export default connect(mapStateToProps)(Landing);
