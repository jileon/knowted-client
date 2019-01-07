import { goFetch } from '../config';
const BASE_URL = '/api/folders';

export default {
  /**
   * Exposes GET /api/folders.
   * Folders have these props: id, title, createdAt, updatedAt.
   * @returns {[{}]} an array of folder objects
   */
  get(params = null) {
    return goFetch(BASE_URL, null, params);
  },

  /**
   * Exposes POST /api/folders.
   * Creating folders can create these props: title.
   * @param {{title: string}} body
   * @returns {{}} the new folder object
   */
  post(body) {
    if (!body.title) throw new Error('Missing `title` in folder request body.');
    return goFetch(BASE_URL, { method: 'POST', body });
  },

  /**
   * Exposes PUT /api/folders/:id.
   * Folders can update these props: title.
   * Note: this endpoint accepts partial updates.
   * @param {{id: any}} body
   * @returns {{}} the updated folder object
   */
  put(body) {
    if (!body.id)
      throw new Error("Missing folder's `id` in folder request body.");
    return goFetch(`${BASE_URL}/${body.id}`, { method: 'PUT', body });
  },

  /**
   * Exposes DELETE /api/folders/:id
   * @param {number | string} id
   */
  delete(id) {
    if (!id) throw new Error("Missing folder's `id` in folder request body.");
    return goFetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  }
};
