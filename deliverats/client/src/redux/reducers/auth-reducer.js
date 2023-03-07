import { SIGN_UP, SIGN_IN, SIGN_OUT } from "../actions/actions";

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SIGN_UP:
      return {
        ...state,
        isAuthenticated: payload.isAuthenticated,
        user: payload.user,
      };
    case SIGN_IN:
      return {
        ...state,
        isAuthenticated: payload.isAuthenticated,
        user: payload.user,
      };
    case SIGN_OUT:
      return {
        ...state,
        isAuthenticated: payload.isAuthenticated,
        user: payload.user,
      };
    default:
      return state;
  }
}
