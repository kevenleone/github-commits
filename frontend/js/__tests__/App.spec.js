import React from 'react';
import { shallow } from 'enzyme';

import App from '../App';

describe('App', () => {
  test('should render with success', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});
