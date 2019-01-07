import produce from 'immer';
import {
	LEARN_RESET,
	LEARN_INITIALIZE_SUCCESS,
	LEARN_API_ERROR,
	LEARN_NOTEBOOK_UPDATE_SUBMIT,
	LEARN_NOTEBOOK_UPDATE_SUCCESS,
	LEARN_NOTEBOOK_UPDATE_ERROR,
	LEARN_COMPLETE_RESOURCE_SUBMIT,
	LEARN_COMPLETE_RESOURCE_SUCCESS,
	LEARN_COMPLETE_RESOURCE_ERROR
} from '../actions/learn';

const initialState = {
	topic: null,
	resource: null,
	loading: true,
	error: null
};

export default produce((state, action) => {
	switch (action.type) {
		case LEARN_INITIALIZE_SUCCESS:
			const { topic, resource } = action.payload;
			state.topic = topic;
			state.resource = resource;

			state.loading = false;
			state.error = null;
			return;

		case LEARN_RESET:
			return { ...initialState };

		case LEARN_API_ERROR:
			return { ...initialState, error: action.payload };

		case LEARN_NOTEBOOK_UPDATE_SUBMIT:
			state.error = null;
			return;

		case LEARN_NOTEBOOK_UPDATE_SUCCESS:
			state.topic.notebook = action.payload.notebook;
			return;

		case LEARN_NOTEBOOK_UPDATE_ERROR:
			state.error = action.payload;
			return;

		case LEARN_COMPLETE_RESOURCE_SUBMIT:
			state.error = null;
			return;

		case LEARN_COMPLETE_RESOURCE_SUCCESS:
			state.resource.completed = action.payload.completed;
			return;

		case LEARN_COMPLETE_RESOURCE_ERROR:
			state.error = action.payload;
			return;

		default:
			return;
	}
}, initialState);
