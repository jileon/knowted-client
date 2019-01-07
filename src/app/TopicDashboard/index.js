import React from 'react';
import { actions as notifActions } from 'redux-notifications';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { initializeTopicDashboard } from '../../controller/actions/topicDashboard';
import ActiveResourceContainer from './ActiveResourceContainer';
import CompletedResourceContainer from './CompletedResourceContainer';
import Loading from '../common/Loading';
import Breadcrumbs from '../common/Breadcrumbs';
//STYLESHEET
import {
  TopicDashContainer,
  ActiveResources,
  CompleteResources
} from '../styles/topicDashboard.styles';
import 'redux-notifications/lib/styles.css';

const { notifSend } = notifActions;

export class TopicDashboard extends React.Component {
  componentDidMount() {
    const currentTopicID = this.props.match.params.topicId;
    this.props.dispatch(initializeTopicDashboard(currentTopicID));
  }

  componentDidUpdate(prevProps) {
    const currentTopicID = this.props.match.params.topicId;
    const prevID = prevProps.match.params.topicId;

    if (prevID !== currentTopicID) {
      this.props.dispatch(initializeTopicDashboard(currentTopicID));
    }

    if (this.props.error) {
      return this.sendError();
    }
  }

  sendError = () => {
    this.props.dispatch(
      notifSend({
        message: this.props.error.message,
        kind: 'danger',
        dismissAfter: 4000
      })
    );
  };

  render() {
    const { loading, topic, stateIsStale, topicNotFound } = this.props;
    if (topicNotFound) {
      return <Redirect to="/dashboard" />;
    }
    if (loading || stateIsStale) {
      return <Loading />;
    }

    return (
      <>
        <Breadcrumbs
          topicId={topic && topic.id}
          topicTitle={topic && topic.title}
        />
        <TopicDashContainer>
          <h2>{topic.title}</h2>
          <ActiveResources>
            <ActiveResourceContainer {...this.props} />
          </ActiveResources>
          <CompleteResources>
            <CompletedResourceContainer {...this.props} />
          </CompleteResources>
        </TopicDashContainer>
      </>
    );
  }
}

const mapStateToProps = (state, props) => {
  const currentTopicID = props.match.params.topicId;
  const stateTopicID = state.topicDashReducer.topic.id;
  const NotFound =
    state.topicDashReducer.error && state.topicDashReducer.error.code === 404
      ? true
      : false;

  return {
    stateIsStale: Number(stateTopicID) !== Number(currentTopicID),
    loading: state.topicDashReducer.loading,
    resources: state.topicDashReducer.resources,
    resourceOrder: state.topicDashReducer.resourceOrder,
    topic: state.topicDashReducer.topic,
    topicNotFound: NotFound,
    error: state.topicDashReducer.error,
    showCompleted: state.topicDashReducer.completedShowAll
  };
};

export default connect(mapStateToProps)(TopicDashboard);
