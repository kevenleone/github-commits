import React from 'react';
import { hot } from 'react-hot-loader';
import { ToastContainer } from 'react-toastify';

import { Home } from './pages/Home';

import 'react-toastify/dist/ReactToastify.css';
import SentryBoundary from './utils/SentryBoundary';

const App = () => (
  <SentryBoundary>
    <ToastContainer />
    <Home />
  </SentryBoundary>
);

export default hot(module)(App);
