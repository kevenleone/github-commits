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

  test('shoud render Index with success', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Index />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should render Header with success', () => {
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

  test('should render and click on logout and confirm', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    jest.spyOn(console, 'error').mockImplementation();
    const windowConf = jest.spyOn(window, 'confirm').mockImplementation(() => true);
    wrapper.find('button.logout').simulate('click');
    expect(windowConf.mock.calls).toHaveLength(1);
    jest.restoreAllMocks();
  });

  test('should render and click on logout and reject', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    jest.spyOn(console, 'error').mockImplementation();
    const windowConf = jest.spyOn(window, 'confirm').mockImplementation(() => false);
    wrapper.find('button.logout').simulate('click');
    expect(windowConf.mock.calls).toHaveLength(1);
    jest.restoreAllMocks();
  });

  test('should click on toggle', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    wrapper.find('button.navbar-toggler').simulate('click');
  });
});
