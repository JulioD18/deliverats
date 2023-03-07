import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Typography } from "@mui/material";
import { signUp } from "../../redux/actions/auth-action";
import { connect } from "react-redux";

const SignUpButton = ({ isAuthenticated, user }) => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await signUp({ loginWithRedirect });
  };

  return (
    <Button color="secondary" onClick={handleSignUp}>
      <Typography variant="h6">Sign Up</Typography>
    </Button>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { signUp })(SignUpButton);
