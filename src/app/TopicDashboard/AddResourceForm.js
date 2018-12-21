import api from '../../controller/api';

import React from 'react';
import { connect } from 'react-redux';
import { submitResource } from '../../controller/actions/topicDashboard';
import { EditButton } from '../styles/common.styles';

export class AddResourceForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submitting: false,
      feedback: null,
      newURI: null,
      newTitle: null,
      inputHidden: true
    };
  }

  /**Checks string to make sure it is a URL
   * Returns true if valid, false if not
   **@param {{str: string}}
   */
  isURL = str => {
    try {
      new URL(str);
      return true;
    } catch (_) {
      return false;
    }
  };
  /**
   * Gets title metadata from server by submitting URI
   *This function takes in an event object and uri
   *FIRST: prevent form from submitting and refreshing. Then Checks to see if input is a valid URL
   *SECOND: Set state submitting to true to disable user for editing the input 
   while it calls the server
   * THIRD: Call the server to get title metadata from uri link provided
   * FOURTH: on success save newTitle and URI to state. Change inputHidden
   to true so user can edit title
   * change submitting back to false so user can edit URI
   * If there is an error, console.log error
   *@param {{e: object, uri:string}}
   */
  getUriTitle = (e, uri) => {
    e.preventDefault();
    if (!this.isURL(e.target.value)) {
      return;
    }
    this.setState({ submitting: true });
    api.metadata
      .get(uri)
      .then(data => {
        this.inputUri.value = data.uri;
        this.inputTitle.value = data.title;
        this.setState({
          inputHidden: false,
          submitting: false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          inputHidden: false,
          submitting: false
        });
      });
  };

  /**
   * Sends users new resource to be saved in DB
   * This function takes in the eventObject
   * FIRST:prevents form from default submit
   * SECOND: Saves, title, URI, and parent as variables. If there is no title
   save feedback to state to display
   * THIRD: determine what type of resource this is?
   * FOURTH: dispatches addResource to send new resource to DB
   * FIFTH: reset state. reset form values to blank
   * @param {{e:object}} eventObject
   */
  handleSubmit = e => {
    e.preventDefault();
    const title = this.inputTitle.value;
    const uri = this.inputUri.value;
    const parent = Number(this.props.parentId);
    if (!title) {
      return;
    }

    this.props.dispatch(submitResource(parent, title, uri));

    this.inputUri.value = '';
    this.inputTitle.value = '';
    this.setState({
      feedback: null,
      inputHidden: true,
      submitting: false
    });
  };

  /**
   * Handles input submission of new URL resources
   * If a user hits enter, proceed to fetch the URI and call this.getUriTitle()
   * * @param {{e:object}} eventObject
   */
  handleEnter = e => {
    e.preventDefault();
    if (e.keyCode === 13) {
      return this.getUriTitle(e, e.target.value);
    } else {
      return;
    }
  };

  render() {
    return (
      <section
        ref={this.props.resourceFormRef}
        className="add-resource-section "
      >
        <EditButton className="resource-item-edit resource-item-controls">
          edit
        </EditButton>
        <div className="elipsis">
          {' '}
          <span className="elipsis-dot" />
          <span className="elipsis-dot" />
          <span className="elipsis-dot" />
        </div>

        <button className="checkbox" type="button" />
        <form
          id="add-resource"
          className="add-resource-form resource-info"
          onSubmit={this.handleSubmit}
        >
          <div className="add-inputs">
            <label
              className="label-hidden"
              hidden={this.state.inputHidden}
              htmlFor="add-resource-title"
            >
              Title
            </label>
            <input
              className="title-input"
              autoFocus
              hidden={this.state.inputHidden}
              ref={input => (this.inputTitle = input)}
              type="text"
              name="add-resource"
              defaultValue={this.state.newTitle}
            />
            <label className="label-hidden" htmlFor="add-resource-link">
              URL
            </label>
            <input
              className="uri-input"
              ref={input => (this.inputUri = input)}
              type="url"
              name="add-resource"
              disabled={this.state.submitting}
              placeholder="http://"
              onKeyUp={this.handleEnter}
              defaultValue={this.state.newURI}
            />
            <div className="add-button">
              <button
                hidden={this.state.inputHidden}
                className={
                  this.state.inputHidden ? 'save-btn-hide' : 'save-btn-show'
                }
              >
                save
              </button>
            </div>
          </div>
        </form>
        {this.state.feedback ? <div>{this.state.feedback}</div> : null}
        <button
          type="button"
          className="resource-item-delete resource-item-controls"
        >
          Delete
        </button>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    parentId: state.topicDashReducer.topic.id,
    submitting: state.topicDashReducer.submitting
  };
};
export default connect(mapStateToProps)(AddResourceForm);
