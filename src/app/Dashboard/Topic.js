import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actions as notifActions } from 'redux-notifications';
import {
  EditButton,
  CancelButton,
  DeleteButton
} from '../styles/common.styles';

import { deleteTopic, updateTopic } from '../../controller/actions/dashboard';
const { notifSend } = notifActions;

export class Topic extends React.Component {
  static propTypes = {
    topicId: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired
  };

  state = {
    showOptions: false,
    editing: false
  };

  editTopic = () => {
    this.setState(
      state => {
        return {
          editing: !state.editing
        };
      },
      () => {
        if (this.state.editing) this.titleInput.focus();
      }
    );
  };

  submitEdit = e => {
    e.preventDefault();
    let title = this.titleInput.value;
    const { topics } = this.props;
    for (const topicId in topics) {
      if (topics[topicId].title === title) {
        this.props.dispatch(
          notifSend({
            message: 'A topic with that title already exists.',
            kind: 'danger',
            dismissAfter: 4000
          })
        );
        return;
      }
    }
    this.props.dispatch(updateTopic({ title, id: this.props.topicId }));
    this.editTopic();
  };

  deleteTopic = () => {
    this.props.dispatch(deleteTopic(this.props.topicId));
  };

  displayOptions = () => {
    this.setState(state => {
      return { showOptions: true };
    });
  };

  hideOptions = () => {
    this.setState(state => {
      return { showOptions: false };
    });
  };

  render() {
    const { title, topicId } = this.props;

    return (
      <div
        className="topic-wrap"
        onMouseEnter={this.displayOptions}
        onMouseLeave={this.hideOptions}
      >
        {this.state.editing ? (
          <>
            {this.state.showOptions && (
              <DeleteButton className="delete-btn" onClick={this.deleteTopic}>
                Delete
              </DeleteButton>
            )}
            <Link className="topic-btn" href={`/dashboard/${topicId}`}>
              <div className="paper">
                <span />
              </div>
            </Link>
            <form className="edit-topic-form" onSubmit={this.submitEdit}>
              <input
                ref={input => (this.titleInput = input)}
                type="text"
                name="topicTitle"
                defaultValue={this.props.title}
                autoFocus="autofocus"
              />
            </form>
            <CancelButton onClick={this.editTopic}>Cancel</CancelButton>
          </>
        ) : (
          <>
            {this.state.showOptions && (
              <DeleteButton className="delete-btn" onClick={this.deleteTopic}>
                Delete
              </DeleteButton>
            )}
            <Link className="topic-btn" to={`/dashboard/${topicId}`}>
              <div className="paper">
                <span />
              </div>
            </Link>
            <label onClick={this.editTopic}>{title}</label>
            {this.state.showOptions && (
              <EditButton onClick={this.editTopic}>Edit</EditButton>
            )}
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  topics: state.dashboardReducer.topics
});

export default connect(mapStateToProps)(Topic);
