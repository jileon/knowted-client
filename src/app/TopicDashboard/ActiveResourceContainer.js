import React from 'react';
import { connect } from 'react-redux';
import { updateRescOrder } from '../../controller/actions/topicDashboard';
import ResourceItem from './ResourceItem';
import AddResourceForm from './AddResourceForm';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export class ActiveResourceContainer extends React.Component {
  constructor(props) {
    super(props);
    this.Form = React.createRef();
  }

  //Temporary Copy to make sure it's working
  displayZeroCase = () => {
    return (
      <section className="topicDash-zero">
        <p>You have no resources. Add resources below!</p>
        <AddResourceForm resourceFormRef={this.Form} />
      </section>
    );
  };
  handleScrollClick = () => {
    const element = this.Form.current;
    element.scrollIntoView();
  };
  onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const newOrder = Array.from(this.props.rescOrder);
    newOrder.splice(source.index, 1);
    newOrder.splice(destination.index, 0, draggableId);
    this.props.dispatch(updateRescOrder(newOrder, this.props.parentId));
  };

  render() {
    const { resources, rescOrder } = this.props;
    if (!rescOrder || !resources) return this.displayZeroCase();

    return (
      <>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <section className="active-resources-container">
            <div className="active-header">
              <div className="active-title-cont">
                <h3 className="active-title">Active Resources</h3>
              </div>
              {this.props.rescOrder.length >= 4 ? (
                <div className="add-button-cont">
                  <button
                    className="add-resc-button"
                    type="button"
                    onClick={this.handleScrollClick}
                  >
                    <span>add resource </span> <span className="plus">+</span>
                  </button>
                </div>
              ) : null}
            </div>
            <Droppable droppableId="droppable-1">
              {provided => (
                <ul ref={provided.innerRef} className="active-resources-list">
                  {rescOrder.map((rescID, index) => {
                    if (
                      rescOrder &&
                      resources &&
                      rescOrder.length > 0 &&
                      resources[rescID]
                    ) {
                      return resources[rescID].completed === false ? (
                        <Draggable
                          key={rescID}
                          draggableId={rescID}
                          index={index}
                        >
                          {(provided, snapshot) => {
                            return (
                              <>
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="resource-item active-resource-item"
                                >
                                  {/* <i className="fas fa-ellipsis-v" /> */}

                                  <ResourceItem resource={resources[rescID]} />
                                </li>
                                {provided.placeholder}
                              </>
                            );
                          }}
                        </Draggable>
                      ) : null;
                    } else {
                      return null;
                    }
                  })}

                  {provided.placeholder}
                  <li>
                    <AddResourceForm resourceFormRef={this.Form} />
                  </li>
                </ul>
              )}
            </Droppable>
          </section>
        </DragDropContext>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    parentId: state.topicDashReducer.topic.id,
    rescOrder: state.topicDashReducer.resourceOrder
  };
};

export default connect(mapStateToProps)(ActiveResourceContainer);
