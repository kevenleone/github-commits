const INITIAL_STATE = {
  repository_commits: {},
  has_next: false,
  fullData: [],
  data: {},
  page: 1,
};

function orderCommitsPerDate(commits) {
  const dict = {};
  for (const commit of commits) {
    const date = new Date(commit.created_at).toDateString();
    if (!dict[date]) {
      dict[date] = [commit];
    } else {
      dict[date] = [...dict[date], commit];
    }
  }
  return dict;
}

export default function commits(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'GET_ALL_COMMITS': {
      const { data: allData, has_next } = action.payload;
      const data = orderCommitsPerDate(allData);
      return { ...state, data, fullData: allData, has_next, page: 1 };
    }
    case 'GET_COMMIT_FROM_REPO': {
      const repository_commits = orderCommitsPerDate(action.payload);
      return { ...state, repository_commits };
    }
    case 'FETCH_MORE_COMMITS': {
      const { data: allData, has_next, page } = action.payload;
      const fullData = [...state.fullData, ...allData];
      const data = orderCommitsPerDate(fullData);
      return { ...state, fullData, data, has_next, page };
    }
    default:
      return state;
  }
}
