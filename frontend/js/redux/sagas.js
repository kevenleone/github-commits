import { takeLatest } from 'redux-saga/effects';

import { addRepository, getRepository, getAllRepositories } from './actions/repository';
import { getAllCommits, fetchMoreCommits } from './actions/commits';

export default function* root() {
  // REPOSITORIES SAGA
  yield takeLatest('ADD_REPOSITORY_SAGA', addRepository);
  yield takeLatest('GET_REPOSITORY_SAGA', getRepository);
  yield takeLatest('GET_ALL_REPOSITORY_SAGA', getAllRepositories);

  // COMMITS SAGA
  yield takeLatest('GET_ALL_COMMITS_SAGA', getAllCommits);
  yield takeLatest('FETCH_MORE_COMMITS_SAGA', fetchMoreCommits);
}
