// import { applyMiddleware, compose } from "redux";
// import { configureStore } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
// import rootReducer from "./reducers/index.js";
// import { loadState, saveState } from "./localStorage.js";

// const persistedState = loadState();

// const middleware = [thunk];

// const store = configureStore(
//   persistedState,
//   compose(
//     applyMiddleware(...middleware)
//   )
// );

// store.subscribe(() => {
//   saveState(store.getState());
// });

// export default store;
