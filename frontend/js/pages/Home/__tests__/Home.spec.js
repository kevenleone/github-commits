import React from 'react';
import { Provider } from 'react-redux';
import sagaMiddleware from 'redux-saga';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import { Home } from '..';

const mockStore = configureMockStore([sagaMiddleware]);

describe('Home', () => {
  test('should render with success', () => {
    const store = mockStore({
      commits: { data: [] },
      repositories: { data: [] },
      base: { avatarDefault: 'test.jpg', user: { name: 'Keven', login: 'kevenleone' } },
    });
    const wrapper = mount(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
