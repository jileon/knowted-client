import { goFetch } from '../config';
const BASE_URL = '/api/metadata';

/**
 * Exposes GET /api/metadata
 * Required props: uri
 * @returns {{}} object with title and uri
 */
export default {
  get(uri) {
    return goFetch(
      BASE_URL,
      {
        method: 'GET',
        auth: false
      },
      { uri }
    );
  }
};
