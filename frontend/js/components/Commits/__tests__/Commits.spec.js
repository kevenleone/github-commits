import React from 'react';
import { Provider } from 'react-redux';
import sagaMiddleware from 'redux-saga';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { HashRouter } from 'react-router-dom';

import Commits from '../Commits';

import CommitsRoot from '..';

const mockStore = configureMockStore([sagaMiddleware]);

describe('Commits', () => {
  const today = new Date('2021-11-11T11:11').toDateString();

  const commits = {
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
  };

  test('should render with success', () => {
    const store = mockStore({
      base: { avatarDefault: 'lalala.jpg' },
      commits: {
        data: commits,
      },
    });

    const wrapper = mount(
      <Provider store={store}>
        <HashRouter>
          <CommitsRoot />
        </HashRouter>
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should render with success and rows', () => {
    const store = mockStore({
      base: { avatarDefault: 'lalala.jpg' },
    });

    const wrapper = mount(
      <Provider store={store}>
        <HashRouter>
          <Commits commits={commits} />
        </HashRouter>
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
