import cache from '../cache';
import { goFetch } from '../config';
const BASE_URL = '/auth';

/**
 * This object exposes auth endpoints from the backend.
 */
export default {
  /**
   * Registers a user with the backend server.
   * @param {{name: string, email: string, password: string}} credentials
   * @param {{}} params
   * @returns {{username: string, createdAt: string, updatedAt: string}}
   * @throws if user is not properly authenticated
   * @throws if any fields are missing
   */
  register(credentials, params = null) {
    return goFetch(
      '/api/users',
      {
        method: 'POST',
        body: credentials,
        auth: false
      },
      params
    ).then(res => {
      cache.authToken.save(res.authToken);
      return res;
    });
  },

  /**
   * Logs in to the backend server and stores token for future requests.
   * @param {{email: string, password: string}} credentials
   * @returns {{name: string, createdAt: string, updatedAt: string}}
   * @throws if user is not properly authenticated
   */
  login(credentials) {
    return goFetch(BASE_URL + '/login', {
      method: 'POST',
      body: credentials,
      auth: false
    }).then(res => {
      cache.authToken.save(res.authToken);
      return res;
    });
  },

  /**
   * Exchanges auth token for new auth token.
   * @returns {Boolean} true/false if auth succeeded and token is available for queries.
   */
  refresh() {
    return goFetch(BASE_URL + '/refresh', { method: 'POST' }).then(res => {
      cache.authToken.save(res.authToken);
      return res;
    });
  }
};
