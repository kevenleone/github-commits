import { put, call } from 'redux-saga/effects';

import api from '../../services';

export function* getAllCommits(action) {
  if (action.payload && action.payload.showLoad) yield put({ type: 'SET_LOADING' });
  try {
    const response = yield call(api.get, '/commits');
    yield put({ type: 'GET_ALL_COMMITS', payload: response.data });
  } catch (e) {
    yield put({ type: 'ERROR', payload: e });
  } finally {
    if (action.payload && action.payload.showLoad) yield put({ type: 'SET_LOADING' });
  }
}
