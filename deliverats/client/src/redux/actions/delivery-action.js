import {
  GET_DELIVERIES,
  GET_DELIVERY,
  POST_DELIVERY,
  PATCH_DELIVERY,
} from "./actions.js";
import store from "../store.js";

const dispatch = store.dispatch;
const apiUrl = process.env.REACT_APP_API_URL;

export const getDeliveries = ({ token, sub, offset, limit }) => {
  return async () => {
    try {
      const res = await fetch(
        `${apiUrl}/deliveries?owner=${sub}&offset=${offset}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      return dispatch({ type: GET_DELIVERIES, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDelivery = (id) => {
  return async () => {
    try {
      const res = await fetch(`${apiUrl}/deliveries/${id}`, {
        method: "GET",
      });

      const data = await res.json();
      dispatch({ type: GET_DELIVERY, payload: data });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
};

export const postDelivery = ({ delivery }) => {
  return async () => {
    try {
      const response = await fetch(`${apiUrl}/deliveries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(delivery),
      });
      const data = await response.json();
      return dispatch({ type: POST_DELIVERY, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const patchDelivery = (token, id, delivery) => {
  return async () => {
    try {
      const response = await fetch(
        `${apiUrl}/deliveries/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(delivery),
        }
      );
      const data = await response.json();
      return dispatch({ type: PATCH_DELIVERY, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPDF = (id) => {
  return async () => {
    try {
      const res = await fetch(
        `${apiUrl}/deliveries/receipts/${id}/`,
        {
          method: "GET",
        }
      );

      const data = await res.arrayBuffer();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
};
