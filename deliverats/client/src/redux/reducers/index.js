import { combineReducers } from "redux";
import formReducer from "./form-reducer";

export default combineReducers({
  form: formReducer,
});
