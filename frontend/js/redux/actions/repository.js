import { put, call } from 'redux-saga/effects';

import api from '../../services';

import { getAllCommits } from './commits';

export function* addRepository(action) {
  yield put({ type: 'SET_LOADING' });

  try {
    const response = yield call(api.post, '/repository/', action.payload);
    if (!response.data.message) {
      yield put({ type: 'ADD_REPOSITORY', payload: response.data });
      yield call(getAllCommits);
    } else {
      yield put({ type: 'OBS', payload: response.data.message });
    }
  } catch (e) {
    yield put({ type: 'ERROR', payload: e });
  } finally {
    yield put({ type: 'SET_LOADING' });
  }
}

export function* getAllRepositories() {
  yield put({ type: 'SET_LOADING' });

  try {
    const response = yield call(api.get, `/repository/`);
    yield put({ type: 'GET_ALL_REPOSITORIES', payload: response.data });
  } catch (e) {
    yield put({ type: 'ERROR', payload: e });
  } finally {
    yield put({ type: 'SET_LOADING' });
  }
}

export function* getRepository(action) {
  yield put({ type: 'SET_LOADING' });

  try {
    const response = yield call(api.get, `/repository/${action.payload}`);
    yield put({ type: 'GET_REPOSITORY', payload: response.data.repository });
    yield put({ type: 'GET_COMMIT_FROM_REPO', payload: response.data.commits });
  } catch (e) {
    yield put({ type: 'ERROR', payload: e });
  } finally {
    yield put({ type: 'SET_LOADING' });
  }
}
