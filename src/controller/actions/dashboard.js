import api from '../../controller/api';

export const initializeDashboard = num => dispatch => {
  return Promise.all([
    api.folders.get({ orderBy: 'updatedAt' }),
    api.topics.get({ orderBy: 'updatedAt' }),
    api.resources.recent(num)
    // api.users.get()
  ])
    .then(([folders, topics, recentResources]) => {
      dispatch(
        dashboardPopulateSuccess({
          folders,
          topics,
          recentResources
        })
      );
    })
    .catch(err => dispatch(apiError(err)));
};

//-- TOPIC ASYNC --

/**
 * Components can consume this function to add a new Topic
 * On submit: state.topic.loading === true
 * On success: state.topic.topics === [of topics]
 * On fail: state.topic.error === some error object
 * @param {{title: string}} object
 */
export const addTopic = title => dispatch => {
  api.topics
    .post({ title })
    .then(topic => dispatch(addTopicSuccess(topic)))
    .catch(err => dispatch(apiError(err)));
};

/**
 * Components can consume this function to update a Topic
 * On submit: state.topic.loading === true
 * On success: state.topic.topics === [of topics]
 * On fail: state.topic.error === some error object
 * @param {{title: string, id: number}} object
 */
export const updateTopic = body => dispatch => {
  if ('parent' in body) dispatch(updateTopicParentOptimistically(body));
  api.topics
    .put(body)
    .then(topic => dispatch(updateTopicSuccess(topic)))
    .catch(err => dispatch(apiError(err)));
};

/**
 * Components can consume this function to delete a Topic
 * On submit: state.topic.loading === true
 * On delete:
 * On fail: state.topic.error === some error object
 * @param {{id: number}} object
 */
export const deleteTopic = id => dispatch => {
  api.topics
    .delete(id)
    .then(() => dispatch(deleteTopicSuccess(id)))
    .catch(err => dispatch(apiError(err)));
};

/**
 * Components can consume this function to update the topic order
 * On submit: state.topic.loading === true
 * On success: state.topic.topics === [of topics]
 * On fail: state.topic.error === some error object
 * @param {{id: number}} object
 */
// export const updateTopicOrder = (topicOrder, userId) => dispatch => {
//   api.users
//     .put({ topicOrder, userId })
//     .then(topics => dispatch(updateTopicOrderSuccess(topics)))
//     .catch(err => dispatch(apiError(err)));
// };

/**
 * Components can consume this function to update the topic order
 * On submit: state.topic.loading === true
 * On success: state.topic.topics === [of topics]
 * On fail: state.topic.error === some error object
 * @param {{id: number}} object
 */
export const updateTopicsParents = (
  topicId1,
  topicId2,
  folderId
) => dispatch => {
  Promise.all([
    api.topics.put({ id: topicId1, parent: folderId }),
    api.topics.put({ id: topicId2, parent: folderId })
  ])
    .then(([topic1, topic2]) => {
      dispatch(updateTopicParentSuccess(topic1));
      dispatch(updateTopicParentSuccess(topic2));
      dispatch(displayEditFolderForm(folderId));
    })
    .catch(err => dispatch(apiError(err)));
};

//-- FOLDER ASYNC --

/**
 * Components can consume this function to add a new Folders
 * On submit: state.folders.loading === true
 * On success: state.folders.folders === [of folders]
 * On fail: state.folders.error === some error object
 * @param {{title: string}} object
 */
export const mergeTopicsNewFolder = (title, topicId1, topicId2) => dispatch => {
  api.folders
    .post({ title })
    .then(folder => {
      folder.topics = [topicId1, topicId2];
      dispatch(addFolderSuccess(folder));
      dispatch(updateTopicsParents(topicId1, topicId2, folder.id));
    })
    .catch(err => dispatch(apiError(err)));
};

/**
 * Components can consume this function to update a Topic
 * On submit: state.topic.loading === true
 * On success: state.topic.topics === [of topics]
 * On fail: state.topic.error === some error object
 * @param {{id: string, others?}} body
 */
