import CommitsReducer from '../commits';

const INITIAL_STATE = {
  repository_commits: {},
  has_next: false,
  fullData: [],
  data: {},
  page: 1,
};

const today = new Date().toDateString();
const lastYear = new Date(new Date().setYear(2018)).toDateString();

describe('Testing commits reducer', () => {
  test('should get default state', () => {
    const state = CommitsReducer(INITIAL_STATE, { type: 'none' });
    expect(state).toBe(INITIAL_STATE);
  });

  test('should get allcommits', () => {
    const action = {
      type: 'GET_ALL_COMMITS',
      payload: {
        has_next: false,
        page: 1,
        data: [{ id: 1, created_at: new Date().toISOString() }],
      },
    };
    const state = CommitsReducer(INITIAL_STATE, action);
    expect(state).toStrictEqual({
      ...INITIAL_STATE,
      data: { [today]: action.payload.data },
      fullData: action.payload.data,
      page: 1,
      has_next: false,
    });
  });

  test('should get allcommits from a repository', () => {
    const action = {
      type: 'GET_COMMIT_FROM_REPO',
      payload: [
        { id: 1, created_at: today },
        { id: 2, created_at: today },
        { id: 3, created_at: lastYear },
      ],
    };
    const state = CommitsReducer(INITIAL_STATE, action);
    expect(state).toStrictEqual({
      ...INITIAL_STATE,
      repository_commits: {
        [today]: [action.payload[0], action.payload[1]],
        [lastYear]: [action.payload[2]],
      },
    });
  });

  test('should fetchMore Commits', () => {
    const action = {
      type: 'FETCH_MORE_COMMITS',
      payload: {
        data: [{ id: 1, created_at: today }],
        has_next: false,
        page: 1,
      },
    };
    const state = CommitsReducer(INITIAL_STATE, action);
    expect(state).toStrictEqual({
      ...INITIAL_STATE,
      data: { [today]: action.payload.data },
      fullData: action.payload.data,
    });
  });

  test('should fetchMore Commits and return no data', () => {
    const action = {
      type: 'FETCH_MORE_COMMITS',
      payload: {
        data: [],
        has_next: false,
        page: 1,
      },
    };
    const state = CommitsReducer(INITIAL_STATE, action);
    expect(state).toStrictEqual(INITIAL_STATE);
  });
});
