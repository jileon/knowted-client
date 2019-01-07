import {
  AUTH_SUBMIT,
  AUTH_SUCCESS,
  AUTH_ERROR,
  AUTH_LOGOUT,
  AUTH_CAPTURED_ERROR
} from '../actions/auth';
import produce from 'immer';

export const initialState = {
  loggedIn: false,
  user: null,
  submitting: false,
  error: null
};

export default produce((state, action) => {
  switch (action.type) {
    case AUTH_SUBMIT:
      state.submitting = true;
      state.error = null;
      return;

    case AUTH_SUCCESS:
      delete action.payload.authToken;
      state.submitting = false;
      state.error = null;
      state.user = action.payload;
      state.loggedIn = true;
      return;

    case AUTH_ERROR:
      return { ...initialState, error: action.payload };

    case AUTH_CAPTURED_ERROR:
      state.error = null;
      return;

    case AUTH_LOGOUT:
      return { ...initialState };

    default:
      return;
  }
}, initialState);
