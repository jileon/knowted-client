import React from 'react';
import { shallow } from 'enzyme';
import Hero from '../../Landing/Hero';

describe('<Hero />', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<Hero />);
	});

	it('renders without crashing', () => {});
});
