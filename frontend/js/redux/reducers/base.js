import { toast } from 'react-toastify';

const INITIAL_STATE = {
  loading: false,
  user: window.user,
  avatarDefault:
    'https://camo.githubusercontent.com/ab2d1ec9576acd091402c4cd7a873eefb1b29fb0/68747470733a2f2f312e67726176617461722e636f6d2f6176617461722f61333335393338376431343562353166393763303334393761346535373538633f643d68747470732533412532462532466769746875622e6769746875626173736574732e636f6d253246696d6167657325324667726176617461727325324667726176617461722d757365722d3432302e706e6726723d6726733d3430',
};

export default function baseWrapper(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ERROR': {
      const error = action.payload.response.data.message || action.payload.message;
      toast.error(error);
      return { ...state, error };
    }
    case 'OBS': {
      const alertMessage = action.payload;
      toast.info(alertMessage);
      return { ...state, alert: alertMessage };
    }
    case 'SET_LOADING': {
      return { ...state, loading: action.loading || !state.loading };
    }
    default:
      return state;
  }
}
