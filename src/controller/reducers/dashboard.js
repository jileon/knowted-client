import {
  DASHBOARD_POPULATE_SUCCESS,
  ADD_TOPIC_SUCCESS,
  UPDATE_TOPIC_SUCCESS,
  UPDATE_TOPIC_PARENT_SUCCESS,
  DASHBOARD_UPDATE_TOPIC_PARENT_OPT,
  DELETE_TOPIC_SUCCESS,
  DISPLAY_EDIT_FOLDER_FORM,
  HIDE_EDIT_FOLDER_FORM,
  ADD_FOLDER_SUCCESS,
  UPDATE_FOLDER_SUCCESS,
  DASHBOARD_DELETE_FOLDER,
  API_ERROR,
  UPDATE_TOPIC_SUBMIT
} from '../actions/dashboard';
import produce from 'immer';

const initialState = {
  topics: [],
  lonelyTopics: null,
  folders: null,
  folderOrder: null,
  recentResources: null,
  editingFolder: false,
  currentFolderId: null,
  loading: true,
  error: null
};

export default produce((state, action) => {
  switch (action.type) {
    case DASHBOARD_POPULATE_SUCCESS: {
      const { folders, topics, recentResources } = action.payload;

      state.error = null;
      state.recentResources = recentResources;
      state.loading = false;

      // Hydrate folders
      let folderObject = {};
      let folderOrder = [];
      for (const folder of folders) {
        const id = folder.id;
        // Add each folder ID to folderOrder
        folderOrder.push(id);
        // Add each folder to folder object
        folderObject[id] = folder;
        // Add a topics array for the topic IDs each folder owns
        folderObject[id].topics = [];
      }
      state.folders = folderObject;
      state.folderOrder = folderOrder;

      // Hydrate topics
      let topicObject = {};
      let lonelyTopics = [];
      for (const topic of topics) {
        const id = topic.id;
        topicObject[id] = topic;
        if (topic.parent === null) {
          lonelyTopics.push(id);
        } else {
          const parent = topic.parent.id;
          state.folders[parent].topics.push(id);
        }
      }
      state.lonelyTopics = lonelyTopics;
      state.topics = topicObject;
      return;
    }

    case ADD_TOPIC_SUCCESS: {
      state.loading = false;
      state.error = null;
      const topic = action.payload;
      const parent = topic.parent && topic.parent.id;
      const targetArray = parent
        ? state.folders[parent].topics
        : state.lonelyTopics;
      targetArray.unshift(topic.id);
      state.topics[topic.id] = topic;
      return;
    }

    case UPDATE_TOPIC_SUCCESS: {
      state.loading = false;
      state.error = null;
      const topic = action.payload;
      state.topics[topic.id] = topic;
      return;
    }

    case UPDATE_TOPIC_PARENT_SUCCESS: {
      state.loading = false;
      state.error = null;

      const topicId = action.payload.id;
      const topic = action.payload;

      // Update topics object
      state.topics[topicId] = topic;
      return;
    }

    case DELETE_TOPIC_SUCCESS: {
      state.loading = false;

      const topic = state.topics[action.payload];
      const parent = topic.parent && topic.parent.id;

      // Find which ordering array references the topic
      let targetArray = parent
        ? state.folders[parent].topics
        : state.lonelyTopics;
      const index = targetArray.findIndex(
        id => String(id) === String(topic.id)
      );

      // Remove topic from ordering array
      if (index > -1) targetArray.splice(index, 1);

      // Remove topic from topic object
      delete state.topics[topic.id];

      return;
    }

    case ADD_FOLDER_SUCCESS: {
      state.loading = false;
      state.error = null;
      const folder = action.payload;
      folder.topics = folder.topics || [];

      // Remove any references to topics elsewhere
      for (const topicId of folder.topics) {
        const prevParent =
          state.topics[topicId].parent && state.topics[topicId].parent.id;
        const prevArr = prevParent
          ? state.folders[String(prevParent)].topics
          : state.lonelyTopics;
        // Remove from old ordering location
        const index = prevArr.findIndex(id => String(id) === String(topicId));
        prevArr.splice(index, 1);
      }

      state.folderOrder.unshift(folder.id);
      state.folders[folder.id] = folder;
      return;
    }

    case UPDATE_FOLDER_SUCCESS: {
      state.loading = false;
      state.error = null;
      const folder = action.payload;
      // Preserve topics array
      folder.topics = state.folders[folder.id].topics;
      state.folders[folder.id] = folder;
      return;
    }

    case DISPLAY_EDIT_FOLDER_FORM: {
      state.error = null;
      state.currentFolderId = action.payload;
      state.editingFolder = true;
      return;
    }

    case HIDE_EDIT_FOLDER_FORM: {
      state.error = null;
      state.currentFolderId = null;
      state.editingFolder = false;
      return;
    }

    case DASHBOARD_DELETE_FOLDER: {
      const folderId = action.payload;
      // Add any topics to lonely topics
      const orphanedTopics = state.folders[folderId].topics;
      state.lonelyTopics.unshift(...orphanedTopics);
      // Remove from ordered array
      const index = state.folderOrder.findIndex(id => id === folderId);
      if (index > -1) state.folderOrder.splice(index, 1);
      // Remove from object
      delete state.folders[folderId];
      return;
    }

    case UPDATE_TOPIC_SUBMIT: {
      const topic = action.payload;
      // replace existing contents with new body optimistically
      state.topics[topic.id] = { ...state.topics[topic.id], ...action.payload };
      return;
    }

    case DASHBOARD_UPDATE_TOPIC_PARENT_OPT: {
      const topicId = action.payload.id;

      // Locate the ordering locations
      const prevParent =
        state.topics[topicId].parent && state.topics[topicId].parent.id;
      const newParent = action.payload.parent;
      const prevArr = prevParent
        ? state.folders[String(prevParent)].topics
        : state.lonelyTopics;
      const newArr = newParent
        ? state.folders[String(newParent)].topics
        : state.lonelyTopics;

      // Remove from old ordering location
      const index = prevArr.findIndex(id => String(id) === String(topicId));
      prevArr.splice(index, 1);

      // Add to new ordering location
      newArr.unshift(topicId);

      return;
    }

    case API_ERROR: {
      state.error = action.payload;
      return;
    }

    default:
      return;
  }
}, initialState);
