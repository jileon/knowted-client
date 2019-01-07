import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { authLogout } from '../../controller/actions/auth';
import { NavBar } from '../styles/common.styles';

export class Nav extends Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired
  };

  render() {
    const { dispatch } = this.props;
    return (
      <>
        {this.props.loggedIn ? (
          <NavBar className="nav">
            <Link to="/" className="nav-branding">
              <img
                className="nav-branding-img"
                src={require('../images/owl.png')}
                alt="Knowted Logo"
              />{' '}
              Knowted
            </Link>
            <nav className="nav-loggedIn">
              <Link
                className="nav-link"
                to="#"
                onClick={() => dispatch(authLogout())}
              >
                Log out
              </Link>
            </nav>
          </NavBar>
        ) : (
          <NavBar className="landing-nav">
            <Link to="/" className="nav-branding">
              <img
                className="nav-branding-img"
                src={require('../images/owl.png')}
                alt="Knowted Logo"
              />{' '}
              Knowted
            </Link>
            <nav className="nav-anon">
              <Link className="nav-link" to="/register">
                Sign up
              </Link>
              <Link className="nav-link" to="/login">
                Log in
              </Link>
            </nav>
          </NavBar>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn
});

export default connect(mapStateToProps)(Nav);
