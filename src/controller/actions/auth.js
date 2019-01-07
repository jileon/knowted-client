import api from '../../controller/api';
import cache from '../../controller/api/cache';

export const AUTH_SUBMIT = 'AUTH_SUBMIT';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_CAPTURED_ERROR = 'AUTH_CAPTURED_ERROR';

/**
 * Components can consume this function to dispatch authentication via email/password.
 * On submit: state.auth.submitting === true
 * On success: state.auth.loggedIn === true
 * On fail: state.auth.error === some error object
 * @param {{email: string, password: string}} credentials
 */
export const submitAuthLogin = credentials => dispatch => {
  dispatch(authSubmit());
  api.auth
    .login(credentials)
    .then(user => dispatch(authSuccess(user)))
    .catch(err => dispatch(authError(err)));
};

/**
 * Components can consume this function to register AND login via name/email/password.
 * On submit: state.auth.submitting === true
 * On success: state.auth.loggedIn === true
 * On fail: state.auth.error === some error object
 * @param {{email: string, password: string}} credentials
 */
export const submitAuthRegistration = (
  credentials,
  params = null
) => dispatch => {
  dispatch(authSubmit());
  api.auth
    .register(credentials, params)
    .then(() => api.auth.login(credentials))
    .then(user => dispatch(authSuccess(user)))
    .catch(err => dispatch(authError(err)));
};

/**
 * Refreshes auth token. Does NOT check if auth token exists.
 * On submit: state.auth.submitting === true
 * On success: state.auth.loggedIn === true
 * On fail: state.auth.error === some error object
 */
export const submitAuthRefresh = () => dispatch => {
  dispatch(authSubmit());
  api.auth
    .refresh()
    .then(user => dispatch(authSuccess(user)))
    .catch(err => dispatch(authError(err)));
};

export const authLogout = () => {
  cache.authToken.clear();
  return {
    type: AUTH_LOGOUT
  };
};

export const authSubmit = () => ({
  type: AUTH_SUBMIT
});

export const authSuccess = user => ({
  type: AUTH_SUCCESS,
  payload: user
});

export const authError = err => ({
  type: AUTH_ERROR,
  payload: err
});

export const authCapturedError = () => ({
  type: AUTH_CAPTURED_ERROR
});
