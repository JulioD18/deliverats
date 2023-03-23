import { GET_FORMS, GET_FORM, POST_FORM } from "../actions/actions.js";

const initialState = {
  forms: [],
  form: undefined,
};

export default function formReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_FORMS:
      return {
        ...state,
        forms: payload,
      };
    case GET_FORM:
      return {
        ...state,
        form: payload,
      };
    case POST_FORM:
      return {
        ...state,
        forms: payload,
      };
    default:
      return state;
  }
}
