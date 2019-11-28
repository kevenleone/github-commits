import React from 'react';
import { Provider } from 'react-redux';
import sagaMiddleware from 'redux-saga';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import Load from '../Load';

const mockStore = configureMockStore([sagaMiddleware]);

describe('Load', () => {
  test('should render with success', () => {
    const store = mockStore({
      base: { loading: true },
    });
    const wrapper = mount(
      <Provider store={store}>
        <Load />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
