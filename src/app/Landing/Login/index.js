import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  submitAuthLogin,
  authCapturedError
} from '../../../controller/actions/auth';
import { validateEmail, validatePassword } from '../../common/validate';
import {
  Container,
  Form,
  Input,
  Label,
  Warning
} from '../../styles/form.styles';
import { Button } from '../../styles/common.styles';

export class Login extends Component {
  state = {
    email: {
      dirty: false,
      input: '',
      valid: false
    },
    password: {
      dirty: false,
      input: '',
      valid: false
    }
  };

  static propTypes = {
    submitting: PropTypes.bool.isRequired,
    loggedIn: PropTypes.bool.isRequired
  };

  handleLoginSubmit = e => {
    e.preventDefault();
    const { password, email } = this.state;
    this.setState({ warning: '' }, () => {
      try {
        validateEmail(email.input);
        validatePassword(password.input);

        this.props.dispatch(
          submitAuthLogin({
            email: email.input,
            password: password.input
          })
        );
      } catch (err) {
        this.setState({ warning: err.message });
      }
    });
  };

  manageEmailInput = e => {
    // TODO: Add form validation
    const input = e.currentTarget.value;
    this.setState({
      email: {
        dirty: true,
        input: input,
        valid: true
      }
    });
  };

  managePasswordInput = e => {
    // TODO: Add form validation
    const input = e.currentTarget.value;
    this.setState({
      password: {
        dirty: true,
        input: input,
        valid: true
      }
    });
  };

  render() {
    let { submitting, loggedIn, authError, dispatch } = this.props;

    if (loggedIn) return <Redirect to="/dashboard" />;

    const { warning } = this.state;

    if (authError) {
      if (authError.code && authError.code === 401)
        authError = 'Incorrect email or password';
      else authError = 'Call the paramedics! Our servers are down';
      dispatch(authCapturedError());
      this.setState({ warning: authError });
    }

    return (
      <Container>
        <h1 className="form-title">login & learn</h1>
        <Form onSubmit={this.handleLoginSubmit} className="login">
          <Warning
            style={authError || warning ? null : { visibility: 'hidden' }}
          >
            <p>{authError || warning}</p>
          </Warning>

          <Label htmlFor="email">Email</Label>
          <Input
            value={this.state.email.input}
            onChange={this.manageEmailInput}
            type="email"
            name="email"
          />
          <Label htmlFor="password">Password</Label>
          <Input
            value={this.state.password.input}
            onChange={this.managePasswordInput}
            type="password"
            name="password"
          />
          <Button className="login-button" type="submit" disabled={submitting}>
            LET'S GO
          </Button>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  authError: state.auth.error
});

export default connect(mapStateToProps)(Login);
