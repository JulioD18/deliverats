import { GET_FORMS, POST_FORMS } from "./actions.js";
import store from "../store.js";

const dispatch = store.dispatch;

export const getForms = ({ token, sub }) => {
  return async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/forms?owner=${sub}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      return dispatch({ type: GET_FORMS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const postForms = ({ user, token, form }) => {
  return async () => {
    try {
      const response = await fetch("http://localhost:3001/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      return dispatch({ type: POST_FORMS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};
