import React from 'react';
import { shallow } from 'enzyme';
import { Topic } from '../../Dashboard/Topic';

const initialState = {
	isHidden: false,
	title: 'hello',
	topicId: 1,
	dispatch: jest.fn()
};

describe('<Topic />', () => {
	let wrapper;

	it('renders without crashing', () => {
		shallow(<Topic {...initialState} />);
	});

	// it('the Topic has a title', () => {
	//   wrapper = shallow(<Topic {...initialState} />);
	//   expect(wrapper.find('button').text()).toEqual('hello');
	// });
});
