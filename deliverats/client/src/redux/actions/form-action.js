import { GET_FORMS, GET_FORM, POST_FORM } from "./actions.js";
import store from "../store.js";

const dispatch = store.dispatch;
const apiUrl = process.env.REACT_APP_API_URL;

export const getForms = ({ token, sub, offset, limit }) => {
  return async () => {
    try {
      const res = await fetch(
        `${apiUrl}/forms?owner=${sub}&offset=${offset}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      return dispatch({ type: GET_FORMS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getForm = (id) => {
  return async () => {
    try {
      const res = await fetch(`${apiUrl}/forms/${id}`, {
        method: "GET",
      });

      const data = await res.json();
      return dispatch({ type: GET_FORM, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const postForm = ({ user, token, form }) => {
  return async () => {
    try {
      const response = await fetch(`${apiUrl}/forms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      return dispatch({ type: POST_FORM, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};
