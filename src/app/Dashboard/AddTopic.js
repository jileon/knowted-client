import React from 'react';
import { connect } from 'react-redux';
import { actions as notifActions } from 'redux-notifications';

import { addTopic } from '../../controller/actions/dashboard';
const { notifSend } = notifActions;

export class AddTopic extends React.Component {
  state = {
    isHidden: true
  };

  toggleHidden = () => {
    this.setState(
      {
        isHidden: !this.state.isHidden
      },
      () => {
        if (!this.state.isHidden) this.titleInput.focus();
      }
    );
  };

  onSubmit(e) {
    e.preventDefault();
    const { topics } = this.props;
    let title = this.titleInput.value;

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

    this.props.dispatch(addTopic(title));
    this.toggleHidden();
  }

  render() {
    return (
      <>
        {this.state.isHidden ? (
          <button className="add-topic-btn" onClick={this.toggleHidden}>
            <span>+</span> add a topic
          </button>
        ) : (
          <button className="add-topic-btn" onClick={this.toggleHidden}>
            <span> x </span> close
          </button>
        )}

        {!this.state.isHidden && (
          <div>
            <div className="topic-btn">
              <div className="paper">
                <span />
              </div>
            </div>
            <form className="add-topic-form" onSubmit={e => this.onSubmit(e)}>
              <input
                ref={input => (this.titleInput = input)}
                type="text"
                name="folderTitle"
                autoFocus="autofocus"
              />
            </form>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  topics: state.dashboardReducer.topics
});

export default connect(mapStateToProps)(AddTopic);
