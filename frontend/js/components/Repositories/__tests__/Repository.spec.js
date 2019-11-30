import React from 'react';
import { Provider } from 'react-redux';
import sagaMiddleware from 'redux-saga';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import { Repositories } from '..';

const mockStore = configureMockStore([sagaMiddleware]);

describe('Repositories', () => {
  test('should render with success', () => {
    const store = mockStore({
      base: { user: {} },
      repositories: { data: [] },
    });

    const wrapper = mount(
      <Provider store={store}>
        <Repositories />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should render with success and rows', () => {
    const store = mockStore({
      base: { user: { login: 'abcd' } },
      repositories: {
        data: [
          {
            description: 'A GraphQL Boilerplate with Typescript and TypeORM',
            name: 'kevenleone/graphscript',
            fork: 9,
            star: 9,
          },
        ],
      },
    });

    const wrapper = mount(
      <Provider store={store}>
        <Repositories />
      </Provider>
    );

    wrapper.find('input').simulate('change', { target: { value: 'My new value' } });
    wrapper.find('button').simulate('click');

    expect(wrapper).toMatchSnapshot();
  });
});
