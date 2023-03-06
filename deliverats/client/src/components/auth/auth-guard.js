import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";

// This acts as a middleware to protect routes from being accessed by unauthorized users
export const AuthenticationGuard = ({ component }) => {
  return withAuthenticationRequired(component, {
    onRedirecting: () => <div>Loading...</div>,
  });
};
