import { runSaga } from 'redux-saga';

import { getAllCommits, shouldShowLoading } from '../commits';
import api from '../../../services';

describe('Should tests saga functions for commits', () => {
  test('get shouldShowLoading false value', () => {
    const showLoading = shouldShowLoading();
    expect(showLoading).toBe(false);
  });

  test('should get all commits with success', async () => {
    const dispatched = [];
    const mockCommits = { response: { data: [] } };
    const apiStub = jest.spyOn(api, 'get').mockImplementation(() => Promise.resolve(mockCommits));
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ commits: { data: [] }, base: { loading: false } }),
      },
      getAllCommits,
      { payload: { showLoad: true } }
    ).toPromise();
    expect(apiStub.mock.calls).toHaveLength(1);
  });

  test('should get all commits with error', async () => {
    const dispatched = [];
    const mockCommits = { response: { data: [] } };
    const apiStubError = jest
      .spyOn(api, 'get')
      .mockImplementation(() => Promise.reject(mockCommits));
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ commits: { data: [] }, base: { loading: false } }),
      },
      getAllCommits,
      { payload: { showLoad: false } }
    ).toPromise();
    expect(apiStubError.mock.calls).toHaveLength(2);
  });
});
