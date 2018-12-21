import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { EditButton, CancelButton } from '../styles/common.styles';

import { connect } from 'react-redux';
import {
  updateSingleResource,
  deleteResource
} from '../../controller/actions/topicDashboard';

//TODO: use Link so so the resource title links to it's corresponding

export class ResourceItem extends React.Component {
  constructor(props) {
    super(props);
    this.value = React.createRef();
    this.state = {
      editing: false,
      value: this.props.resource.title,
      uri: this.props.resource.uri
    };
  }

  static propTypes = {
    resource: PropTypes.object.isRequired
  };

  /**
   *The intention of this function is to make a PUT request to resources endpoint
   *@param {{e: object}} eventobject
   */
  handleEdit = () => {
    this.setState(prevState => ({ editing: !prevState.editing }));
  };
  handleChecked = e => {
    const id = this.props.resource.id;
    this.props.dispatch(
      updateSingleResource(id, {
        id,
        completed: !this.props.resource.completed
      })
    );
  };
  /**
   *
   *The intention of this function is to make a DELETE request to resources endpoint
   * @param {{e: object}} eventobject
   */
  //FIXME: connect function to dispatch async action to backend
  handleDelete = e => {
    const id = this.props.resource.id;
    this.props.dispatch(deleteResource(Number(id), this.props.parentId));
  };

  /**
   * Used by the ResourceData component
   * @param {{e: object}} eventobject
   */

  /**
   *Toggles between form and view mode
   * Takes in the event object from child and handles form submission
   * If the newTitle is blank, set state back to view and keep the old title
   * * @param {{e: object, title:string, uri:String, oldTitle:string}}
   */
  handleUpdate = (e, newTitle, uri, oldTitle) => {
    e.preventDefault();
    if (oldTitle === newTitle) {
      this.setState({ editing: !this.state.editing });
    }
    if (!newTitle || newTitle.trim() === '') {
      this.setState({ editing: !this.state.editing });
      return;
    }
    const id = this.props.resource.id;
    this.props.dispatch(updateSingleResource(id, { id, title: newTitle }));
    this.setState({ editing: !this.state.editing });
  };

  render() {
    const { resource, parentId } = this.props;

    return (
      <div className="resource-view">
        {this.state.editing ? (
          <CancelButton
            resourceid={resource.id}
            onClick={() => this.handleEdit()}
            className="resource-item-edit resource-item-controls"
          >
            edit
          </CancelButton>
        ) : (
          <EditButton
            resourceid={resource.id}
            onClick={() => this.handleEdit()}
            className="resource-item-edit resource-item-controls"
          >
            edit
          </EditButton>
        )}

        <div className="elipsis">
          {' '}
          <span className="elipsis-dot" />
          <span className="elipsis-dot" />
          <span className="elipsis-dot" />
        </div>
        <button
          className={resource.completed ? 'checked-box' : 'checkbox'}
          id={resource.id}
          type="button"
          onClick={() => this.handleChecked()}
          checked={resource.completed}
        >
          &#10003;
        </button>
        <div className="resource-info">
          {this.state.editing ? (
            <form
              id={resource.id}
              onSubmit={e =>
                this.handleUpdate(
                  e,
                  this.state.value,
                  this.state.uri,
                  resource.title
                )
              }
            >
              <label htmlFor="title update" />
              <input
                autoFocus
                className="aside edit-input"
                type="text"
                name={resource.title}
                defaultValue={this.state.value}
                onChange={e => this.setState({ value: e.target.value })}
              />
            </form>
          ) : (
            <div className="name-of-resource">
              <Link to={`/dashboard/${parentId}/${resource.id}`}>
                {resource.title}
              </Link>
            </div>
          )}
          <div className="resc-uri">
            <Link to={`/dashboard/${parentId}/${resource.id}`}>
              {resource.type === 'youtube'
                ? `https://www.youtube.com/watch?v=${resource.uri}`
                : resource.uri}
            </Link>
          </div>
          <div className="save-btn">
            <button
              id={resource.id}
              onClick={e =>
                this.handleUpdate(
                  e,
                  this.state.value,
                  this.state.uri,
                  resource.title
                )
              }
              type="submit"
              className={this.state.editing ? 'save-btn-show' : 'save-btn-hide'}
            >
              save
            </button>
          </div>
        </div>
        <button
          type="button"
          resourceid={resource.id}
          onClick={() => this.handleDelete()}
          className="resource-item-delete resource-item-controls"
        >
          Delete
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    parentId: state.topicDashReducer.topic.id
  };
};
export default connect(mapStateToProps)(ResourceItem);
