import { combineReducers } from "redux";
import formReducer from "./form-reducer";
import deliveryReducer from "./delivery-reducer";

export default combineReducers({
  form: formReducer,
  delivery: deliveryReducer,
});
