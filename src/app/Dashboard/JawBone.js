import React from 'react';
import { JawBoneContainer } from '../styles/dashboard.styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import Topic from './Topic';
import Loading from '../common/Loading';

export class JawBone extends React.Component {
  static propTypes = {
    folderId: PropTypes.any.isRequired
  };

  render() {
    if (this.props.loading) return <Loading />;
    const { topics, folders, folderId } = this.props;
    return (
      <JawBoneContainer>
        <Droppable
          droppableId={String(this.props.folderId)}
          direction="row"
          isCombineEnabled={false}
        >
          {provided => (
            <>
              <span className="arrow-up" />
              <div
                className="jawbone-folder-items"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className="jawbone-items-wrapper">
                  {folders[folderId].topics.map((topicId, index) => (
                    <Draggable
                      draggableId={String(topicId)}
                      index={index}
                      key={topicId}
                    >
                      {provided => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Topic
                            title={topics[topicId].title}
                            topicId={topicId}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              </div>
            </>
          )}
        </Droppable>
      </JawBoneContainer>
    );
  }
}

const mapStateToProps = state => ({
  topics: state.dashboardReducer.topics,
  loading: state.dashboardReducer.loading,
  folders: state.dashboardReducer.folders
});

export default connect(mapStateToProps)(JawBone);
