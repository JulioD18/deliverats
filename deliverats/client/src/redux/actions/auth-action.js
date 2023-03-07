import { SIGN_UP, SIGN_IN, SIGN_OUT } from "./actions";
import store from "../store";

const dispatch = store.dispatch;

export const signUp = async ({loginWithRedirect}) => {
  // const { loginWithRedirect } = useAuth0();

  const data = await loginWithRedirect({
    state: {
      returnTo: "/",
    },
    authorizationParams: {
      screen_hint: "signup",
    },
  });

  dispatch({
    type: SIGN_UP,
    payload: data
  })
}

export const signIn = async ({loginWithRedirect}) => {
  // const { loginWithRedirect } = useAuth0();

  const data = await loginWithRedirect({
    state: {
      returnTo: "/",
    },
  });

  console.log(data)
  alert("HERE")

  dispatch({
    type: SIGN_IN,
    payload: data
  })
}

export const signOut = async({logout}) => {
  // const { logout } = useAuth0();

  const data =logout({
    logoutParams: {
      returnTo: "/",
    },
  });

  dispatch({
    type: SIGN_OUT,
    payload: data
  })
}