import React from 'react';
import { shallow } from 'enzyme';
import { Folder } from '../../Dashboard/Folder';

//Component Contract - expect:
//To render
//the jawbone to display on false

const initialState = {
  isHidden: false,
  title: 'hello',
  folderId: 101
};

describe('<Folder />', () => {
  let wrapper;

  it('renders without crashing', () => {
    shallow(<Folder {...initialState} />);
  });

  it('the folder has a title', () => {
    wrapper = shallow(<Folder {...initialState} />);
    expect(wrapper.find('label').text()).toEqual('hello');
  });

  it('to display JawBone on state isHidden false', () => {
    wrapper = shallow(<Folder {...initialState} />);
    expect(wrapper.find('.jaw-bone-container'));
  });
});
