import RepositoryReducer from '../repositories';

const INITIAL_STATE = {
  data: [],
  repository: {},
};

describe('Testing commits reducer', () => {
  test('should get default state', () => {
    const state = RepositoryReducer(INITIAL_STATE, { type: 'none' });
    expect(state).toBe(INITIAL_STATE);
  });

  test('should add repository on state', () => {
    const state = RepositoryReducer(INITIAL_STATE, {
      type: 'ADD_REPOSITORY',
      payload: {},
    });
    expect(state).toStrictEqual({ ...INITIAL_STATE, data: [{}] });
  });

  test('should get repository on state', () => {
    const state = RepositoryReducer(INITIAL_STATE, {
      type: 'GET_REPOSITORY',
      payload: {},
    });
    expect(state).toStrictEqual({ ...INITIAL_STATE, repository: {} });
  });

  test('should get all repository on state', () => {
    const state = RepositoryReducer(INITIAL_STATE, {
      type: 'GET_ALL_REPOSITORIES',
      payload: [],
    });
    expect(state).toStrictEqual({ ...INITIAL_STATE, data: [] });
  });
});