export const updateFolder = body => dispatch => {
  api.folders
    .put(body)
    .then(folder => dispatch(updateFolderSuccess(folder)))
    .catch(err => dispatch(apiError(err)));
};

export const deleteEmptyFolder = id => dispatch => {
  dispatch(deleteFolder(id));
  api.folders.delete(id).catch(err => dispatch(apiError(err)));
};

//-----------------------------------------------------------

export const DASHBOARD_POPULATE_SUCCESS = 'DASHBOARD_POPULATE_SUCCESS';
export const dashboardPopulateSuccess = data => ({
  type: DASHBOARD_POPULATE_SUCCESS,
  payload: data
});

export const API_ERROR = 'API_ERROR';
export const apiError = err => ({
  type: API_ERROR,
  payload: err
});

// -- TOPIC ACTIONS --
export const ADD_TOPIC_SUCCESS = 'ADD_TOPIC_SUCCESS';
export const addTopicSuccess = topic => ({
  type: ADD_TOPIC_SUCCESS,
  payload: topic
});

export const UPDATE_TOPIC_SUCCESS = 'UPDATE_TOPIC_SUCCESS';
export const updateTopicSuccess = topic => ({
  type: UPDATE_TOPIC_SUCCESS,
  payload: topic
});

export const UPDATE_TOPIC_PARENT_SUCCESS = 'UPDATE_TOPIC_PARENT_SUCCESS';
export const updateTopicParentSuccess = topic => ({
  type: UPDATE_TOPIC_PARENT_SUCCESS,
  payload: topic
});

export const DELETE_TOPIC_SUCCESS = 'DELETE_TOPIC_SUCCESS';
export const deleteTopicSuccess = topicId => {
  return {
    type: DELETE_TOPIC_SUCCESS,
    payload: topicId
  };
};

export const UPDATE_TOPIC_ORDER_SUCCESS = 'UPDATE_TOPIC_ORDER_SUCCESS';
export const updateTopicOrderSuccess = topics => ({
  type: UPDATE_TOPIC_ORDER_SUCCESS,
  payload: topics
});

//-- FOLDER ACTIONS --

export const DISPLAY_EDIT_FOLDER_FORM = 'DISPLAY_EDIT_FOLDER_FORM';
export const displayEditFolderForm = currentFolderId => ({
  type: DISPLAY_EDIT_FOLDER_FORM,
  payload: currentFolderId
});

export const HIDE_EDIT_FOLDER_FORM = 'HIDE_EDIT_FOLDER_FORM';
export const hideEditFolderForm = currentFolderId => ({
  type: HIDE_EDIT_FOLDER_FORM,
  payload: currentFolderId
});

export const ADD_FOLDER_SUCCESS = 'ADD_FOLDER_SUCCESS';
export const addFolderSuccess = folder => ({
  type: ADD_FOLDER_SUCCESS,
  payload: folder
});

export const UPDATE_FOLDER_SUCCESS = 'UPDATE_FOLDER_SUCCESS';
export const updateFolderSuccess = folder => ({
  type: UPDATE_FOLDER_SUCCESS,
  payload: folder
});

export const UPDATE_TOPIC_SUBMIT = 'UPDATE_TOPIC_SUBMIT';
export const submitTopicUpdate = body => ({
  type: UPDATE_TOPIC_SUBMIT,
  payload: body
});

export const DASHBOARD_DELETE_FOLDER = 'DASHBOARD_DELETE_FOLDER';
export const deleteFolder = id => ({
  type: DASHBOARD_DELETE_FOLDER,
  payload: id
});

export const DASHBOARD_UPDATE_TOPIC_PARENT_OPT =
  'DASHBOARD_UPDATE_TOPIC_PARENT_OPT';
export const updateTopicParentOptimistically = body => ({
  type: DASHBOARD_UPDATE_TOPIC_PARENT_OPT,
  payload: { id: body.id, parent: body.parent }
});
