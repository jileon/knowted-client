import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//STYLESHEET
import { DashboardContainer, DashMain } from '../styles/dashboard.styles';

import Loading from '../common/Loading';
import AllTopics from './AllTopics';
import RecentlyViewed from './RecentlyViewed';

import { initializeDashboard } from '../../controller/actions/dashboard';
export class Dashboard extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired
  };

  componentDidMount() {
    this.props.dispatch(initializeDashboard(3));
  }

  render() {
    if (this.props.loading) return <Loading />;

    return (
      <DashMain>
        <DashboardContainer>
          <RecentlyViewed />
          <AllTopics />
        </DashboardContainer>
      </DashMain>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.dashboardReducer.loading
});

export default connect(mapStateToProps)(Dashboard);
