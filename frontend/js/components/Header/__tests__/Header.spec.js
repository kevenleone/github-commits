import React from 'react';
import { Provider } from 'react-redux';
import sagaMiddleware from 'redux-saga';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import Header from '../Header';

import { Header as Index } from '..';

const mockStore = configureMockStore([sagaMiddleware]);

describe('Header', () => {
  const store = mockStore({
    base: { user: { name: 'Keven' } },
  });
  global.confirm = () => true;

  test('shoud render Header Index', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Index />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should render with success', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should render and check user name', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    expect(wrapper.find('span.name').text()).toStrictEqual('Welcome, Keven');
  });

  test.skip('should render and click on logout', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    wrapper.find('button.logout').simulate('click');
    // jest.spyOn(window, 'confirm').mockImplementation(() => true);
  });
});
