/**
 * Interface for managing the authToken cache
 * @interface
 */
const authToken = {
	/**
	 * Caches an auth token to persist authentication between sessions.
	 * @param {string} authToken - a raw token for authentication
	 */
	save(authToken) {
		try {
			localStorage.setItem('authToken', authToken);
		} catch (e) {}
	},
	/**
	 * Clears an auth token from cache.
	 */
	clear() {
		try {
			localStorage.removeItem('authToken');
		} catch (e) {}
	},
	/**
	 * Loads an auth token from cache if it exists.
	 * @returns A string or undefined depending on if a token exists in cache.
	 */
	load() {
		return localStorage.getItem('authToken');
	}
};

const requests = {
	_KEY: 'cachedRequests',

	/**
	 * Stores a request for later retrieval.
	 * Required param props: userId, action (name), and payload.
	 * See App.js for more configuration.
	 * @param {{userId: string, action: string, payload: {}}} request
	 */
	push(request) {
		const bufferExists = localStorage.getItem(this._KEY);
		const buffer = bufferExists ? JSON.parse(bufferExists) : [];
		buffer.push(request);
		localStorage.setItem(this._KEY, JSON.stringify(buffer));
	},

	/**
	 * Pops all cached requests from storage.
	 */
	pop() {
		const result = JSON.parse(localStorage.getItem(this._KEY));
		localStorage.removeItem(this._KEY);
		return result || [];
	}
};

const cache = {
	authToken,
	requests
};

export default cache;
