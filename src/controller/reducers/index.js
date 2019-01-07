import { combineReducers } from 'redux';
import { reducer as notifReducer } from 'redux-notifications';
import auth from './auth';
import learn from './learn';
import dashboardReducer from './dashboard';
import topicDashReducer from './topicDashboard';

const rootReducer = combineReducers({
  auth,
  learn,
  dashboardReducer,
  topicDashReducer,
  notifs: notifReducer
});

export default rootReducer;
