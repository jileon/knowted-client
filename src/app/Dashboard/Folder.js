import React from 'react';
import JawBone from './JawBone';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { EditButton, CancelButton } from '../styles/common.styles';

import {
  updateFolder,
  displayEditFolderForm,
  hideEditFolderForm
} from '../../controller/actions/dashboard';

export class Folder extends React.Component {
  static propTypes = {
    folderId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  };

  state = {
    showJawBone: false,
    showEdit: false
  };

  //CASE: toggle jawbone based on clicking on folder
  toggleJawBone = () => {
    this.setState(state => {
      return { showJawBone: !state.showJawBone };
    });
  };

  //CASE: display and hide edit option for folders on mouse ender and leave
  displayEdit = () => {
    this.setState(() => {
      return { showEdit: true };
    });
  };

  hideEdit = () => {
    this.setState(() => {
      return { showEdit: false };
    });
  };

  //CASE: display and hide folder form based on clicking edit or cancel btn
  displayEditFolderForm = () => {
    this.props.dispatch(displayEditFolderForm(this.props.folderId));
  };

  hideEditFolderForm = () => {
    this.props.dispatch(hideEditFolderForm(this.props.folderId));
  };

  submitEdit = e => {
    e.preventDefault();
    let title = this.titleInput.value;
    this.props.dispatch(updateFolder({ id: this.props.folderId, title }));
    this.hideEditFolderForm();
  };

  componentDidUpdate(prevProps) {
    if (prevProps.editing !== this.props.editing) {
      if (this.props.editing) this.titleInput.focus();
    }
  }

  render() {
    const { title, folderId } = this.props;
    return (
      <div
        className="folder-wrap"
        onMouseEnter={this.displayEdit}
        onMouseLeave={this.hideEdit}
      >
        {this.props.editing ? (
          <>
            <div className="folder">
              <span />
            </div>

            <form className="edit-folder-form" onSubmit={this.submitEdit}>
              <input
                ref={input => (this.titleInput = input)}
                type="text"
                name="folderTitle"
                defaultValue={this.props.title}
                autoFocus="autofocus"
              />
            </form>
            <CancelButton onClick={this.hideEditFolderForm}>
              Cancel
            </CancelButton>
          </>
        ) : (
          <>
            {this.state.showJawBone ? (
              <div className="folder folder-open" onClick={this.toggleJawBone}>
                <span />
              </div>
            ) : (
              <div className="folder" onClick={this.toggleJawBone}>
                <span />
              </div>
            )}
            <label onClick={this.displayEditFolderForm}>{title}</label>
            {this.state.showEdit && (
              <EditButton onClick={this.displayEditFolderForm}>Edit</EditButton>
            )}
            {this.state.showJawBone && <JawBone folderId={folderId} />}
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  folders: state.dashboardReducer.folders
});

export default connect(mapStateToProps)(Folder);
