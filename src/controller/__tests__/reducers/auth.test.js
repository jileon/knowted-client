import { AUTH_SUBMIT, AUTH_SUCCESS, AUTH_ERROR } from '../../actions/auth';
import reducer, { initialState } from '../../reducers/auth';

/*
initialState = {
	authToken: null,
	loggedIn: false,
	user: null,
	submitting: false,
	error: null
};
*/

describe('Auth Reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(initialState);
	});
	// `submitting` state
	it('updates auth.state.submitting on AUTH_SUBMIT', () => {
		expect(reducer(initialState, { type: AUTH_SUBMIT })).toEqual({ ...initialState, submitting: true });
	});
	it('updates auth.state.submitting on AUTH_SUCCESS and AUTH_ERROR', () => {
		expect(reducer(initialState, { type: AUTH_SUCCESS, payload: "doesn't matter" }).submitting).toEqual(false);
		expect(reducer(initialState, { type: AUTH_ERROR, payload: "doesn't matter" }).submitting).toEqual(false);
	});

	//TODO: test authToken, loggedIn, user, error when wired up to backend
});
