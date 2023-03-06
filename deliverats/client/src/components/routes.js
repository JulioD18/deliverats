import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./home.js";

const Routes = () => {
  return (
    <Router>
      <Route exact path="/" component={Home} />
    </Router>
  );
};

export default Routes;
