import { commonTypes } from '../actions/CommonActions';
import { themeColor } from '../util';
const initialState = {
  user: null,
  theme: {},
};

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case commonTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case commonTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case commonTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case commonTypes.GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case commonTypes.UPDATE_THEME_SUCCESS:
      return {
        ...state,
        theme: action.payload,
      };
    case commonTypes.INIT_THEME_SUCCESS:
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
}
