import React from 'react';
import { hot } from 'react-hot-loader';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';

import { Home } from './pages/Home';
import store from './redux/store';
import SentryBoundary from './utils/SentryBoundary';
import 'react-toastify/dist/ReactToastify.css';
import Load from './components/Load/Load';

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
