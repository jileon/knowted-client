import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index.js';
import cache from './api/cache';
import { submitAuthRefresh } from './actions/auth';

const store = createStore(rootReducer, applyMiddleware(thunk));

// Hydrates token from cache if it exists
if (cache.authToken.load()) {
	store.dispatch(submitAuthRefresh());
}

export default store;
