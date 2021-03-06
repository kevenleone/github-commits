import { put, call, select } from 'redux-saga/effects';

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

export function* fetchMoreCommits(action) {
  const showLoading = shouldShowLoading(action);
  const { page } = yield select((state) => state.commits);
  if (showLoading) yield put({ type: 'SET_LOADING' });
  try {
    const response = yield call(api.get, `/commits?page=${page + 1}`);
    yield put({ type: 'FETCH_MORE_COMMITS', payload: response.data });
  } catch (e) {
    yield put({ type: 'ERROR', payload: e });
  } finally {
    if (showLoading) yield put({ type: 'SET_LOADING' });
  }
}
