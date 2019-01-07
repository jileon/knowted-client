import React from 'react';
import { shallow } from 'enzyme';
import { AllTopics } from '../../Dashboard/AllTopics';

//Component Contract - expect:
//To render
//If I have any Folders for them to render
//If I have any parentless Topics for them to render

const initialState = {
  dispatch: jest.fn(),
  loading: false,
  folderOrder: []
};

describe('<AllTopics />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<AllTopics {...initialState} />);
  });

  it('renders without crashing', () => {});

  //FIXME: should expect to render only if you have topics and folders
  it('to render any folders', () => {
    wrapper = shallow(<AllTopics {...initialState} />);
    expect(wrapper.find('.folder-btn'));
  });

  it('to render any topics', () => {
    wrapper = shallow(<AllTopics {...initialState} />);
    expect(wrapper.find('.topic-btn'));
  });
});
