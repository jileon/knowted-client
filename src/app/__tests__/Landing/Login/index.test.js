import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../../../Landing/Login';

/* Expect
  Submit button to be disabled while submitting
  Redirect to happen when user is logged in
  TODO: Form only dispatches valid form data
*/
describe('<Login />', () => {
  it('renders without crashing', () => {
    shallow(<Login loggedIn={false} submitting={false} />);
  });

  it('disables submit button when auth is submitting', () => {
    let wrapper = shallow(<Login loggedIn={false} submitting={true} />);
    expect(wrapper.find('.login-button').prop('disabled')).toEqual(true);
  });

  it('Has an enabled submit button when auth is not submitting', () => {
    let wrapper = shallow(<Login loggedIn={false} submitting={false} />);
    expect(
      wrapper
        .find('.login-button')
        .first()
        .prop('disabled')
    ).toEqual(false);
  });
});
