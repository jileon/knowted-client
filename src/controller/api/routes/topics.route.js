import { goFetch } from '../config';
const BASE_URL = '/api/topics';

export default {
	/**
	 * Exposes GET /api/topics.
	 * Optional params: notebooks. Defaults to false.
	 * Topics have these props:
	 * id, title, parent, lastOpened, notebook,
	 * resourceOrder, created_at, updated_at.
	 * Params (default false): resourceOrder, notebooks.
	 * @param {{param: boolean}} params to toggle receiving data types
	 * @returns {[{}]} an array of topic objects
	 */
	get(params = null) {
		return goFetch(BASE_URL, null, params);
	},

	/**
	 * Exposes GET /api/topics/:id.
	 * Params (default true): notebook, resources, resourceOrder
	 * Topics have these props:
	 * id, title, parent, lastOpened, notebook,
	 * resourceOrder, created_at, updated_at.
	 * @param {number | string} topicId
	 * @param {{ param: boolean }} params - optional query params
	 * @returns {{}} a topic object
	 */
	getOne(topicId, params = null) {
		return goFetch(`${BASE_URL}/${topicId}`, null, params);
	},

	/**
	 * Exposes POST /api/topics.
	 * Topics can be created with these props:
	 * title, parent, notebook
	 * @param {{}} body
	 * @returns {[{}]} an array of topic objects
	 */
	post(body) {
		if (!body.title) throw new Error('Missing `title` in topic request body.');
		return goFetch(BASE_URL, { method: 'POST', body });
	},

	/**
	 * Exposes PUT /api/topics.
	 * Topics can be updated with these props:
	 * title, parent, notebook, lastOpened, resourceOrder
	 * @param {{}} body
	 * @returns {[{}]} an array of topic objects
	 */
	put(body) {
		if (!body.id) throw new Error('Missing `id` in topic request body.');
		return goFetch(`${BASE_URL}/${body.id}`, { method: 'PUT', body });
	},

	/**
	 * Exposes DELETE /api/topics/:id.
	 * @param {number | string} id
	 */
	delete(id) {
		return goFetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
	}
};
