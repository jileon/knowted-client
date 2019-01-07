import React from 'react';
import { shallow } from 'enzyme';
import { ResourceItem } from '../../TopicDashboard/ResourceItem';

const FirstResource = {
  id: 12345,
  parent: {
    id: 54321,
    title: 'Knitting'
  },
  title: 'Needles',
  uri: 'http://something',
  completed: false,
  last_opened: new Date().toLocaleString()
};

const initialState = {
  editing: false
};
describe('ResourceItem', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <ResourceItem {...initialState} resource={FirstResource} />
    );
  });

  it('renders without crashing', () => {});
});
