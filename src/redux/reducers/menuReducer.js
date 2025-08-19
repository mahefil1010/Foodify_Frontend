import * as types from '../actionTypes/menuActionTypes';

const initialState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
};

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.MENU_LIST_REQUEST:
    case types.MENU_CREATE_REQUEST:
    case types.MENU_UPDATE_REQUEST:
    case types.MENU_DELETE_REQUEST:
      return { ...state, loading: true, error: null };
    case types.MENU_LIST_SUCCESS:
      return { ...state, loading: false, items: action.payload.items || [], total: action.payload.total || 0, error: null };
    case types.MENU_CREATE_SUCCESS:
      return { ...state, loading: false, items: [action.payload, ...state.items], error: null };
    case types.MENU_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.map((item) => item.Id === action.payload.Id ? action.payload : item),
        error: null
      };
    case types.MENU_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.filter((item) => item.Id !== action.id),
        error: null
      };
    case types.MENU_LIST_FAILURE:
    case types.MENU_CREATE_FAILURE:
    case types.MENU_UPDATE_FAILURE:
    case types.MENU_DELETE_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default menuReducer;
