import React from 'react';
import { Provider } from 'react-redux';
import sagaMiddleware from 'redux-saga';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import Routes from '..';

const mockStore = configureMockStore([sagaMiddleware]);

describe('Routes', () => {
  test('should render with success', () => {
    const store = mockStore({
      base: { loading: true, user: {} },
      commits: { data: [] },
      repositories: { data: [] },
    });
    const wrapper = mount(
      <Provider store={store}>
        <Routes />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
