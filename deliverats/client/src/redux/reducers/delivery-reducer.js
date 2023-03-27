import {
  GET_DELIVERIES,
  GET_DELIVERY,
  POST_DELIVERY,
} from "../actions/actions.js";

const initialState = {
  deliveries: [],
  delivery: undefined,
};

export default function deliveryReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_DELIVERIES:
      return {
        ...state,
        deliveries: payload,
      };
    case GET_DELIVERY:
      return {
        ...state,
        delivery: payload,
      };
    case POST_DELIVERY:
      return {
        ...state,
        deliveries: payload,
      };
    default:
      return state;
  }
}
