import { takeLatest } from 'redux-saga/effects';

import { addRepository, getAllRepositories } from './actions/repository';
import { getAllCommits } from './actions/commits';

export default function* root() {
  // REPOSITORIES SAGA
  yield takeLatest('ADD_REPOSITORY_SAGA', addRepository);
  yield takeLatest('GET_ALL_REPOSITORY_SAGA', getAllRepositories);

  // COMMITS SAGA
  yield takeLatest('GET_ALL_COMMITS_SAGA', getAllCommits);
}
