import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { AllTopicsContainer } from '../styles/dashboard.styles';

import AddTopic from './AddTopic';
import Folder from './Folder';
import Topic from './Topic';

import {
  mergeTopicsNewFolder,
  updateTopic,
  deleteEmptyFolder
} from '../../controller/actions/dashboard';

export class AllTopics extends React.Component {
  static propTypes = {
    topics: PropTypes.object,
    folders: PropTypes.object,
    folderOrder: PropTypes.array,
    currentFolderId: PropTypes.any
  };

  handleTopicCombine = (topicId1, topicId2) => {
    this.props.dispatch(
      mergeTopicsNewFolder(`Untitled Folder-${Date.now()}`, topicId1, topicId2)
    );
  };

  handleTopicFolderChange = result => {
    const { destination, draggableId } = result;
    // update folder
    const parent =
      destination.droppableId === 'lonelyTopics'
        ? null
        : Number(destination.droppableId);
    this.props.dispatch(updateTopic({ id: Number(draggableId), parent }));
  };

  onDragEnd = result => {
    const { destination, source, draggableId, combine } = result;

    //CASE: combining lone topics => creates a new folder and places items within that folder
    if (combine) {
      this.handleTopicCombine(combine.draggableId, draggableId);
    }

    // CASE: not reordered
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    // CASE: Move to other list (different droppable id)
    if (source.droppableId !== destination.droppableId) {
      this.handleTopicFolderChange(result);
    }
  };

  renderFolders = () => {
    const { folderOrder, folders, dispatch } = this.props;
    const result = [];
    for (const i in folderOrder) {
      const id = folderOrder[i];
      const folder = folders[id];
      // Delete folder if empty
      if (!folder.topics.length) {
        dispatch(deleteEmptyFolder(id));
        continue;
      }
      // Render folder otherwise
      result.push(
        <Folder
          title={folder.title}
          folderId={folder.id}
          key={folder.id}
          index={i}
          editing={
            folder.id === this.props.currentFolderId
              ? this.props.currentFolderId
              : null
          }
        />
      );
    }
    return result;
  };

  renderLonelyTopics = () => {
    const { lonelyTopics, topics } = this.props;
    return lonelyTopics.map((id, index) => (
      <Draggable key={id} draggableId={id} index={index}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Topic title={topics[id].title} topicId={id} index={index} />
          </div>
        )}
      </Draggable>
    ));
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <AllTopicsContainer>
          {this.props.folderOrder.length === 0 ? (
            <h2>Topics</h2>
          ) : (
            <>
              <h2>All Folders &amp; Topics</h2>
              <h3>Folders</h3>
              <div className="folders-container">{this.renderFolders()}</div>
              <h3>Topics</h3>
            </>
          )}

          <Droppable
            droppableId="lonelyTopics"
            direction="horizontal"
            isCombineEnabled
          >
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <div className="lonely-topics-container">
                  <AddTopic />
                  {this.renderLonelyTopics()}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        </AllTopicsContainer>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => ({
  topics: state.dashboardReducer.topics,
  lonelyTopics: state.dashboardReducer.lonelyTopics,
  folders: state.dashboardReducer.folders,
  folderOrder: state.dashboardReducer.folderOrder,
  currentFolderId: state.dashboardReducer.currentFolderId
});

export default connect(mapStateToProps)(AllTopics);
