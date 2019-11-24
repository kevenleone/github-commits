const INITIAL_STATE = {
  data: [],
};

export default function repositories(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_REPOSITORY':
      return { ...state, data: [...state.data, action.payload] };
    case 'GET_ALL_REPOSITORIES':
      return { ...state, data: action.payload };
    default:
      return state;
  }
}
