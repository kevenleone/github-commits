import React from 'react';
import { mount } from 'enzyme';

import SentryBoundary from '../SentryBoundary';

const ProblemChild = () => {
  throw new Error('Error thrown from problem child');
};

describe('SentryBoundary', () => {
  test('should render with success', () => {
    jest.spyOn(console, 'error').mockImplementation();

    const wrapper = mount(
      <SentryBoundary>
        <ProblemChild />
      </SentryBoundary>
    );
    expect(wrapper.find('h3').text()).toStrictEqual(
      'Check if there is an error on your Sentry app'
    );
    wrapper.find('button').simulate('click');
    jest.restoreAllMocks();
  });

  test('should render children without error', () => {
    const wrapper = mount(
      <SentryBoundary>
        <b>Hi</b>
      </SentryBoundary>
    );

    expect(wrapper.find('b').text()).toStrictEqual('Hi');
  });
});
