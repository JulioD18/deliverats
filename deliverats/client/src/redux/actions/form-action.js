import { GET_FORMS, POST_FORMS } from "./actions.js";

export const getForms = ({ token, sub }) => {
  return async (dispatch) => {
    try {
      const res = await fetch(`http://localhost:3001/api/forms?owner=${sub}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.statusCode === 200) {
        dispatch({ type: GET_FORMS, payload: data });
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  };
};

export const postForms = ({ user, token, form }) => {
  console.log(token);
  return async (dispatch) => {
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

      if (data.statusCode === 200) {
        dispatch({ type: POST_FORMS, payload: data });
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  };
};
