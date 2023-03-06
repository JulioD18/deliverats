import React from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "@mui/material"

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0()

  const handleLogin = async () => {
    await loginWithRedirect({
      state: {
        returnTo: "/",
      },
    });
  };

  return (
    <Button
      color="success"
      onClick={handleLogin}
    >
      Log In
    </Button>
  )
}

export default LoginButton;