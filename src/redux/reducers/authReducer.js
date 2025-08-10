// Auth reducer
import * as types from '../actionTypes/authActionTypes';

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  forgotPasswordMessage: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTER_REQUEST:
    case types.LOGIN_REQUEST:
    case types.FORGOT_PASSWORD_REQUEST:
      return { ...state, loading: true, error: null };
    case types.REGISTER_SUCCESS:
      return { ...state, loading: false, error: null };
    case types.LOGIN_SUCCESS:
      return { ...state, loading: false, user: action.payload, isAuthenticated: true, error: null };
    case types.FORGOT_PASSWORD_SUCCESS:
      return { ...state, loading: false, forgotPasswordMessage: action.payload, error: null };
    case types.REGISTER_FAILURE:
    case types.LOGIN_FAILURE:
    case types.FORGOT_PASSWORD_FAILURE:
      return { ...state, loading: false, error: action.error };

    case types.MAKE_REQUEST:
      return { ...state, loading: true, error: null };
    case types.MAKE_SUCCESS:
      return { ...state, loading: false, error: null };
    case types.FAIL_REQUEST:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default authReducer;
