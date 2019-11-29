import baseWrapper from '../base';

const INITIAL_STATE = {
  loading: false,
  user: {},
  avatarDefault: {},
};

describe('Testing base reducer', () => {
  test('should get default state', () => {
    const state = baseWrapper(INITIAL_STATE, { type: 'none' });
    expect(state).toBe(INITIAL_STATE);
  });

  test('should get error state', () => {
    const payload = { message: 'say hello to error' };
    const state = baseWrapper(INITIAL_STATE, {
      type: 'ERROR',
      payload,
    });
    expect(state).toStrictEqual({ ...INITIAL_STATE, error: payload.message });
  });

  test('should get error state and response.data.message', () => {
    const payload = { response: { data: { message: 'Say hello to error' } } };
    const state = baseWrapper(INITIAL_STATE, {
      type: 'ERROR',
      payload,
    });
    expect(state).toStrictEqual({ ...INITIAL_STATE, error: payload.response.data.message });
  });

  test('should get obs state', () => {
    const payload = 'Say hello to alert';
    const state = baseWrapper(INITIAL_STATE, {
      type: 'OBS',
      payload,
    });
    expect(state).toStrictEqual({ ...INITIAL_STATE, alert: payload });
  });

  test('should get setloading state', () => {
    const state = baseWrapper(INITIAL_STATE, {
      type: 'SET_LOADING',
    });
    expect(state).toStrictEqual({ ...INITIAL_STATE, loading: true });
  });
});
