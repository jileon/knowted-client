import api from '../../controller/api';

export const RESOURCE_SUCCESS = 'RESOURCE_SUCCESS';
export const resourceSuccess = data => ({
  type: RESOURCE_SUCCESS,
  payload: data
});

export const RESOURCE_ERROR = 'RESOURCE_ERROR';
export const resourceError = error => ({
  type: RESOURCE_ERROR,
  payload: error
});

export const ADD_RESOURCE = 'ADD_RESOURCE';
export const addResource = resource => ({
  type: ADD_RESOURCE,
  payload: resource
});

export const UPDATE_RESOURCE = 'UPDATE_RESOURCE';
export const updateResource = resource => ({
  type: UPDATE_RESOURCE,
  payload: resource
});

export const UPDATE_RESC_ORDER = 'UPDATE_RESC_ORDER';
export const updateResourceOrder = rescOrder => ({
  type: UPDATE_RESC_ORDER,
  payload: rescOrder
});
export const DELETE_RESOURCE = 'DELETE_RESOURCE';
export const delResource = id => ({
  type: DELETE_RESOURCE,
  id
});

export const TOPICDASH_RESET = 'TOPICDASH_RESET';
export const topicDashReset = () => ({
  type: TOPICDASH_RESET
});

/**
 *Gets topic information for a specified topicID includeing resources, resource order, topic title, and ID
 *First dispatches a loading function to change state to loading
 *Second: Sends GET request to the server using api.topic
 * Third: Dispatches resource_success action to add new data from server to current state
 * If there is an error, it dispatches an error obj to state
 * *@param {{id:integer}}} id
 */
export const initializeTopicDashboard = id => (dispatch, getState) => {
  const topicInState = getState().topicDashReducer.topic.id;
  const currentTopic = id;

  //topicInState will be undefined at the beginning and triggers the rest of this function
  if (Number(topicInState) !== Number(currentTopic)) {
    dispatch(topicDashReset());
  }
  api.topics
    .getOne(id)
    .then(data => {
      dispatch(resourceSuccess(data));
    })
    .catch(err => {
      console.log(err);
      dispatch(resourceError(err));
    });
};

/**
 * Adds resources belonging to a topic.
 * First: Sends post request to the server using api.resources
 * Second: Dispatches add_resource() action new data from server to current state
 * Third: gets resource Order from state
 * Fourth, sends the new resource order to the server by calling api.topics
 * If there is an error, it dispatches an error obj to state
 * This function does not make a request to the server for all of the resources again.
 * Only a single item is added to pre-existing state
 * If there is an error, the error object gets added to state
 * * @param {{parent: integer, title:string, uri:string, type:string}}
 */
export const submitResource = (parent, title, uri) => (dispatch, getState) => {
  const body = { parent, title, uri };
  api.resources
    .post(body)
    .then(data => {
      dispatch(addResource(data));
      const resourceOrder = getState().topicDashReducer.resourceOrder;
      console.log(resourceOrder);
      api.topics.put({
        id: body.parent,
        resourceOrder: JSON.stringify(resourceOrder)
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(resourceError(err));
    });
};

/**
 * Updates a single resource
 * First: Sends PUT request to the server using api.resources
 *  Second: disptaches action update_resources that saves updated resources object in state
 * If there is an error, it dispatches an error obj to state and console.log error
 *  This function does not make a request to the server for all of the resources again.
 * * @param {{id: integer}, {body:object}}
 */
//TODO: remove console.logs
//FIXME: might not need ID
export const updateSingleResource = body => dispatch => {
  api.resources
    .put(body)
    .then(data => {
      dispatch(updateResource(data));
    })
    .catch(error => dispatch(resourceError(error)));
};

/**
 * Deletes a single resource
 * First sends DELETE request to server
 * Second: On delete success, it creates new resource Order from state without the deleted ID
 * Third: Sends put request to topics to update resource Order
 * Fourth: on PUT success dispatches delResource action to delete resource from state.
 * Fifth: dispatches updateResourceOrder action to update resourceOrder array in state.
 * If there is an error, it dispatches an error obj to state and console.log error
 * * @param {{id: integer, topicId: integer }}
 */

export const deleteResource = (resourceId, topicId) => (dispatch, getState) => {
  console.log(typeof resourceId, typeof topicId);
  api.resources
    .delete(resourceId)
    .then(res => {
      const newOrder = getState().topicDashReducer.resourceOrder.filter(
        item => {
          // console.log(item, resourceId);
          return item !== Number(resourceId);
        }
      );
      // console.log(newOrder);
      return api.topics.put({
        id: topicId,
        resourceOrder: JSON.stringify(newOrder)
      });
    })
    .then(res => {
      console.log(res);
      dispatch(delResource(Number(resourceId)));
      dispatch(updateResourceOrder(res.resourceOrder));
    })
    .catch(error => dispatch(resourceError(error)));
};

/**
 *Sends a request to server to update the 
 resource order array and updates array in state
 *FIRST: sends a PUT request to api.Topics with new Resource Order in the body
 *SECOND: On success, this takes the server response and updates the resourceOrder array in state
 *If there is an error, an error object gets dispatched to state
 * @param {{rescOrder: array}} rescOrder
 * @param {{topicId: integer}} topicId
 */
export const updateRescOrder = (rescOrder, topicId) => (dispatch, getState) => {
  // console.log(rescOrder, topicId);
  api.topics
    .put({
      id: topicId,
      resourceOrder: JSON.stringify(rescOrder)
    })
    .then(res => {
      // console.log(res);
      dispatch(updateResourceOrder(res.resourceOrder));
    })
    .catch(error => dispatch(resourceError(error)));
};
