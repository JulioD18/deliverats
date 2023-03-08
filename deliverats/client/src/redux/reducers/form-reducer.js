import { GET_FORMS, POST_FORMS } from "../actions/actions.js";

const initialState = {
  forms: [],
}

export default function formReducer (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_FORMS:
      return {
        ...state,
        forms: payload.forms,
      };
    case POST_FORMS:
      return {
        ...state,
        forms: payload.forms,
      };
    default:
      return state;
  }
}