import React from 'react';
import { hot } from 'react-hot-loader';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';

import SentryBoundary from './utils/SentryBoundary';
import Load from './components/Load/Load';
import store from './redux/store';
import Header from './components/Header/Header';
import './bootstrap-includes';
import 'react-toastify/dist/ReactToastify.css';
import Routes from './routes';

const App = () => (
  <SentryBoundary>
    <Provider store={store}>
      <Header />
      <ToastContainer />
      <Load />
      <Routes />
    </Provider>
  </SentryBoundary>
);

export default hot(module)(App);
