const INITIAL_STATE = {
  data: [],
  repository: {},
};

export default function repositories(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_REPOSITORY':
      return { ...state, data: [...state.data, action.payload] };
    case 'GET_ALL_REPOSITORIES':
      return { ...state, data: action.payload };
    case 'GET_REPOSITORY':
      return { ...state, repository: action.payload };
    default:
      return state;
  }
}
