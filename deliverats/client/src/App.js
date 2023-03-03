import Routes from "./components/routes.js";
import store from "./store.js";

import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
