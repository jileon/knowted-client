import api from '../api';

export const LEARN_RESET = 'LEARN_RESET';
export const LEARN_INITIALIZE_SUCCESS = 'LEARN_INITIALIZE_SUCCESS';
export const LEARN_API_ERROR = 'LEARN_API_ERROR';
// Update notebook actions
export const LEARN_NOTEBOOK_UPDATE_SUBMIT = 'LEARN_NOTEBOOK_UPDATE_SUBMIT';
export const LEARN_NOTEBOOK_UPDATE_SUCCESS = 'LEARN_NOTEBOOK_UPDATE_SUCCESS';
export const LEARN_NOTEBOOK_UPDATE_ERROR = 'LEARN_NOTEBOOK_UPDATE_ERROR';

export const LEARN_COMPLETE_RESOURCE_SUBMIT = 'LEARN_COMPLETE_RESOURCE_SUBMIT';
export const LEARN_COMPLETE_RESOURCE_SUCCESS = 'LEARN_COMPLETE_RESOURCE_SUCCESS';
export const LEARN_COMPLETE_RESOURCE_ERROR = 'LEARN_COMPLETE_RESOURCE_ERROR';

/**
 * Ensures state is not stale and populates the learn region with data.
 * If state is stale, it resets the state to the initial state.
 * @param {number | string} topicId - given by routing
 * @param {number | string} resourceId - given by routing
 */
export const initializeLearn = (topicId, resourceId) => (dispatch, getState) => {
	const currentTopic = getState().learn.topic;
	const currentResource = getState().learn.resource;

	const topicIsStale = currentTopic && currentTopic.id !== topicId;
	const resourceIsStale = currentResource && currentResource.id !== resourceId;

	if (topicIsStale || resourceIsStale) {
		dispatch(resetLearn());
	}

	return Promise.all([api.topics.getOne(topicId, { resources: true }), api.resources.getOne(resourceId)])
		.then(([topic, resource]) => {
			dispatch(initializeSuccess({ topic, resource }));
		})
		.catch(err => dispatch(apiError(err)));
};

/**
 * Persist updates to a topic's notebook asynchronously.
 * @param {{id: string, notebook: {}}} req
 */
export const submitNotebookUpdate = req => dispatch => {
	dispatch(notebookUpdateSubmit());
	api.topics
		.put(req)
		.then(() => dispatch(notebookUpdateSuccess(req)))
		.catch(err => dispatch(notebookUpdateError(err)));
};

export const submitCompleteResource = req => dispatch => {
	dispatch(completeResourceSubmit());
	return api.resources
		.put({ id: req, completed: true })
		.then(res => dispatch(completeResourceSuccess(res)))
		.catch(err => dispatch(completeResourceError(err)));
};

export const resetLearn = () => ({
	type: LEARN_RESET
});

export const initializeSuccess = res => ({
	type: LEARN_INITIALIZE_SUCCESS,
	payload: res
});

export const apiError = err => ({
	type: LEARN_API_ERROR,
	payload: err
});

const completeResourceSubmit = id => ({
	type: LEARN_COMPLETE_RESOURCE_SUBMIT,
	payload: id
});

const completeResourceSuccess = res => ({
	type: LEARN_COMPLETE_RESOURCE_SUCCESS,
	payload: res
});

const completeResourceError = error => ({
	type: LEARN_COMPLETE_RESOURCE_ERROR,
	payload: error
});

const notebookUpdateSubmit = () => ({
	type: LEARN_NOTEBOOK_UPDATE_SUBMIT
});

// req = { id, notebook }
const notebookUpdateSuccess = req => ({
	type: LEARN_NOTEBOOK_UPDATE_SUCCESS,
	payload: req
});

const notebookUpdateError = error => ({
	type: LEARN_NOTEBOOK_UPDATE_ERROR,
	payload: error
});
