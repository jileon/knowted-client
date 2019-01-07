import React from 'react';
import { shallow } from 'enzyme';
import { Register } from '../../../Landing/Register';

/* Expect
  Submit button to be disabled while submitting
  Redirect to happen when user is logged in
  TODO: Form only dispatches valid form data
*/
describe('<Register />', () => {
  it('renders without crashing', () => {
    shallow(<Register loggedIn={false} submitting={false} />);
  });

  it('disables submit button when auth is submitting', () => {
    let wrapper = shallow(<Register loggedIn={false} submitting={true} />);
    expect(
      wrapper
        .find('.register-button')
        .first()
        .prop('disabled')
    ).toEqual(true);
  });

  it('Has an enabled submit button when auth is not submitting', () => {
    let wrapper = shallow(<Register loggedIn={false} submitting={false} />);
    expect(
      wrapper
        .find('.register-button')
        .first()
        .prop('disabled')
    ).toEqual(false);
  });
});
