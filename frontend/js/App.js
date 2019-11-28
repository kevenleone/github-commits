import React from 'react';
import { hot } from 'react-hot-loader';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';

import SentryBoundary from './utils/SentryBoundary';
import Load from './components/Load/Load';
import { Home } from './pages/Home';
import store from './redux/store';
import './bootstrap-includes';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <SentryBoundary>
    <Provider store={store}>
      <ToastContainer />
      <Load />
      <Home />
    </Provider>
  </SentryBoundary>
);

export default hot(module)(App);
