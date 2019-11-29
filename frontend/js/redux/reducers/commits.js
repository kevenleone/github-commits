const INITIAL_STATE = {
  data: {},
  repository_commits: {},
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
      const data = orderCommitsPerDate(action.payload);
      return { ...state, data };
    }
    case 'GET_COMMIT_FROM_REPO': {
      const repository_commits = orderCommitsPerDate(action.payload);
      return { ...state, repository_commits };
    }
    default:
      return state;
  }
}
