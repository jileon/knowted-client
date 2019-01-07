import React from 'react';
import { shallow } from 'enzyme';
import { Dashboard } from '../../Dashboard';

const initialState = {
  topics: [
    {
      title: 'hello',
      topicId: 1
    }
  ],
  folders: [{ title: 'hello', folderId: 101 }],
  recentResources: [
    {
      completed: false,
      id: 2,
      lastOpened: '2018-12-11T16:02:09.784Z',
      parent: { id: 1 },
      title: 'Resource #2',
      uri: 'uri #2'
    },
    {
      completed: false,
      id: 3,
      lastOpened: '2018-12-11T16:02:09.784Z',
      parent: { id: 2 },
      title: 'Resource #3',
      uri: 'uri #3'
    }
  ],
  loading: false,
  dispatch: jest.fn()
};

describe('<Dashboard />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Dashboard {...initialState} />);
  });

  it('renders without crashing', () => {});
});
