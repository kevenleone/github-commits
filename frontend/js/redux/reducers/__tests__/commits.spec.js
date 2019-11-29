import CommitsReducer from '../commits';

const INITIAL_STATE = {
  data: {},
  repository_commits: {},
};

describe('Testing commits reducer', () => {
  test('should get default state', () => {
    const state = CommitsReducer(INITIAL_STATE, { type: 'none' });
    expect(state).toBe(INITIAL_STATE);
  });

  test('should get allcommits', () => {
    const today = new Date().toDateString();
    const action = {
      type: 'GET_ALL_COMMITS',
      payload: [{ id: 1, created_at: new Date().toISOString() }],
    };
    const state = CommitsReducer(INITIAL_STATE, action);
    expect(state).toStrictEqual({
      ...INITIAL_STATE,
      data: { [today]: action.payload },
    });
  });

  test('should get allcommits from a repository', () => {
    const today = new Date().toDateString();
    const lastYear = new Date(new Date().setYear(2018)).toDateString();
    const action = {
      type: 'GET_COMMIT_FROM_REPO',
      payload: [{ id: 1, created_at: today }, { id: 2, created_at: lastYear }],
    };
    const state = CommitsReducer(INITIAL_STATE, action);
    expect(state).toStrictEqual({
      ...INITIAL_STATE,
      repository_commits: { [today]: [action.payload[0]], [lastYear]: [action.payload[1]] },
    });
  });
});
