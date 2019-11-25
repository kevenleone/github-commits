const INITIAL_STATE = {
  data: {},
};

function formatCommitsPerDate(commits) {
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
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (action.type) {
    case 'GET_ALL_COMMITS': {
      const data = formatCommitsPerDate(action.payload);
      return { ...state, data };
    }
    default:
      return state;
  }
}
