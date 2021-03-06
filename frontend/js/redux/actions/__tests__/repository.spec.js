import { runSaga } from 'redux-saga';

import { addRepository, getAllRepositories, getRepository } from '../repository';
import api from '../../../services';

describe('Should tests saga functions for repositories ', () => {
  test('should add repository with success', async () => {
    const dispatched = [];
    const mockData = { response: { data: { message: 'He' } } };
    const apiStub = jest.spyOn(api, 'post').mockImplementation(() => Promise.resolve(mockData));
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ repositories: { data: [] } }),
      },
      addRepository,
      { payload: { showLoad: true } }
    ).toPromise();
    expect(apiStub.mock.calls).toHaveLength(1);
  });

  test('should add repository with error', async () => {
    const dispatched = [];
    const mockData = { response: { data: { message: 'He' } } };
    const apiStub = jest.spyOn(api, 'post').mockImplementation(() => Promise.reject(mockData));
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ repositories: { data: [] } }),
      },
      addRepository
    ).toPromise();
    expect(apiStub.mock.calls).toHaveLength(1);
  });

  test('should add repository with alert', async () => {
    const dispatched = [];
    const mockData = {
      response: { data: { message: 'Data Already Exists' } },
    };
    const apiStub = jest.spyOn(api, 'post').mockImplementation(() => Promise.resolve(mockData));
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ repositories: { data: [] } }),
      },
      addRepository,
      { payload: 'hello' }
    ).toPromise();
    expect(apiStub.mock.calls).toHaveLength(2);
  });

  test('should get all repositories with success', async () => {
    const dispatched = [];
    const mockData = { response: { data: [] } };
    const apiStubError = jest.spyOn(api, 'get').mockImplementation(() => Promise.resolve(mockData));
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ repositories: { data: [] }, base: { loading: false } }),
      },
      getAllRepositories
    ).toPromise();
    expect(apiStubError.mock.calls).toHaveLength(1);
  });

  test('should get all repositories with error', async () => {
    const dispatched = [];
    const mockData = { response: { data: [] } };
    const apiStubError = jest.spyOn(api, 'get').mockImplementation(() => Promise.reject(mockData));
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ repositories: { data: [] }, base: { loading: false } }),
      },
      getAllRepositories,
      { payload: { showLoad: false } }
    ).toPromise();
    expect(apiStubError.mock.calls).toHaveLength(2);
  });

  test('should get repository with error', async () => {
    const dispatched = [];
    const mockData = { response: { data: [] } };
    const apiStubError = jest.spyOn(api, 'get').mockImplementation(() => Promise.reject(mockData));
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ repositories: { data: [] }, base: { loading: false } }),
      },
      getRepository
    ).toPromise();
    expect(apiStubError.mock.calls).toHaveLength(2);
  });

  test('should get repository with success', async () => {
    const dispatched = [];
    const mockData = { response: { data: { repository: {}, commits: [] } } };
    const apiStubError = jest.spyOn(api, 'get').mockImplementation(() => Promise.resolve(mockData));
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ repositories: { data: [] }, base: { loading: false } }),
      },
      getRepository
    ).toPromise();
    expect(apiStubError.mock.calls).toHaveLength(2);
  });
});
