import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import PageNotFound from "./components/PageNotFound";
import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <Switch>
      <Route exact path='/'>
        <h1> Home Page under construction </h1>
      </Route>
      <Route path="/login">
        <LoginFormPage />
      </Route>
      <Route>
        <PageNotFound />
      </Route>
    </Switch>
  );
}

export default App;
