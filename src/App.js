import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
    </Switch>
  </BrowserRouter>
);

export default App;
