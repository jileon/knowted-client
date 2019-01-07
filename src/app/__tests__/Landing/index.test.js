import React from 'react';
import { shallow } from 'enzyme';
import { Landing } from '../../Landing';

const authProps = {
	loggedIn: false,
	submitting: false
};

describe('<Landing />', () => {
	it('renders without crashing', () => {
		shallow(<Landing {...authProps} />);
	});
});
