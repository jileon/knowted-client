// Consts
import { AUTH_SUBMIT, AUTH_SUCCESS, AUTH_ERROR } from '../../actions/auth';
// Creators
import { authSubmit, authSuccess, authError } from '../../actions/auth';

const VALID_CREDENTIALS = {
  email: 'test@test.com',
  password: 'password'
};
const VALID_RESPONSE = {
  placeholder: '__here__'
};

const VALID_ERROR = {
  message: 'Some placeholder',
  status: 400
};

describe('Auth Actions', () => {
  // Consts
  describe('Constants', () => {
    it('AUTH_SUBMIT', () => expect(AUTH_SUBMIT).toEqual('AUTH_SUBMIT'));
    it('AUTH_SUCCESS', () => expect(AUTH_SUCCESS).toEqual('AUTH_SUCCESS'));
    it('AUTH_ERROR', () => expect(AUTH_ERROR).toEqual('AUTH_ERROR'));
  });

  // Creators
  describe('Action Creators', () => {
    it('Should dispatch AUTH_SUBMIT', () => {
      const expectedAction = {
        type: AUTH_SUBMIT
      };
      expect(authSubmit()).toEqual(expectedAction);
    });
    it('Should dispatch AUTH_SUCCESS with `user` payload', () => {
      const expectedAction = {
        type: AUTH_SUCCESS,
        payload: { ...VALID_RESPONSE }
      };
      expect(authSuccess(VALID_RESPONSE)).toEqual(expectedAction);
    });
    it('Should dispatch AUTH_ERROR with `err` payload', () => {
      const expectedAction = {
        type: AUTH_ERROR,
        payload: { ...VALID_ERROR }
      };
      expect(authError(VALID_ERROR)).toEqual(expectedAction);
    });
  });
});
