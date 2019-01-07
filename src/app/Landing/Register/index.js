import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  submitAuthRegistration,
  authCapturedError
} from '../../../controller/actions/auth';
import {
  validateFirstName,
  validateEmail,
  validatePassword
} from '../../common/validate';
import {
  Container,
  Form,
  Input,
  Label,
  Warning
} from '../../styles/form.styles';
import { Button } from '../../styles/common.styles';

export class Register extends Component {
  state = {
    warning: '',
    firstName: {
      dirty: false,
      input: '',
      valid: false
    },
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

  handleRegisterSubmit = e => {
    e.preventDefault();
    const { password, email, firstName } = this.state;
    this.setState({ warning: '' }, () => {
      try {
        validateFirstName(firstName.input);
        validateEmail(email.input);
        validatePassword(password.input);

        this.props.dispatch(
          submitAuthRegistration({
            name: firstName.input,
            email: email.input,
            password: password.input
          })
        );
      } catch (err) {
        this.setState({ warning: err.message });
      }
    });
  };

  manageNameInput = e => {
    const input = e.currentTarget.value;
    this.setState({
      firstName: {
        dirty: true,
        input: input,
        valid: true
      }
    });
  };

  manageEmailInput = e => {
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
    const { submitting, loggedIn, authError, dispatch } = this.props;
    const { firstName, email, password, warning } = this.state;

    if (authError) {
      dispatch(authCapturedError());
      this.setState({ warning: 'Call the paramedics! Our servers are down' });
    }

    if (loggedIn) return <Redirect to="/dashboard" />;
    return (
      <Container>
        <h1 className="form-title">Sign up for a free account</h1>
        <Form onSubmit={this.handleRegisterSubmit} className="register">
          <Warning
            style={authError || warning ? null : { visibility: 'hidden' }}
          >
            <p>{authError || warning}</p>
          </Warning>
          <Label htmlFor="first-name">What's your first name?</Label>
          <Input
            value={firstName.input}
            onChange={this.manageNameInput}
            type="text"
            name="first-name"
          />
          <Label htmlFor="email">How about your email?</Label>
          <Input
            value={email.input}
            onChange={this.manageEmailInput}
            type="email"
            name="email"
          />
          <Label htmlFor="password">
            Make up a password at least 8 characters long
          </Label>
          <Input
            value={password.input}
            onChange={this.managePasswordInput}
            type="password"
            name="password"
          />
          <Button
            className="register-button"
            type="submit"
            disabled={submitting}
          >
            LET'S GO
          </Button>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  authError: state.auth.error && state.auth.error.message
});

export default connect(mapStateToProps)(Register);
