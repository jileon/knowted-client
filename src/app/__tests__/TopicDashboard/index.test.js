import React from 'react';
import { shallow } from 'enzyme';
import { TopicDashboard } from '../../TopicDashboard';

const initialState = {
  resources: [],
  topic: { id: 1234, title: 'fake title' },
  loading: false,
  error: null,
  topicId: null,
  feedback: null,
  newURI: null,
  dispatch: jest.fn(),
  match: { params: { topicId: 1235 } }
};

describe('<TopicDashboard />', () => {
  const mockFn = jest.fn();
  it('renders without crashing', () => {
    shallow(<TopicDashboard {...initialState} />);
  });
});
