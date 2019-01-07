import { goFetch } from '../config';
const BASE_URL = '/api/resources';

export default {
  /**
   * Convenience method to retrieve all resources ordered by when they were last opened.
   * Resource props: id, parent, title, uri, completed, last_opened.
   * @param {number} num - the number of resources to return
   * @returns {[{}]} an array of resource objects
   */
  recent(num) {
    return goFetch(BASE_URL, {}, { limit: num, orderBy: 'lastOpened' });
  },

  /**
   * Exposes GET /api/resources/:id.
   * Resource props: id, parent, title, uri, completed, last_opened.
   * @param {number | string} resourceId which is the `id` prop of a topic object
   * @returns {{}} a resouce object
   */
  getOne(resourceId) {
    return goFetch(`${BASE_URL}/${resourceId}`);
  },

  /**
   * Exposes POST /api/resources
   * Required props: parent, title, uri.
   * @param {{}} body
   * @returns {{}} the new resource object
   */
  post(body) {
    const required = ['parent', 'title', 'uri'];
    for (const prop of required) {
      if (!(prop in body)) {
        throw new Error(`Missing \`${prop}\` in resource request body.`);
      }
    }
    return goFetch(BASE_URL, { method: 'POST', body });
  },

  /**
   * Exposes PUT /api/resources/:id
   * Updatable props: parent, title, uri, completed, last_opened.
   * @param {{}} body
   */
  put(body) {
    if (!body.id) throw new Error('Missing `id` in resource request body.');
    return goFetch(`${BASE_URL}/${body.id}`, { method: 'PUT', body });
  },

  /**
   * Exposes DELETE /api/resources/:id.
   * @param {number | string} id
   */
  delete(id) {
    return goFetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  }
};
