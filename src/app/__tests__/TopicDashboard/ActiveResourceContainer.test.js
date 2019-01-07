import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { ActiveResourceContainer } from '../../TopicDashboard/ActiveResourceContainer';

const initialState = {
  resourceOrder: [1, 2],
  resources: {
    1: {
      completed: false,
      id: 1,
      lastOpened: '2018-12-16T04:05:27.094Z',
      title: 'Resource #3',
      type: 'youtube',
      uri: 'B7hVxCmfPtM'
    },
    2: {
      completed: false,
      id: 2,
      lastOpened: '2018-12-17T07:09:32.817Z',
      title: 'Now Playin: Using Spotify’s Awesome API with React',
      type: 'other',
      uri:
        'https://medium.com/@jonnykalambay/now-playing-using-spotifys-awesome-api-with-react-7db8173a7b13'
    }
  },
  dispatch: jest.fn()
};
describe('ActiveResouceContainer', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ActiveResourceContainer {...initialState} />);
  });
  it('renders without crashing', () => {});
});
