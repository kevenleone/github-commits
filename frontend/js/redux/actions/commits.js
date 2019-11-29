import { put, call } from 'redux-saga/effects';

import api from '../../services';

export function shouldShowLoading(action = {}) {
  return action && action.payload && action.payload.showLoad ? action.payload.showLoad : false;
}

export function* getAllCommits(action) {
  const showLoading = shouldShowLoading(action);
  if (showLoading) yield put({ type: 'SET_LOADING' });
  try {
    const response = yield call(api.get, '/commits');
    yield put({ type: 'GET_ALL_COMMITS', payload: response.data });
  } catch (e) {
    yield put({ type: 'ERROR', payload: e });
  } finally {
    if (showLoading) yield put({ type: 'SET_LOADING' });
  }
}
