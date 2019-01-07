import React from 'react';
import { connect } from 'react-redux';
import Editor from './Editor';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import Loading from '../common/Loading';
import Breadcrumbs from '../common/Breadcrumbs';
import Card from './Card';
import { Container, Main, YouTube } from '../styles/learn.styles';
import {
  initializeLearn,
  resetLearn,
  submitCompleteResource
} from '../../controller/actions/learn';

export class Learn extends React.Component {
  static propTypes = {
    match: PropTypes.object
  };

  componentDidMount() {
    const { topicId, resourceId } = this.props.match.params; // from router
    this.props.dispatch(initializeLearn(topicId, resourceId));
  }

  componentDidUpdate(prevProps) {
    const { topicId, resourceId } = this.props.match.params;
    const { resourceId: prevResourceId } = prevProps.match.params;

    if (prevResourceId !== resourceId) {
      this.props.dispatch(initializeLearn(topicId, resourceId));
    }
  }

  completeAndContinue = () => {
    const { resourceOrder, resources } = this.props.topic;
    const { resourceId, topicId } = this.props.match.params;

    const positionOfCompletedResource = resourceOrder.findIndex(
      id => Number(resourceId) === id
    );
    let idOfNextResource;

    for (let i = 1; i < resourceOrder.length; i++) {
      const tempResourceId =
        resourceOrder[(positionOfCompletedResource + i) % resourceOrder.length];
      const indexinResourcesArray = resources.findIndex(
        resource => resource.id === tempResourceId
      );
      if (!resources[indexinResourcesArray].completed) {
        idOfNextResource = resources[indexinResourcesArray].id;
        break;
      }
    }

    this.props.dispatch(submitCompleteResource(resourceId)).then(() => {
      if (idOfNextResource === undefined) {
        this.props.history.push(`/dashboard/${topicId}`);
      } else {
        this.props.history.push(`/dashboard/${topicId}/${idOfNextResource}`);
      }
    });
  };

  render() {
    const {
      stateIsStale,
      loading,
      resourceNotFound,
      notebook,
      topic,
      resource
    } = this.props;

    if (resourceNotFound) {
      this.props.dispatch(resetLearn());
      return <Redirect to="/dashboard" />;
    }

    if (stateIsStale || loading) return <Loading />;

    return (
      <Container>
        <Breadcrumbs
          topicTitle={topic.title}
          topicId={topic.id}
          resourceId={resource.id}
          resourceTitle={resource.title}
          buttonHandler={this.completeAndContinue}
        />
        <Main className={resource.type === 'other' ? 'single' : 'double'}>
          {resource.type === 'other' && <Card />}
          {resource.type === 'youtube' && (
            <YouTube
              id="ytplayer"
              type="text/html"
              src={`https://www.youtube.com/embed/${resource.uri}`}
              frameBorder="0"
              disablekb="1"
              title="YouTube"
              sandbox="allow-scripts allow-popups allow-forms allow-same-origin"
            />
          )}
          <Editor initialText={notebook} />
        </Main>
      </Container>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { topicId, resourceId } = props.match.params;
  const currentTopic = state.learn.topic;
  const currentResource = state.learn.resource;

  const topicIsStale = currentTopic && currentTopic.id !== Number(topicId);
  const resourceIsStale =
    currentResource && currentResource.id !== Number(resourceId);
  return {
    stateIsStale: topicIsStale || resourceIsStale,
    loading: state.learn.loading,
    resourceNotFound: state.learn.error && state.learn.error.code === 404,
    notebook: state.learn.topic && (state.learn.topic.notebook || ''),
    resource: currentResource,
    topic: currentTopic,
    resources: state.learn.resources
  };
};

export default connect(mapStateToProps)(Learn);
