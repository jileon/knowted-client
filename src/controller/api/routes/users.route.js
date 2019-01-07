import { goFetch } from '../config';
const BASE_URL = '/api/users';

export default {
  /**
   * Convenience method to update the topicOrder for a given user.
   * userId is available at state.auth.user.id.
   * @param {number | string} userId
   * @param {[]} topicOrder - the array to be updated
   */
  updateTopicOrder(userId, topicOrder) {
    return goFetch(`${BASE_URL}/${userId}`, {
      method: 'PUT',
      body: { topicOrder }
    });
  },

  /**
   * Exposes PUT user/:id endpoint.
   * Updatable fields: topicOrder.
   * userId is available at state.auth.user.id.
   * @param {number | string} userId
   * @param {*} body
   */
  put(body) {
    if (!body.id) throw new Error('missing `id` in request body');
    return goFetch(`${BASE_URL}/${body.id}`, { method: 'PUT', body });
  }
};
