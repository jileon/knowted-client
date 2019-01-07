import React from 'react';
import { shallow } from 'enzyme';
import Hero from '../../Landing/Hero';

const authProps = {
	loggedIn: false,
	submitting: false
};

describe('<Hero />', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<Hero {...authProps} />);
	});

	it('renders without crashing', () => {});
});
