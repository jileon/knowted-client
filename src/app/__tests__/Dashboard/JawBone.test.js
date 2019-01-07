import React from 'react';
import { shallow } from 'enzyme';
import { JawBone } from '../../Dashboard/JawBone';

//Component Contract - expect:
//To render
//To render topics

const initialState = {
  topics: [],
  dispatch: jest.fn(),
  folderId: 1
};

describe('<JawBone />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<JawBone {...initialState} />);
  });

  it('renders without crashing', () => {});

  it('to render topics', () => {
    wrapper = shallow(<JawBone {...initialState} />);
    expect(wrapper.find('.topic-btn'));
  });
});
