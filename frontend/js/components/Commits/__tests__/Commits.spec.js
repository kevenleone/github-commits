import React from 'react';
import { Provider } from 'react-redux';
import sagaMiddleware from 'redux-saga';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import { Commits } from '..';

const mockStore = configureMockStore([sagaMiddleware]);

describe('Commits', () => {
  test('should render with success', () => {
    const store = mockStore({
      base: { avatarDefault: 'lalala.jpg' },
      commits: { data: [] },
    });

    const wrapper = mount(
      <Provider store={store}>
        <Commits />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should render with success and rows', () => {
    const today = new Date().toDateString();
    const store = mockStore({
      base: { avatarDefault: 'lalala.jpg' },
      commits: {
        data: {
          [today]: [
            {
              message: 'This is a test',
              author: 'Keven Leone',
              repository: 'GitHub Commits',
            },
            {
              message: 'This is a big text '.repeat(5),
              author: 'Keven Leone',
              repository: 'GitHub Commits',
            },
          ],
        },
      },
    });

    const wrapper = mount(
      <Provider store={store}>
        <Commits />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
