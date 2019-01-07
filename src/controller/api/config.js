import cache from './cache';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

/**
 * Normalizes the behavior of fetch calls to RESTful APIs that return JSON.
 * @param {String} relativePath - the relative path for the AJAX call (e.g. /api/auth)
 * @param {{ method: string, auth: boolean | true, }} config - Configuration variables for fetch. Defaults to GET.
 * @param {null | {param: string}} params - An object of query parameters or none.
 * @returns the decoded JSON response.
 * @throws if response is not a 200-level response (i.e. fetch's res.ok is false).
 */
export function goFetch(relativePath, config = null, params = null) {
	const url = new URL(BACKEND_URL + relativePath);
	if (params !== null) Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));
	// set sensible default options
	const options = {
		method: 'get',
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		},
		mode: 'cors',
		auth: 'true',
		...config
	};
	// Serialize body if necessary
	if (options.body && typeof options.body === 'object') options.body = JSON.stringify(options.body);
	// Set auth header
	if (options.auth) {
		const token = cache.authToken.load();
		if (!token) {
			return Promise.reject({
				code: 400,
				message: 'Missing auth token for Authorization header.'
			});
		}
		delete options.token;
		options.headers.Authorization = `Bearer ${token}`;
	}
	return fetch(url, options).then(res => {
		if (!res.ok) {
			if (res.headers.has('content-type') && res.headers.get('content-type').startsWith('application/json')) {
				// It's a nice JSON error returned by us, so decode it
				return res.json().then(err => {
					err.code = res.status;
					return Promise.reject(err);
				});
			}
			// It's a less informative error returned by express
			return Promise.reject({
				code: res.status,
				message: res.statusText
			});
		}
		if (res.headers.has('content-type') && res.headers.get('content-type').startsWith('application/json'))
			return res.json();
		else return res;
	});
}
