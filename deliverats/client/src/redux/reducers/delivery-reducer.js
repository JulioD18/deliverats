import { GET_DELIVERIES, POST_DELIVERY } from "../actions/actions.js";

const initialState = {
  deliveries: [],
};

export default function deliveryReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_DELIVERIES:
      return {
        ...state,
        deliveries: payload,
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
